import { Seeder } from "../../config/umzug.config.js";
import { UserRole } from "../../domains/enums/user-role.enum.js";
import bcrypt from 'bcrypt';

export const seedUsers = [
  { 
    id: "a6f68284-78e4-408f-9b9c-2439adab3b2c",  
    login: "viewer", 
    password: bcrypt.hash("viewer", 10), 
    role: UserRole.viewer,
    technicianId: null
  },

  { 
    id: "457dab4b-cc25-46e1-b071-8481e909111f",  
    login: "admin", 
    password: bcrypt.hash("admin", 10), 
    role: UserRole.admin,
    technicianId: null
  },

  { 
    id: "d0defae8-e2f2-4cd6-bfe4-1658288037c1",  
    login: "technician", 
    password: bcrypt.hash("technician", 10), 
    role: UserRole.technician,
    technicianId: "095330fd-58f3-4722-8005-8cf9326a27c7"
  },

  { 
    id: "bebccb53-2ae7-4997-a529-9cfbe74114b9",  
    login: "technician1", 
    password: bcrypt.hash("technician1", 10), 
    role: UserRole.technician,
    technicianId: "30fe4b7e-0853-4d38-a6bf-167dd785f3ea"
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('Users', seedUsers);
};

export const down: Seeder = async ({ context: sequelize }) => {
   for (const a of seedUsers) {
    await sequelize.getQueryInterface().bulkDelete("RequestAssignees", {
      id: a.id,
    });
  }
};