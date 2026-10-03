import { randomUUID } from "node:crypto";

export function createEquipmentBody() {
  return {
    name: "новое",
    type: "turbine",
    serialNumber: randomUUID(),
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