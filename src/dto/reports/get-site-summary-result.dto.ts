import { RequestsStatusPriorityStats } from "../types/requests-status-priority-stats.dto.js";

export class GetSiteSummaryResultDto {
  statistics: RequestsStatusPriorityStats[] = []; 
  averageHoursRequestFinish!: number;
}