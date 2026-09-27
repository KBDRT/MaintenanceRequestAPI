import { Seeder } from "../../config/umzug.config";

export const seedSites = [
	 {
    id: "c50158de-52ea-4d48-ad54-ceb94ba0da01",
    code: "MSK-01",
    region: "Москва",
    latitude: 55.755826,
    longitude: 37.617299,
  },
  {
    id: "829fb559-e5d3-4843-a2f4-d818f743da5a",
    code: "SPB-01",
    region: "Санкт-Петербург",
    latitude: 59.938784,
    longitude: 30.314997,
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().bulkInsert('Sites', seedSites);
};

export const down: Seeder = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().bulkDelete('Sites', { id: seedSites.map(u => u.id) });
};