import { AssigneeRole } from "../../domains/enums/assignee-role.enum.js";

export interface SetRequestTechniciansDto {
  technicianId: string,
  role: AssigneeRole,
  hours: number
}