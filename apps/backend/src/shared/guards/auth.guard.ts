import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies.session;

    if (!token) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

export const ApiAuthorizedOnly = (...otherGuards: (any | CanActivate)[]) =>
  UseGuards(AuthGuard, ...otherGuards);
