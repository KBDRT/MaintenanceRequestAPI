import { AssigneeRole } from '../domains/enums/assignee-role.enum';
import { BusinessRuleError } from '../errors/business-rule.error';
import { SetRequestTechniciansDto } from '../dto/assignees/set-request-technicians.dto';
import { ValidationError } from '../errors/validation.error';


export const setRequestTechnicians = async(requestId: string, technicians: SetRequestTechniciansDto[]): Promise<void> => {

  const techniciansWithLead = technicians.filter(tech => tech.role == AssigneeRole.lead);
  if (techniciansWithLead.length !== 1)
    throw new BusinessRuleError("В бригаде должен быть только один человек с ролью lead");

  // удалить прошлых

  // назначить новых

  

  
  // if (new Date(equipmentInfo.installedAt) > new Date()) {
  //   throw new BusinessRuleError("Дата установки оборудования неккоретна", [{field: "installedAt", message: "Дата установки оборудования не может быть в будущем"}])
  // }

  // const existing = await repository.getBySerialNumber(equipmentInfo.serialNumber);
  // if (existing) {
  //   throw new ConflictError("Оборудование с указанным серийным номером уже существует!", [{field: "serialNumber", message: "Неуникальный серийный номер"}]);
  // }
  
  // const equipment = Equipment.create(equipmentInfo);
  // await repository.add(equipment);
  
  // return equipment;
};
