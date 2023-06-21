import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CustomerService } from '../services/customers.service';
import { Customer } from '../entities/customers.entity';

@Controller('api/customer')
export class CustomersController {
    constructor(private customersService: CustomerService) { }
    
    @Get(':id')
    getOne(@Param('id') id: string): Promise<Customer> {
        //example postman @Param    -> http://localhost:3000/api/productos/123
        //example postman @Query    -> http://localhost:3001/api/user?id=1 
        return this.customersService.findUser(id);
    }

    @Get()
    getAll() {
        console.log('getAll');
        return this.customersService.findAll();
    }

    @Post()
    create(@Body() body: Customer) {
        return this.customersService.create(body);
    }


    @Put(':id')
    Update(@Param('id') id: number, @Body() body: any) {
        //return this.taskService.update(id, body);
    }


    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        //return this.taskService.delete(id);
    }


}
