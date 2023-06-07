import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TurnService } from '../services/turn.service';

@Controller('api/turns')
export class TurnController {
  constructor(private turnService: TurnService) {}

  @Get()
  getAll() {
    return this.turnService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.turnService.create(body, false);
  }

  @Put('order/update/:newIndex')
  async createOrder(
    @Param('newIndex', ParseIntPipe) newIndex: number,
    @Body() body: any,
  ) {
    return await this.turnService.orderCreate(body, newIndex);
  }

  @Put('postpone')
  async postpone(
    @Body() body: any,
  ) {
    return await this.turnService.postpone(body);
  }

  @Put(':id')
  Update(@Param('id') id: number, @Body() body: any) {
    return this.turnService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.turnService.delete(id);
  }
}
