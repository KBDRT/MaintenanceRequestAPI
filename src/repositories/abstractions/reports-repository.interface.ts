import { EquipmentsLoadResult } from "../../dto/reports/equipments-load-result.dto.js";
import { GetEquipmentsAnalyticsRequest } from "../../dto/reports/get-equipments-analytics-request.dto.js";
import { GetRequestFinishTime } from "../../dto/types/get-request-finish-time.type.js";
import { RequestsStatusPriorityStats } from '../../dto/types/requests-status-priority-stats.dto.js';

export interface IReportsRepository {
  countRequestsByStatusAndPriority(siteId: string): Promise<RequestsStatusPriorityStats[]>;
  getRequestFinishTime(siteId: string): Promise<GetRequestFinishTime[]>;
  getEquipmentsAnalytics(request: GetEquipmentsAnalyticsRequest): Promise<EquipmentsLoadResult[]>;
}

