import db from "../Models/db";

async function syncData() {
  const response = await fetch("api/sync");
  const data = await response.json();
  db.transaction("rw", db.users, db.items, db.sales, () => {
    db.users.bulkPut(data.users);
    db.items.bulkPut(data.items);
    db.sales.bulkPut(data.sales);
  });
}

export { syncData };
