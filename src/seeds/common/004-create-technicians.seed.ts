import { Seeder } from "../../config/umzug.config.js";

export const seedTechnicians = [
   {
    id: "095330fd-58f3-4722-8005-8cf9326a27c7",
    tableNumber: 1001,
    lastName: "Иванов",
    firstName: "Иван",
    middleName: "Иванович",
    specialization: "Электрик",
  },
  {
    id: "3e3f88bd-30ec-4893-899b-e58dd6363584",
    tableNumber: 1002,
    lastName: "Петров",
    firstName: "Пётр",
    middleName: "Петрович",
    specialization: "Механик",
  },
  {
    id: "48da021d-9376-4209-a003-bdb7b7954d62",
    tableNumber: 1003,
    lastName: "Сидоров",
    firstName: "Сидор",
    middleName: null,
    specialization: "Гидравлика",
  },
  {
    id: "33f932b7-5f96-41a6-9db8-e1c923db6220",
    tableNumber: 1004,
    lastName: "Кузнецова",
    firstName: "Анна",
    middleName: "Сергеевна",
    specialization: "КИПиА",
  },
  {
    id: "42fccf35-a252-4fda-b45d-516a9737d704",
    tableNumber: 1005,
    lastName: "Смирнов",
    firstName: "Алексей",
    middleName: "Владимирович",
    specialization: "Электрик",
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('Technicians', seedTechnicians);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('Technicians', { id: seedTechnicians.map(u => u.id) });
};