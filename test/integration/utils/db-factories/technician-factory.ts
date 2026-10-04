import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import { Technician } from "../../../../src/domains/models/technician.model";

export async function createDBTechnician() {
  const technician = await Technician.create({
    id: randomUUID(),
    tableNumber: await Technician.count() + 1,
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    specialization: faker.person.jobTitle()
  });

  return technician;
}
