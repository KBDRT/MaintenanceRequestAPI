import { randomInt, randomUUID } from "node:crypto";
import { MaintenanceRequest } from "../../src/domains/entities/maintenance-request.entity";
import { MaintenanceRequestPriority } from "../../src/domains/enums/maintenance-request-priotiry.enum";
import { MaintenanceRequestStatus } from "../../src/domains/enums/maintenance-request-status.enum";
import { Technician } from "../../src/domains/entities/technician.entity";
import { test, expect, describe, jest, beforeEach } from '@jest/globals';
import { RequestRepository } from "../../src/repositories/implementations/db-maintenance.repository";
import { RequestHistoryRepisotory } from '../../src/repositories/implementations/db-request-history.repository';
import { sequelize } from "../../src/infrastructure/sequelize";

export function createRequest(overrides = {}): MaintenanceRequest {
  return {
    id: randomUUID(),
    equipmentId: randomUUID(),
    title: "Заголовок",
    priority: MaintenanceRequestPriority.high,
    status: MaintenanceRequestStatus.new,
    technicians: [],
    ...overrides,
  };
}

export function createTechnician(overrides = {}): Technician {
  return {
    id: randomUUID(),
    tableNumber: randomInt(1000),
    lastName: "Иванов",
    firstName: "Иван",
    ...overrides,
  };
}

export function setupRequestSpies() {
  return {
    getById: jest.spyOn(RequestRepository.prototype, 'getById'),
    updateStatus: jest.spyOn(RequestRepository.prototype, 'updateStatus'),
    historyCreate: jest.spyOn(RequestHistoryRepisotory.prototype, 'create'),
    transaction: jest.spyOn(sequelize, 'transaction').mockImplementation(
      (async (cb: any) => cb()) as any)
  }
}