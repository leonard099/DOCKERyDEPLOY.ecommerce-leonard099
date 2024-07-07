import { Request, Response, NextFunction} from "express";
export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`Se registra una petición a la ruta ${req.path} de tipo ${req.method} en la fecha ${new Date()}`);
  next();
}