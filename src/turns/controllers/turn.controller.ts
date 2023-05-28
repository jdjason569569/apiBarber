import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TurnService } from '../services/turn.service';


@Controller('api/turns')
export class TurnController {

    constructor(private turnService: TurnService){}

    @Get()
    getAll(){
        return this.turnService.findAll();
    }

    @Post()
    create(@Body() body: any){    
      return this.turnService.create(body, false);
    }

    @Put('order/create')
    async createOrder(@Body() body: any){    
      console.log('order/create');
      return await this.turnService.orderCreate(body);
    }
    
    @Put(':id')
    Update(@Param('id') id: number, @Body() body: any)
    {
        return this.turnService.update(id, body);
    }
    
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.turnService.delete(id);
    }


}
