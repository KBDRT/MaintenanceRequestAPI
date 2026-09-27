import { MigrationTest } from '../../config/umzug.config';

export const up: MigrationTest = async ({ context: sequelize }) => {
  await sequelize.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);

  await sequelize.getQueryInterface().addIndex('MaintenanceRequests', {
    name: 'idx_requests_description_trgm',
    fields: ['description'],
    using: 'GIN',
    operator: 'gin_trgm_ops',
  });
};

export const down: MigrationTest = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeIndex('MaintenanceRequests', 'idx_requests_description_trgm');
  await sequelize.query(`DROP EXTENSION IF EXISTS pg_trgm;`);
};

