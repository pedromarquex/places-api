import { PrismaService } from '@/infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlacesService {
  constructor(private readonly repository: PrismaService) {}

  async create(createPlaceDto: CreatePlaceDto, userId: string) {
    const user = await this.repository.user.findUnique({
      where: { id: userId },
    });

    const place = await this.repository.place.create({
      data: { ...createPlaceDto, user: { connect: { id: user.id } } },
    });

    return place;
  }

  async findAll() {
    return await this.repository.place.findMany();
  }

  findOne(id: string) {
    return this.repository.place.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePlaceDto: UpdatePlaceDto) {
    return this.repository.place.update({
      where: { id },
      data: updatePlaceDto,
    });
  }

  remove(id: string) {
    return this.repository.place.delete({
      where: { id },
    });
  }
}
