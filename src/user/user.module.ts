import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './entities/users.entity';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/users.controller';
import { NotificationService } from 'src/utilityServices/notification.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([users])  
      ],
      providers: [UserService, NotificationService],
      controllers: [UsersController]
})
export class UserModule {}
