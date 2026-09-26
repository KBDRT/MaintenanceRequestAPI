import { RequestAssignee } from "../../domains/models/request-assignee.model";
import { SetRequestTechniciansDto } from "../../dto/assignees/set-request-technicians.dto";
import { AppError } from "../../errors/app.error";
import { DatabaseError } from "../../errors/database.error";
import { IAssignessRepository } from "../abstractions/assignees-repository.interface";

export class AssigneesRepository implements IAssignessRepository{
  
  async deleteTechnicianFromRequest(requestId: string, technicianId: string): Promise<void> {
    try {
      await RequestAssignee.destroy({where: {requestId: requestId, technicianId: technicianId}});
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async deleteRequestTechnicians(requestId: string): Promise<void> {
    try {
      await RequestAssignee.destroy({where: {requestId: requestId}})
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async addRequestTechnicians(requestId:string, technicians: SetRequestTechniciansDto[]): Promise<void> {
    try {
      await RequestAssignee.bulkCreate(technicians.map(a => ({
        requestId: requestId,
        technicianId: a.technicianId,
        role: a.role,
      })));
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }
}
