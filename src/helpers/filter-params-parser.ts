import { Equipment } from '../domains/entities/equipment.entity.js';
import { getEquipmentsRequest } from '../dto/contracts/equipment/get-equipments.request.js';

// todo: переписать
export const parseFilterQuery = (query: getEquipmentsRequest): getEquipmentsRequest => {
  let newQuery = query;

  for (const parameterName of ['sort', 'status', 'type', "sortDirection"] as const) {
    if (newQuery[parameterName] && typeof newQuery[parameterName] == "string") {
      const stringCopy = newQuery[parameterName];
      newQuery[parameterName] = [];
      for (let param of stringCopy.split(",")) {
        let paramName = param.trim();
        if (paramName.length > 0) {
          if (parameterName == "sort") {
            newQuery[parameterName].push(paramName as keyof Equipment);
          }
          else if (parameterName == "sortDirection") {
            paramName = paramName.toUpperCase();
            newQuery[parameterName].push(paramName as "ASC" | "DESC");
          }
          else 
          {
            newQuery[parameterName].push(paramName);
          }
          
        }
      }
    }
  }

  if (newQuery.sort && newQuery.sortDirection) {
    if (newQuery.sort?.length != newQuery.sortDirection?.length) {
      throw new Error("Количество аргументов для сортировки и направления сортировки не одинаковое!");
    }
  }


  return newQuery;
};
