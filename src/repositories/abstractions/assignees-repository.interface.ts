import { SetRequestTechniciansDto } from "../../dto/assignees/set-request-technicians.dto.js";

export interface IAssignessRepository {
  addRequestTechnicians(requestId:string, technicians: SetRequestTechniciansDto[]): Promise<void>;
  deleteRequestTechnicians(requestId: string): Promise<void>;
  deleteTechnicianFromRequest(requestId: string, technicianId: string): Promise<void>;
}