import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { Repository } from 'typeorm';

import { User } from '@/user/entity/user.entity';

import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async signUp(signupDto: SignupDto, response: Response) {
    const { login, password, name } = signupDto;

    const existingUser = await this.userRepository.findOne({ where: { login } });

    if (existingUser) {
      throw new ConflictException('Пользователь с таким логином уже существует');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = this.userRepository.create({
      login,
      password: hashedPassword,
      name
    });

    await this.userRepository.save(newUser);
    return this.generateTokens(newUser.id, response);
  }

  async signIn(loginDto: SigninDto, response: Response) {
    const { login, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { login } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return this.generateTokens(user.id, response);
  }

  async signOut(response: Response) {
    response.clearCookie('session', {
      sameSite: 'none',
      httpOnly: true,
      secure: true
    });

    return { message: 'Вы успешно вышли' };
  }

  private async generateTokens(userId: number, response: Response) {
    const payload = { userId };
    const session = await this.jwtService.signAsync(payload, {
      expiresIn: '1d'
    });

    response.cookie('session', session, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    return { message: 'Авторизация успешна' };
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  public async getUserByToken(token: string) {
    if (!token) return false;

    try {
      const payload: { userId: number } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.userId },
        relations: [
          'sentRequests',
          'receivedRequests',
          'sentRequests.recipient',
          'receivedRequests.requester'
        ]
      });

      if (!user) return false;

      return {
        user: {
          ...instanceToPlain(user),
          friends: user.friends
        }
      } as { user: User };
    } catch {
      return false;
    }
  }

  public async checkSession(token: string) {
    if (!token)
      return {
        success: false
      };

    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      });
      return {
        success: true
      };
    } catch {
      return {
        success: false
      };
    }
  }
}
