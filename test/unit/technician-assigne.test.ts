import { test, expect, describe, jest, afterEach } from '@jest/globals';
import { AssigneeRole } from '../../src/domains/enums/assignee-role.enum.js';
import { BusinessRuleError } from '../../src/errors/business-rule.error.js';
import { randomUUID } from 'node:crypto';
import { createTechnicianDTO, setupTechnicianSpies } from './utils.js';
import { setRequestTechnicians } from '../../src/services/assignees.service.js';
import { SetRequestTechniciansDto } from '../../src/dto/assignees/set-request-technicians.dto.js';
import { DatabaseError } from '../../src/errors/database.error.js';

describe('Назначение бригады на заявку', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Должно вызываться исключение BusinessRuleError и в БД не записывать, если в бригаде нет ни одного lead', async () => {
    // Arrange
    const requestId = randomUUID();
    const technicians = [
      createTechnicianDTO({ role: AssigneeRole.member }),
      createTechnicianDTO({ role: AssigneeRole.member }),
    ];

    const spies = setupTechnicianSpies();

    // Act
    await expect(setRequestTechnicians(requestId, technicians)).rejects.toBeInstanceOf(BusinessRuleError);

    // Assert
    expect(spies.transaction).toHaveBeenCalledTimes(0);
    expect(spies.deleteRequestTechnicians).toHaveBeenCalledTimes(0);
    expect(spies.addRequestTechnicians).toHaveBeenCalledTimes(0);
  });

  test('Должно вызываться исключение BusinessRuleError и в БД не записывать, если в бригаде больше одного lead', async () => {
    // Arrange
    const requestId = randomUUID();
    const technicians = [
      createTechnicianDTO({ role: AssigneeRole.lead }),
      createTechnicianDTO({ role: AssigneeRole.lead }),
    ];

    const spies = setupTechnicianSpies();

    // Act
    await expect(setRequestTechnicians(requestId, technicians)).rejects.toBeInstanceOf(BusinessRuleError);

    // Assert
    expect(spies.transaction).toHaveBeenCalledTimes(0);
    expect(spies.deleteRequestTechnicians).toHaveBeenCalledTimes(0);
    expect(spies.addRequestTechnicians).toHaveBeenCalledTimes(0);
  });

  test('Должно вызываться исключение BusinessRuleError и в БД не записывать, если массив техников пустой', async () => {
    // Arrange
    const requestId = randomUUID();
    const technicians: SetRequestTechniciansDto[] = [];

    const spies = setupTechnicianSpies();

    // Act
    await expect(setRequestTechnicians(requestId, technicians)).rejects.toBeInstanceOf(BusinessRuleError);

    // Assert
    expect(spies.transaction).toHaveBeenCalledTimes(0);
    expect(spies.deleteRequestTechnicians).toHaveBeenCalledTimes(0);
    expect(spies.addRequestTechnicians).toHaveBeenCalledTimes(0);
  });

  test('Должно удалять старых и добавлять новых техников в транзакции, если в бригаде ровно один lead', async () => {
    // Arrange
    const requestId = randomUUID();
    const technicians = [
      createTechnicianDTO({ role: AssigneeRole.lead }),
      createTechnicianDTO({ role: AssigneeRole.member }),
    ];

    const spies = setupTechnicianSpies();

    // Act
    await setRequestTechnicians(requestId, technicians);

    // Assert
    expect(spies.transaction).toHaveBeenCalledTimes(1);

    expect(spies.deleteRequestTechnicians).toHaveBeenCalledTimes(1);
    expect(spies.deleteRequestTechnicians).toHaveBeenCalledWith(requestId);

    expect(spies.addRequestTechnicians).toHaveBeenCalledTimes(1);
    expect(spies.addRequestTechnicians).toHaveBeenCalledWith(requestId, technicians);
  });

  test('Должно пробрасывать ошибку из транзакции, если delete упал, и не вызывать add', async () => {
    // Arrange
    const requestId = randomUUID();
    const technicians = [
      createTechnicianDTO({ role: AssigneeRole.lead })
    ];

    const spies = setupTechnicianSpies();
    spies.deleteRequestTechnicians.mockRejectedValue(new DatabaseError());

    // Act
    const promise = setRequestTechnicians(requestId, technicians);

    // Assert
    await expect(promise).rejects.toBeInstanceOf(DatabaseError);
    expect(spies.addRequestTechnicians).toHaveBeenCalledTimes(0);
  });
});