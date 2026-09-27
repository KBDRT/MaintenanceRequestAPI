import { AssigneeRole } from '../domains/enums/assignee-role.enum';
import { BusinessRuleError } from '../errors/business-rule.error';
import { SetRequestTechniciansDto } from '../dto/assignees/set-request-technicians.dto';
import { IAssignessRepository } from './../repositories/abstractions/assignees-repository.interface';
import { AssigneesRepository } from '../repositories/implementations/db-assigness.repository';
import { sequelize } from '../infrastructure/sequelize';
import { IMaintenanceRequestRepository } from '../repositories/abstractions/maintenance-request-repository.interface';
import { RequestRepository } from '../repositories/implementations/db-maintenance.repository';
import { NotFoundError } from '../errors/not-found.error';

const repository: IAssignessRepository = new AssigneesRepository();
const requestRepository: IMaintenanceRequestRepository = new RequestRepository();

export const setRequestTechnicians = async(requestId: string, technicians: SetRequestTechniciansDto[]): Promise<void> => {
  const techniciansWithLead = technicians.filter(tech => tech.role == AssigneeRole.lead);
  if (techniciansWithLead.length !== 1)
    throw new BusinessRuleError("В бригаде должен быть только один человек с ролью lead");

  // транзакция с помощью cls-hooked
  await sequelize.transaction(async (t1) => {
    await repository.deleteRequestTechnicians(requestId);

    await repository.addRequestTechnicians(requestId, technicians);
  });
};

export const deleteRequestTechnician = async(requestId: string, technicianId: string): Promise<void> => {
  const exist = requestRepository.getById(requestId);
  if (!exist) {
    throw new NotFoundError("Заявка не найдена!", [{field: "id", message: `Заявки с id = ${requestId} не существует`}]);
  }

  await repository.deleteTechnicianFromRequest(requestId, technicianId);
};