const db = require('./src/config/db');
db.raw('select 1+1 as result')
  .then((res) => {
    console.log('Database connection successful:', res.rows);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
