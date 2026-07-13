// backend/docker-setup.js
const { Client } = require('pg');
const { execSync } = require('child_process');

const client = new Client({
  host: process.env.DB_HOST || 'db',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'job_portal',
});

async function waitAndSetup() {
  let retries = 30;
  while (retries > 0) {
    try {
      await client.connect();
      console.log('Successfully connected to database!');
      await client.end();
      break;
    } catch (err) {
      console.log(`Database not ready yet (${err.message}). Retrying in 2 seconds... (${retries} retries left)`);
      retries -= 1;
      await new Promise(res => setTimeout(res, 2000));
    }
  }

  if (retries === 0) {
    console.error('Could not connect to database, exiting.');
    process.exit(1);
  }

  try {
    console.log('Running database migrations...');
    execSync('npm run db:migrate', { stdio: 'inherit' });
    
    console.log('Running database seeds...');
    execSync('npm run db:seed', { stdio: 'inherit' });
    
    console.log('Database setup complete!');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

waitAndSetup();
