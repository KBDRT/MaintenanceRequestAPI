import { HttpMetric } from "../../domains/entities/http-metric.entity.js";

export interface IMetricRepository {
  add(metric: HttpMetric): Promise<string>;
}