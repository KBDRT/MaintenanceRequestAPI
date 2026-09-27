import { Seeder } from "../../config/umzug.config";
import { AssigneeRole } from "../../domains/enums/assignee-role.enum";
import { seedTechnicians } from "./004-create-technicians.seed";
import { seedRequests } from "./005-create-requests.seed";

export const seedAssigness = [
  { requestId: seedRequests[0].id,  technicianId: seedTechnicians[0].id, hours: 4.5, role: AssigneeRole.lead },
  { requestId: seedRequests[0].id,  technicianId: seedTechnicians[1].id, hours: 2.0, role: AssigneeRole.member },

  { requestId: seedRequests[2].id,  technicianId: seedTechnicians[2].id, hours: 3.0, role: AssigneeRole.lead },

  { requestId: seedRequests[3].id,  technicianId: seedTechnicians[0].id, hours: 6.0, role: AssigneeRole.lead },
  { requestId: seedRequests[3].id,  technicianId: seedTechnicians[4].id, hours: 4.0, role: AssigneeRole.member },

  { requestId: seedRequests[4].id,  technicianId: seedTechnicians[1].id, hours: 1.5, role: AssigneeRole.lead },

  { requestId: seedRequests[6].id,  technicianId: seedTechnicians[0].id, hours: 5.0, role: AssigneeRole.lead },

  { requestId: seedRequests[8].id,  technicianId: seedTechnicians[2].id, hours: 8.0, role: AssigneeRole.lead },
  { requestId: seedRequests[8].id,  technicianId: seedTechnicians[3].id, hours: 3.0, role: AssigneeRole.member },

  { requestId: seedRequests[9].id,  technicianId: seedTechnicians[3].id, hours: 2.5, role: AssigneeRole.lead },

  { requestId: seedRequests[11].id, technicianId: seedTechnicians[3].id, hours: 2.0, role: AssigneeRole.lead },

  { requestId: seedRequests[12].id, technicianId: seedTechnicians[4].id, hours: 5.5, role: AssigneeRole.lead },
  { requestId: seedRequests[12].id, technicianId: seedTechnicians[1].id, hours: 2.0, role: AssigneeRole.member },

  { requestId: seedRequests[14].id, technicianId: seedTechnicians[1].id, hours: 3.5, role: AssigneeRole.lead },

  { requestId: seedRequests[15].id, technicianId: seedTechnicians[2].id, hours: 4.0, role: AssigneeRole.lead },

  { requestId: seedRequests[17].id, technicianId: seedTechnicians[4].id, hours: 7.0, role: AssigneeRole.lead },
  { requestId: seedRequests[17].id, technicianId: seedTechnicians[0].id, hours: 3.5, role: AssigneeRole.member },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('RequestAssignees', seedAssigness);
};

export const down: Seeder = async ({ context: sequelize }) => {
   for (const a of seedAssigness) {
    await sequelize.getQueryInterface().bulkDelete("RequestAssignees", {
      requestId: a.requestId,
      technicianId: a.technicianId,
    });
  }
};