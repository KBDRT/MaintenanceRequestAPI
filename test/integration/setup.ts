import { sequelize } from '../../src/infrastructure/sequelize.js';
import { beforeAll, beforeEach, afterAll  } from '@jest/globals';
import { migrator } from './../../dist/config/umzug.config';
import { QueryTypes } from 'sequelize';
// import { container } from './global-setup.js';

beforeAll(async () => {
  await migrator.up();  
}, 60_000);

beforeEach(async () => {
  const rows = await sequelize.query<{ tablename: string }>(
    `
      SELECT tablename FROM pg_tables
      WHERE schemaname = 'public'
        AND tablename NOT LIKE 'Sequelize%'
    `,
    { type: QueryTypes.SELECT },   
  );

  const tables = rows.map(r => r.tablename).map(name => `"public"."${name}"`).join(', ');

  if (tables) {
    await sequelize.query(`TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE;`);
  }
});

afterAll(async () => {
  await sequelize.close();

  // if (container) {
  //   container.stop();
  // }
});