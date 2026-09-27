import { SequelizeStorage, Umzug } from "umzug";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sequelize } from "../infrastructure/sequelize";
import { getLog } from "../lib/context";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extension = __filename.endsWith(".ts") ? "ts" : "js";

export const migrator = new Umzug({
	migrations: {
		glob: [`../migrations/*.${extension}`, { cwd: __dirname }],
	},
	context: sequelize,
	storage: new SequelizeStorage({
		sequelize: sequelize,
	}),
	logger: getLog(),
});

export type Migration = typeof migrator._types.migration;

export const seeder = new Umzug({
	migrations: {
		glob: [`../seeds/*.${extension}`, { cwd: __dirname }],
	},
	context: sequelize,
	storage: new SequelizeStorage({
		sequelize,
	}),
	logger: console,
});

export type Seeder = typeof seeder._types.migration;