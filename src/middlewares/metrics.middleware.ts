import { Request, Response, NextFunction } from 'express';
import { saveHttpMetric } from '../services/metrics.service.js';
import { HttpMetric } from '../domains/entities/http-metric.entity.js';
import { getLog } from '../lib/context.js';

export function saveMetrics(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime.bigint();
  res.on('finish', async() => {
    try {
      const durationMs = Number(process.hrtime.bigint() - start) / 1e6;

      const metric = new HttpMetric();
      metric.route = req.route ? req.baseUrl + req.route.path : req.path;
      metric.method = req.method;
      metric.statusCode = res.statusCode;
      metric.durationMs = durationMs

      await saveHttpMetric(metric);
    }
    catch (err) {
      getLog().error({ err }, "Ошибка записи метрики");
    }
  });

  next(); 
}