import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";

export function createEquipmentBody() {
  return {
    name: "новое",
    type: "turbine",
    serialNumber: faker.string.alphanumeric(10).toUpperCase(),
    location: {
      lat: 10,
      lon: 30
    },
    status: "operational",
    installedAt: "2000-12-12"
  };
}

export function createRequestBody() {
  return {
    equipmentId: randomUUID(),
    title: "заявка",
    description: "описание заявки",
    priority: "medium",
  };
}
