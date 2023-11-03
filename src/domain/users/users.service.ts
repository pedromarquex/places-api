import { PrismaService } from '@/infra/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, email, ...rest } = createUserDto;

    const userAlreadyExists = await this.repository.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (password.length < 6) {
      throw new HttpException(
        'Password must be at least 6 characters long',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordHash = await hash(password, 8);

    return this.repository.user.create({
      data: {
        ...rest,
        password: passwordHash,
        email,
      },
    });
  }

  async login(createUserDto: CreateUserDto) {
    const { password, email } = createUserDto;

    const userExists = await this.repository.user.findUnique({
      where: { email },
    });

    const passwordMatch = await compare(password, userExists.password);

    if (!userExists || !passwordMatch) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    userExists.password = undefined;

    const payload = { userId: userExists.id };
    const token = this.jwtService.sign(payload);

    return {
      user: userExists,
      token,
    };
  }

  async me(userId: string) {
    const user = await this.repository.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.password = undefined;

    return {
      user,
    };
  }

  private findAll() {
    return `This action returns all users`;
  }

  private findOne(id: string) {
    return this.repository.user.findUnique({
      where: { id },
    });
  }

  private update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  private remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
