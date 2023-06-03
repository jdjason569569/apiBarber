
import { Injectable  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { users } from 'src/user/entities/users.entity';
import { Turn } from 'src/turns/entities/turn.entity';

@Injectable()
export class NotificationService {

    constructor(private readonly mailerService: MailerService) {}

     async sendEmail(turn: Turn, reason:string) {
      let reasonText = '';
      switch(reason){
        case 'new':
           reasonText = `Se te ha asignado un turno a las ${turn.date_register.getHours()}: ${turn.date_register.getMinutes()}, por favor espera notificaciones`;
          break;
      }


      if(reason !== ''){
        this.mailerService.sendMail({
          to: turn.email,
          from: 'jdjason569develop@gmail.com',
          subject: 'Asignacion de turno',
          text: reasonText,
        });
      }
    }

    

     

   
}
