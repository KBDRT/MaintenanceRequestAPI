import { NextFunction } from "express";
import { Request, Response } from 'express';
import { MaintenanceRequest } from "../domains/entities/maintenance-request.entity.js";
import { Equipment } from "../domains/entities/equipment.entity.js";

export function parseFilterQuery(req: Request, res: Response, next: NextFunction) {
  const newQuery = {...req.query};

  for (const parameterName of ['sort', 'status', 'type', "sortDirection", "priority"] as const) {
    if (newQuery[parameterName] && typeof newQuery[parameterName] == "string") {
      const stringCopy = newQuery[parameterName];
      newQuery[parameterName] = [];
      for (let param of stringCopy.split(",")) {
        let paramName = param.trim();
        if (paramName.length > 0) {
          if (parameterName == "sort") {
            newQuery[parameterName].push(paramName as keyof MaintenanceRequest || paramName as keyof Equipment);
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

  res.locals.cleanQuery = newQuery;

  next();
}
