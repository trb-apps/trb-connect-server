require('dotenv').config();

const entitiesDir =
  process.env.NODE_ENV !== 'production'
    ? __dirname + '/src/**/*.entity{.ts,.js}'
    : __dirname + '/dist/**/*.entity{.ts,.js}';

const migrationsDir =
  process.env.NODE_ENV !== 'production'
    ? __dirname + '/src/migrations/*.ts'
    : __dirname + '/dist/migrations/*.js';

const migrationsDirCli =
  process.env.NODE_ENV !== 'production'
    ? __dirname + '/src/migrations'
    : __dirname + '/dist/migrations';

const config =
  process.env.NODE_ENV === 'test'
    ? {
        type: 'sqlite',
        database: './dist/db.sqlite',
        entities: [entitiesDir],
        migrations: [migrationsDir],
        cli: {
          migrationsDir: migrationsDirCli,
        },
        extra: {
          options: {
            encrypt: true,
          },
        },
      }
    : {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [entitiesDir],
        migrations: [migrationsDir],
        synchronize: true,
        cli: {
          migrationsDir: migrationsDirCli,
        },
        extra: {
          options: {
            encrypt: true,
          },
        },
      };
module.exports = config;