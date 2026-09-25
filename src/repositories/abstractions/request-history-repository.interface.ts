import { CreateRequestHistoryDto } from "../../dto/maintenance-request/create-request-history.dto.js";

export interface IRequestHistoryRepository {
  create(request: CreateRequestHistoryDto): Promise<void>;
}