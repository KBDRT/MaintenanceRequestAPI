import { RequestStatusHistory } from "../../domains/models/request-status-history.model";
import { CreateRequestHistoryDto } from "../../dto/maintenance-request/create-request-history.dto";
import { AppError } from "../../errors/app.error";
import { DatabaseError } from "../../errors/database.error";
import { IRequestHistoryRepository } from "../abstractions/request-history-repository.interface";

export class RequestHistoryRepisotory implements IRequestHistoryRepository{

  async create(request: CreateRequestHistoryDto): Promise<void> {
    try {
      await RequestStatusHistory.create({...request});
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }
}