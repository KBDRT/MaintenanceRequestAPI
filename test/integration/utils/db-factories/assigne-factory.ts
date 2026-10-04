import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import { AssigneeRole } from "../../../../src/domains/enums/assignee-role.enum";
import { RequestAssignee } from "../../../../src/domains/models/request-assignee.model";

type AssigneOverrides = {
  technicianId?: string;
  requestId?: string;
  role?: AssigneeRole.member
};

export async function createDBAssigne(overrides: AssigneOverrides = {}) {
  const assigne = await RequestAssignee.create({
    technicianId: overrides.technicianId ?? randomUUID(),
    requestId: overrides.requestId ?? randomUUID(),
    role: overrides.role ?? AssigneeRole.member,
    hours: faker.number.float({min: 0.5, max: 50, fractionDigits: 2})
  });

  return assigne;
}

