import { PrismaModule } from '@/infra/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        PrismaModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '7d' },
        }),
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
