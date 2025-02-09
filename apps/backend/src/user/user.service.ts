import { Inject, Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { AuthService } from '@/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(AuthService)
    private authService: AuthService
  ) {}

  async getProfile(token: string) {
    const user = await this.authService.getUserByToken(token);
    return instanceToPlain(user);
  }
}
