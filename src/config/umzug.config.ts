import { SequelizeStorage, Umzug } from "umzug";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sequelize } from "../infrastructure/sequelize";
import { getLog } from "../lib/context";
import { DataTypes } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const migrator = new Umzug({
	migrations: {
		glob: ['../migrations/*.ts', { cwd: __dirname }],
	},
	context: sequelize,
	storage: new SequelizeStorage({
		sequelize: sequelize,
	}),
	logger: getLog(),
});

export type Migration = typeof migrator._types.migration;