import { GetRequestFinishTime } from "../../dto/types/get-request-finish-time.type";
import { RequestsStatusPriorityStats } from '../../dto/types/requests-status-priority-stats.dto';

export interface IReportsRepository {
  countRequestsByStatusAndPriority(siteId: string): Promise<RequestsStatusPriorityStats[]>;
  getRequestFinishTime(siteId: string): Promise<GetRequestFinishTime[]>;
}

