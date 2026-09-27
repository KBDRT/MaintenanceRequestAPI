import { RequestsStatusPriorityStats } from "../types/requests-status-priority-stats.dto";

export class GetSiteSummaryResultDto {
  statistics: RequestsStatusPriorityStats[] = []; 
  averageHoursRequestFinish!: number;
}