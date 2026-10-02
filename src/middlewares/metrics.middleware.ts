import { Request, Response, NextFunction } from 'express';
import { saveHttpMetric } from '../services/metrics.service.js';
import { HttpMetric } from '../domains/entities/http-metric.entity.js';

export function saveMetrics(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime.bigint();
  res.on('finish', async() => {
    try {
      if (req.route?.path === '/healthz') {
        return;
      }

      const durationMs = Number(process.hrtime.bigint() - start) / 1e6;

      const metric = new HttpMetric();
      metric.route = req.route?.path;
      metric.method = req.method;
      metric.statusCode = Number(res.statusCode) ?? 500,
      metric.durationMs = durationMs

      await saveHttpMetric(metric);
    }
    catch {

    }
  });

  next();
}