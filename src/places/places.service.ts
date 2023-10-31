import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlacesService {
  create(createPlaceDto: CreatePlaceDto) {
    return 'This action adds a new place';
  }

  findAll() {
    return {
      places: [
        {
          id: 1,
          name: 'Place 1',
          description: 'This is place 1',
        },
        {
          id: 2,
          name: 'Place 2',
          description: 'This is place 2',
        },
        {
          id: 3,
          name: 'Place 3',
          description: 'This is place 3',
        },
      ],
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} place`;
  }

  update(id: number, updatePlaceDto: UpdatePlaceDto) {
    return `This action updates a #${id} place`;
  }

  remove(id: number) {
    return `This action removes a #${id} place`;
  }
}
