import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turn } from './entities/turn.entity';
import { TurnService } from './services/turn.service';
import { TurnController } from './controllers/turn.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Turn])  
  ],
  providers: [TurnService],
  controllers: [TurnController]
})
export class TurnModule {}
