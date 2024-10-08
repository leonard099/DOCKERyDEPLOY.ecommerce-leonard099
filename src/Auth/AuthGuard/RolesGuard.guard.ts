import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/Decoradores/Roles.Decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const roleDefinido = this.reflector.getAllAndOverride<UserRole[]>('role', [
            context.getHandler(),
            context.getClass()
        ]);
        
        const request = context.switchToHttp().getRequest();
        const userRole = request.user.role;

        const verificar = roleDefinido.some(rol => rol === userRole)
        if(!verificar){
            throw new ForbiddenException('No tienes permiso para acceder a esta ruta');
        }
        return verificar;
    }
}
