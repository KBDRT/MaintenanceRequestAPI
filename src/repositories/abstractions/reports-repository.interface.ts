import { EquipmentsLoadResult } from "../../dto/reports/equipments-load-result.dto";
import { GetEquipmentsAnalyticsRequest } from "../../dto/reports/get-equipments-analytics-request.dto";
import { GetRequestFinishTime } from "../../dto/types/get-request-finish-time.type";
import { RequestsStatusPriorityStats } from '../../dto/types/requests-status-priority-stats.dto';

export interface IReportsRepository {
  countRequestsByStatusAndPriority(siteId: string): Promise<RequestsStatusPriorityStats[]>;
  getRequestFinishTime(siteId: string): Promise<GetRequestFinishTime[]>;
  getEquipmentsAnalytics(request: GetEquipmentsAnalyticsRequest): Promise<EquipmentsLoadResult[]>;
}

