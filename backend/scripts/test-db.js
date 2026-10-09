const db = require('../config/db.config');

(async () => {
  try {
    const r = await db.testConnection();
    console.log('DB test OK:', r.ok);
    if (!r.ok) {
      const e = r.error;
      console.error('DB error:', e && (e.sqlMessage || e.message) ? (e.sqlMessage || e.message) : e);
      process.exit(1);
    }
    console.log('Sample rows:', JSON.stringify(r.rows));
    process.exit(0);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(2);
  }
})();
