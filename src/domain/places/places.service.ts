import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlacesService {
  constructor(private readonly repository: PrismaService) {}

  async create(createPlaceDto: CreatePlaceDto) {
    const place = await this.repository.place.create({
      data: createPlaceDto,
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
