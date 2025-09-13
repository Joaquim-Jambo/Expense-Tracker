import fs from 'node:fs/promises';

const DB_PATH = new URL('../db.json', import.meta.url)

export const getDb = async () => {
    const db = await fs.readFile(DB_PATH, 'utf-8');
    return (JSON.parse(db));
}
export const saveDb = async (db) => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
    return (db);
}
export const insertDb = async (data) => {
    const db = await getDb();
    db.expenses.push(data);
    await saveDb(db);
    return (data);
}