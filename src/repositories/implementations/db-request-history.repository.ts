import { RequestStatusHistory as HistoryModel } from "../../domains/models/request-status-history.model";
import { CreateRequestHistoryDto } from "../../dto/maintenance-request/create-request-history.dto";
import { AppError } from "../../errors/app.error";
import { DatabaseError } from "../../errors/database.error";
import { IRequestHistoryRepository } from "../abstractions/request-history-repository.interface";
import { RequestStatusHistory } from './../../domains/entities/request-status-history.entity';

export class RequestHistoryRepisotory implements IRequestHistoryRepository{
  
  async getByRequestId(requestId: string): Promise<RequestStatusHistory[]> {
     try {
      const result = await HistoryModel.findAll({where: {requestId: requestId}})

      return RequestStatusHistory.createListFromModel(result);
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async create(request: CreateRequestHistoryDto): Promise<void> {
    try {
      await HistoryModel.create({...request});
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }
}