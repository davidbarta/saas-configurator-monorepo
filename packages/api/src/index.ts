import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { initDatabase, db } from './db/init.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

interface DbOrder {
  id: number;
  user_id: number | null;
  created_at: string;
  total_price: number;
  items: string;
}

interface DbUser {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
}

export interface UserTokenPayload {
  userId: number;
  email: string;
  name: string;
}

interface AuthenticatedRequest extends Request {
  user?: UserTokenPayload;
}

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-tajne-heslo-pro-showcase';

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

initDatabase();

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token as string | undefined;

  if (!token) {
    return res.status(401).json({ error: 'Access denied, please log in.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET) as UserTokenPayload;
    req.user = verified;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

// --- AUTH ENDPOINTS ---

app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body as {
      email?: string;
      password?: string;
      name?: string;
    };

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Required fields missing.' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const insertUser = db.prepare(
      'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)'
    );
    const result = insertUser.run(email, passwordHash, name);

    res.status(201).json({ success: true, userId: result.lastInsertRowid });
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ error: 'Email or password are missing.' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as DbUser | undefined;
    if (!user) {
      return res.status(401).json({ error: 'Wrong email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Wrong email or password.' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name } as UserTokenPayload,
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({ error: 'Login failed.' });
  }
});

app.post('/api/auth/logout', (_req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ success: true });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const token = req.cookies.token as string | undefined;
  if (!token) {
    return res.json({ user: null });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET) as UserTokenPayload;
    res.json({
      user: { id: verified.userId, email: verified.email, name: verified.name }
    });
  } catch {
    res.json({ user: null });
  }
});

// --- CONFIGURATOR & ORDERS ENDPOINTS ---

app.get('/api/configurator', (_req: Request, res: Response) => {
  try {
    const tariffs = db.prepare('SELECT * FROM tariffs').all();
    const modules = db.prepare('SELECT * FROM modules').all();

    res.json({
      tariffs,
      modules
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.post('/api/orders', (req: Request, res: Response) => {
  try {
    const { totalPrice, selectedTariff, selectedModules, userId } = req.body as {
      totalPrice?: number;
      selectedTariff?: unknown;
      selectedModules?: unknown[];
      userId?: number | null;
    };

    if (!totalPrice || !selectedTariff) {
      return res.status(400).json({ error: 'Missing totalPrice or selectedTariff' });
    }

    const orderItems = {
      tariff: selectedTariff,
      modules: selectedModules || []
    };

    const insertOrder = db.prepare(
      'INSERT INTO orders (user_id, total_price, items) VALUES (?, ?, ?)'
    );
    const result = insertOrder.run(userId || null, totalPrice, JSON.stringify(orderItems));

    res.status(201).json({
      success: true,
      orderId: result.lastInsertRowid
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save order to database' });
  }
});

app.get('/api/orders', authenticateToken, (_req: Request, res: Response) => {
  try {
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all() as DbOrder[];

    const parsedOrders = orders.map(order => ({
      id: order.id,
      userId: order.user_id,
      createdAt: order.created_at,
      totalPrice: order.total_price,
      items: JSON.parse(order.items)
    }));

    res.json(parsedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders from database' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Express + SQLite backend running on http://localhost:${PORT}`);
});
