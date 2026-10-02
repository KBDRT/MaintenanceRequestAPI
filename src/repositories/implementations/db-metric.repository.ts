import { HttpMetric } from "../../domains/entities/http-metric.entity.js";
import { DatabaseError } from "../../errors/database.error.js";
import { IMetricRepository } from "../abstractions/metrics-repository.interface.js";
import { HttpMetric as Model } from './../../domains/models/http-metric.model.js';

export class MetricRepository implements IMetricRepository{

  async add(metric: HttpMetric): Promise<string> {
    try {
      const result = await Model.create({
        route: metric.route,
        method: metric.method,
        statusCode: metric.statusCode,
        durationMs: metric.durationMs,
      });

      return String(result.id);
    }
    catch (error) {
      throw new DatabaseError(error);
    }
  } 
}