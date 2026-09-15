import { EquipmentStatus } from '../domains/enums/equipment-status.enum.js';
import { getEquipmentsRequest } from '../dto/contracts/get-equipments.request.js';

export const parseFilterQuery = (query: getEquipmentsRequest): getEquipmentsRequest => {
  const newQuery = query;

  for (const parameterName of ['sort', 'status', 'type'] as const) {
    if (newQuery[parameterName] && typeof newQuery[parameterName] == "string") {
      const stringCopy = newQuery[parameterName];
      newQuery[parameterName] = [];
      for (let param of stringCopy.split(",")) {
        const paramName = param.trim();
        if (paramName.length > 0) {
          newQuery[parameterName].push(paramName);
        }
      }
    }
  }

  return newQuery;
};
