import { AssigneeRole } from "../../domains/enums/assignee-role.enum";

export interface SetRequestTechniciansDto {
  technicianId: string,
  role: AssigneeRole
}