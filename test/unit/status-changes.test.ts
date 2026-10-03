import { test, expect, describe, jest, beforeEach, afterEach } from '@jest/globals';
import { randomUUID } from 'node:crypto';
import { updateRequestStatus } from '../../src/services/maintenance-request.service.js';
import { UserRole } from '../../src/domains/enums/user-role.enum.js';
import { UpdateMaintenanceRequestStatusDto } from './../../src/dto/maintenance-request/update-maintenance-request-status.dto';
import { MaintenanceRequestStatus } from '../../src/domains/enums/maintenance-request-status.enum.js';
import { NotFoundError } from '../../src/errors/not-found.error.js';
import { createRequest, createTechnician, setupRequestSpies } from './utils.js';
import { AccessError } from '../../src/errors/accesss.error.js';
import { ConflictError } from '../../src/errors/conflicts.error.js';
import { sequelize } from '../../src/infrastructure/sequelize.js';

describe(`Изменение статуса заявки`, () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Должно вызываться исключение NotFoundError и в БД не записывать, если несуществующая заявка.', async () => {
    // Arrange
    const id = randomUUID();
    const technicianId = randomUUID();
    const role = UserRole.admin;
    const dto: UpdateMaintenanceRequestStatusDto = { newStatus: MaintenanceRequestStatus.in_progress };

    const spies = setupRequestSpies();
    spies.getById.mockResolvedValue(undefined);

    // Act
    await expect(updateRequestStatus(id, technicianId, role, dto)).rejects.toBeInstanceOf(NotFoundError);
    
    // Assert
    expect(spies.getById).toHaveBeenCalledTimes(1);
    expect(spies.getById).toHaveBeenCalledWith(id);
    expect(spies.updateStatus).toHaveBeenCalledTimes(0);
    expect(spies.historyCreate).toHaveBeenCalledTimes(0);
    expect(spies.transaction).toHaveBeenCalledTimes(0);
  });

  test('Должно вызываться исключение AccessError и в БД не записывать, если роль technician и специалист не назначен на эту заявку', async () => {
    // Arrange
    const id = randomUUID();
    const technicianId = randomUUID();
    const role = UserRole.technician;
    const dto: UpdateMaintenanceRequestStatusDto = { newStatus: MaintenanceRequestStatus.in_progress };

    const request = createRequest({id, status: MaintenanceRequestStatus.new});
    const technician = createTechnician();
    request.technicians?.push(technician);

    const spies = setupRequestSpies();
    spies.getById.mockResolvedValue(request);

    // Act
    await expect(updateRequestStatus(id, technicianId, role, dto)).rejects.toBeInstanceOf(AccessError);
    
    // Assert
    expect(technician.id).not.toBe(technicianId);
    expect(spies.getById).toHaveBeenCalledTimes(1);
    expect(spies.getById).toHaveBeenCalledWith(id);
    expect(spies.updateStatus).toHaveBeenCalledTimes(0);
    expect(spies.historyCreate).toHaveBeenCalledTimes(0);
    expect(spies.transaction).toHaveBeenCalledTimes(0);
  });

  test('Должно вызываться исключение ConflictError и в БД не записывать, если пользователь - админ и нет назначенных специалистов для переход в in_progress', async () => {
    // Arrange
    const id = randomUUID();
    const technicianId = randomUUID();
    const role = UserRole.admin;
    const dto: UpdateMaintenanceRequestStatusDto = { newStatus: MaintenanceRequestStatus.in_progress };

    const request = createRequest({id, status: MaintenanceRequestStatus.new });

    const spies = setupRequestSpies();
    spies.getById.mockResolvedValue(request);

    // Act
    await expect(updateRequestStatus(id, technicianId, role, dto)).rejects.toBeInstanceOf(ConflictError);
    
    // Assert
    expect(spies.getById).toHaveBeenCalledTimes(1);
    expect(spies.getById).toHaveBeenCalledWith(id);
    expect(spies.updateStatus).toHaveBeenCalledTimes(0);
    expect(spies.historyCreate).toHaveBeenCalledTimes(0);
    expect(spies.transaction).toHaveBeenCalledTimes(0);
  });

  test('Должно вызываться исключение ConflictError и в БД не записывать, если пользователь - technician, назначенный на заявку, но запрещенный переход статуса done -> in_progress', async () => {
    // Arrange
    const id = randomUUID();
    const technicianId = randomUUID();
    const role = UserRole.technician;
    const dto: UpdateMaintenanceRequestStatusDto = { newStatus: MaintenanceRequestStatus.in_progress };

    const request = createRequest({id, status: MaintenanceRequestStatus.done});
    const technician = createTechnician({id: technicianId});
    request.technicians?.push(technician);

    const spies = setupRequestSpies();
    spies.getById.mockResolvedValue(request);

    // Act
    await expect(updateRequestStatus(id, technicianId, role, dto)).rejects.toBeInstanceOf(ConflictError);
    
    // Assert
    expect(spies.getById).toHaveBeenCalledTimes(1);
    expect(spies.getById).toHaveBeenCalledWith(id);
    expect(spies.updateStatus).toHaveBeenCalledTimes(0);
    expect(spies.historyCreate).toHaveBeenCalledTimes(0);
    expect(spies.transaction).toHaveBeenCalledTimes(0);
  });

  test('Должно сохранять все данные, если пользователь - админ и валидный переход статуса', async () => {
    // Arrange
    const id = randomUUID();
    const technicianId = randomUUID();
    const role = UserRole.admin;
    const dto: UpdateMaintenanceRequestStatusDto = { newStatus: MaintenanceRequestStatus.in_progress };

    const request = createRequest({id, status: MaintenanceRequestStatus.new});
    const technician = createTechnician();
    request.technicians?.push(technician);

    const spies = setupRequestSpies();
    spies.getById.mockResolvedValue(request);

    // Act
    await updateRequestStatus(id, technicianId, role, dto);
    
    // Assert
    expect(spies.getById).toHaveBeenCalledTimes(1);
    expect(spies.getById).toHaveBeenCalledWith(id);

    expect(spies.updateStatus).toHaveBeenCalledTimes(1);
    expect(spies.updateStatus).toHaveBeenCalledWith(id, dto.newStatus);

    expect(spies.historyCreate).toHaveBeenCalledTimes(1);
    expect(spies.historyCreate).toHaveBeenCalledWith(expect.objectContaining({
      newStatus: dto.newStatus,
      oldStatus: request.status,
      requestId: id
    }));

    expect(spies.transaction).toHaveBeenCalledTimes(1);
  });

  test('Должно сохранять все данные, если пользователь - technician, который назначен на задачу', async () => {
    // Arrange
    const id = randomUUID();
    const technicianId = randomUUID();
    const role = UserRole.technician;
    const dto: UpdateMaintenanceRequestStatusDto = { newStatus: MaintenanceRequestStatus.in_progress };

    const request = createRequest({id, status: MaintenanceRequestStatus.new});
    const technician = createTechnician({id: technicianId});
    request.technicians?.push(technician);

    const spies = setupRequestSpies();
    spies.getById.mockResolvedValue(request);

    // Act
    await updateRequestStatus(id, technicianId, role, dto);
    
    // Assert
    expect(spies.getById).toHaveBeenCalledTimes(1);
    expect(spies.getById).toHaveBeenCalledWith(id);

    expect(spies.updateStatus).toHaveBeenCalledTimes(1);
    expect(spies.updateStatus).toHaveBeenCalledWith(id, dto.newStatus);

    expect(spies.historyCreate).toHaveBeenCalledTimes(1);
    expect(spies.historyCreate).toHaveBeenCalledWith(expect.objectContaining({
      newStatus: dto.newStatus,
      oldStatus: request.status,
      requestId: id
    }));

    expect(spies.transaction).toHaveBeenCalledTimes(1);
  })

});
