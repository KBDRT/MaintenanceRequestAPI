import { SequelizeStorage, Umzug } from "umzug";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sequelize } from "../infrastructure/sequelize";
import { getLog } from "../lib/context";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extension = __filename.endsWith(".ts") ? "ts" : "js";

function createUmzug(folder: string) {
  return new Umzug({
    migrations: {
      glob: [`../${folder}/*.${extension}`, { cwd: __dirname }],
    },
    context: sequelize,
    storage: new SequelizeStorage({
      sequelize: sequelize,
    }),
    logger: getLog(),
  });
}

export const migrator = createUmzug("migrations/common");
export type Migration = typeof migrator._types.migration;

export const seeder = createUmzug("seeds/common");
export type Seeder = typeof seeder._types.migration;

export const migratorTest = createUmzug("migrations/test");
export type MigrationTest = typeof migratorTest._types.migration;

export const seederTest = createUmzug("seeds/test");
export type SeederTest = typeof seederTest._types.migration;

