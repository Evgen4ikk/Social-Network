import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
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
      expiresIn: '1h'
    });

    response.cookie('session', session, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      sameSite: 'none',
      httpOnly: true,
      secure: true
    });

    return { message: 'Авторизация успешна' };
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  public async getUserByToken(token: string) {
    const payload: { userId: number } = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET
    });
    const user = await this.userRepository.findOneBy({ id: payload.userId });

    if (!user) throw new NotFoundException();

    return { user };
  }
}
