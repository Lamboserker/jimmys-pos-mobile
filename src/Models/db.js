import Dexie from "dexie";

const db = new Dexie("MyDatabase");
db.version(1).stores({
  users: "++id, name, email, role, status",
  items: "++id, name, type, price, image",
  sales: "++id, userId, productId, count, amount, date",
});

export default db;
