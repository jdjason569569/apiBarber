import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turn } from './entities/turn.entity';
import { TurnService } from './services/turn.service';
import { TurnController } from './controllers/turn.controller';
import { NotificationService } from 'src/utilityServices/notification.service';
import { Customer } from 'src/customers/entities/customers.entity';
import { CustomerService } from 'src/customers/services/customers.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([Turn, Customer]),
    
  ],
  providers: [TurnService, NotificationService, CustomerService],
  controllers: [TurnController]
})
export class TurnModule {}
