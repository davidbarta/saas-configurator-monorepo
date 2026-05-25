import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../../configurator.db');
export const db = new Database(dbPath);

export function initDatabase() {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS tariffs (
      id TEXT PRIMARY KEY,
      nameKey TEXT NOT NULL,
      descriptionKey TEXT NOT NULL,
      basePrice INTEGER NOT NULL
    )
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS modules (
      id TEXT PRIMARY KEY,
      nameKey TEXT NOT NULL,
      price INTEGER NOT NULL,
      category TEXT NOT NULL
    )
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      total_price INTEGER NOT NULL,
      items JSON NOT NULL
    )
  `
  ).run();

  const count = db.prepare('SELECT COUNT(*) as count FROM tariffs').get() as { count: number };

  if (count.count === 0) {
    console.log('🌱 Database is empty, seeding data...');

    const insertTariff = db.prepare(
      'INSERT INTO tariffs (id, nameKey, descriptionKey, basePrice) VALUES (?, ?, ?, ?)'
    );
    insertTariff.run('starter', 'Starter', 'Ideální pro začínající projekty a jednotlivce.', 29);
    insertTariff.run(
      'professional',
      'Professional',
      'Pro rostoucí týmy vyžadující pokročilé funkce.',
      99
    );
    insertTariff.run('enterprise', 'Enterprise', 'Maximální výkon a neomezené zdroje.', 249);

    const insertModule = db.prepare(
      'INSERT INTO modules (id, nameKey, price, category) VALUES (?, ?, ?, ?)'
    );
    insertModule.run('mod-db', 'Extra databáze (+10GB)', 15, 'resource');
    insertModule.run('mod-analytics', 'Pokročilá analytika', 25, 'feature');
    insertModule.run('mod-sla', 'SLA Podpora 24/7', 50, 'support');

    console.log('✅ Seeding done.');
  }
}
