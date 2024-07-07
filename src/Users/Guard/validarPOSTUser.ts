import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

const validarPostUser=(body)=>{
    if (body.email,body.name,body.password,body.address,body.phone,body.country,body.city) {
        return true
    } else {
        return false
    }
}
@Injectable()
export class validarPOSTUser implements CanActivate{
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        let body = context.switchToHttp().getRequest().body;
        return validarPostUser(body)
    }
}