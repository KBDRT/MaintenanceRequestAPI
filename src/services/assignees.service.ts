import { AssigneeRole } from '../domains/enums/assignee-role.enum';
import { BusinessRuleError } from '../errors/business-rule.error';
import { SetRequestTechniciansDto } from '../dto/assignees/set-request-technicians.dto';
import { IAssignessRepository } from './../repositories/abstractions/assignees-repository.interface';
import { AssigneesRepository } from '../repositories/implementations/db-assigness.repository';
import { dbConnection } from '../infrastructure/db-connection';

const repository: IAssignessRepository = new AssigneesRepository();

export const setRequestTechnicians = async(requestId: string, technicians: SetRequestTechniciansDto[]): Promise<void> => {
  const techniciansWithLead = technicians.filter(tech => tech.role == AssigneeRole.lead);
  if (techniciansWithLead.length !== 1)
    throw new BusinessRuleError("В бригаде должен быть только один человек с ролью lead");

  // транзакция с помощью cls-hooked
  await dbConnection.transaction(async (t1) => {
    await repository.deleteRequestTechnicians(requestId);

    await repository.addRequestTechnicians(requestId, technicians);
  });
};

export const deleteRequestTechnician = async(requestId: string, technicianId: string): Promise<void> => {
  await repository.deleteTechnicianFromRequest(requestId, technicianId);
};