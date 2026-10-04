import { Request, Response, NextFunction } from 'express';
import appConfig from '../config/app.config.js';
import NODE_ENV_VALUES from '../config/node_env.enum.js';
import { AccessError } from '../errors/accesss.error.js';
import { UserRole } from '../domains/enums/user-role.enum.js';
import { TokenPayload } from '../dto/types/tokens-payload.type.js';

export function checkAccess(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    
    if (appConfig.nodeEnv == NODE_ENV_VALUES.DEVELOPMENT) 
    {
      next();
      return;
    } 

    try {

      const user = res.locals.user as TokenPayload;

      if (user.role === UserRole.admin) {
        next();
        return;
      }

      if (!user || !user.role || !allowedRoles.includes(user.role)) {
        throw new AccessError("Недостаточно прав");
      }

      next();

    }
    catch (error) {
      throw new AccessError("Нет доступа");
    }
  }
}

