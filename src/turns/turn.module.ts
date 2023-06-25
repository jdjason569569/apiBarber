import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turn } from './entities/turn.entity';
import { TurnService } from './services/turn.service';
import { TurnController } from './controllers/turn.controller';
import { NotificationService } from 'src/utilityServices/notification.service';
import { Customer } from 'src/customers/entities/customers.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([Turn, Customer]),
    
  ],
  providers: [TurnService, NotificationService],
  controllers: [TurnController]
})
export class TurnModule {}
