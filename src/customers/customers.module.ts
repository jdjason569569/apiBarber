import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from 'src/utilityServices/notification.service';
import { Customer } from './entities/customers.entity';
import { CustomerService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
@Module({
    imports: [
        TypeOrmModule.forFeature([Customer])  
      ],
      providers: [CustomerService, NotificationService],
      controllers: [CustomersController]
})
export class CustomersModule {}
