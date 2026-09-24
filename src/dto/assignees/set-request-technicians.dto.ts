import { AssigneeRole } from "../../domains/enums/assignee-role.enum";

export interface SetRequestTechniciansDto {
  techinicianId: string,
  role: AssigneeRole
}