import { GetSiteSummaryResultDto } from '../dto/reports/get-site-summary-result.dto';
import { ReportsRepository } from '../repositories/implementations/db-reports.repository';
import { IReportsRepository } from './../repositories/abstractions/reports-repository.interface';

const repository: IReportsRepository = new ReportsRepository();

export const getSiteSummary = async(siteId: string): Promise<GetSiteSummaryResultDto> => {
  const result = new GetSiteSummaryResultDto();

  const requestsStats = await repository.countRequestsByStatusAndPriority(siteId);
  result.statistics = requestsStats;

  const requestsFinishTime = await repository.getRequestFinishTime(siteId);
    if (requestsFinishTime.length > 0) {
    let totalTime = 0;
    for (let request of requestsFinishTime) {
      totalTime += request.statusHistory.finishTime.getTime() - request.startTime.getTime();
    }

    result.averageHoursRequestFinish = Number((totalTime / requestsFinishTime.length / 3_600_000).toFixed(2));
  }

  return result; 
};

