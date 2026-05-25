import express from 'express';
import cors from 'cors';
import { initDatabase, db } from './db/init.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

initDatabase();

app.get('/api/configurator', (req, res) => {
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

app.post('/api/orders', (req, res) => {
  try {
    const { totalPrice, selectedTariff, selectedModules } = req.body;

    if (!totalPrice || !selectedTariff) {
      return res.status(400).json({ error: 'Missing totalPrice or selectedTariff' });
    }

    const orderItems = {
      tariff: selectedTariff,
      modules: selectedModules || []
    };

    const insertOrder = db.prepare('INSERT INTO orders (total_price, items) VALUES (?, ?)');
    const result = insertOrder.run(totalPrice, JSON.stringify(orderItems));

    res.status(201).json({
      success: true,
      orderId: result.lastInsertRowid
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save order to database' });
  }
});

app.get('/api/orders', (req, res) => {
  try {
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all() as any[];

    const parsedOrders = orders.map(order => ({
      id: order.id,
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
