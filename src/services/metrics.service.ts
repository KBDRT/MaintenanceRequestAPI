import { HttpMetric } from "../domains/entities/http-metric.entity.js";
import { IMetricRepository } from "../repositories/abstractions/metrics-repository.interface.js";
import { MetricRepository } from "../repositories/implementations/db-metric.repository.js";

const repository: IMetricRepository = new MetricRepository();

export const saveHttpMetric = async(info: HttpMetric): Promise<void> => {
  await repository.add(info);
};
