import { RequestStatusHistory } from "../../domains/entities/request-status-history.entity.js";
import { CreateRequestHistoryDto } from "../../dto/maintenance-request/create-request-history.dto.js";

export interface IRequestHistoryRepository {
  create(request: CreateRequestHistoryDto): Promise<void>;
  getByRequestId(requestId: string): Promise<RequestStatusHistory[]>;
}