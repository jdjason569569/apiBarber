import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { Turn } from 'src/turns/entities/turn.entity';
import * as Twilio from 'twilio';

@Injectable()
export class NotificationService {
  private readonly client: Twilio.Twilio;
  accountSid = 'AC0dc614f6f7c57db90f80080474077071';
  authToken = '3f7e5ce7b09fdee80a6310ea7f681d08';
  constructor(private readonly mailerService: MailerService) {
    this.client = Twilio(this.accountSid, this.authToken);
  }

  async sendEmail(turn: Turn, reason: string) {
    // let reasonText = '';
    // switch (reason) {
    //   case 'new':
    //     reasonText = `Se te ha asignado un turno a las ${turn.date_register.getHours()}: ${turn.date_register.getMinutes()}, por favor espera notificaciones`;
    //     break;
    //   case 'turnChange':
    //   case 'deleteTurn':
    //     reasonText = `Se ha cambiado tu turno a las ${turn.date_register.getHours()}: ${turn.date_register.getMinutes()}, tu turno es ${
    //       turn.order
    //     }, por favor espera notificaciones`;
    //     break;
    //   case 'turnPostpone':
    //     reasonText = `Se ha corrido tu turno 10 minutos  ahora es a las ${turn.date_register.getHours()}: ${turn.date_register.getMinutes()}, tu turno es ${
    //       turn.order
    //     }, por favor espera notificaciones`;
    //     break;
    //   case 'deleteTurnNotification':
    //     reasonText = `Tu turno ha sido eliminado!!`;
    //     break;
    // }

    // if (reason !== '') {
    //   this.mailerService.sendMail({
    //     to: turn.email,
    //     from: 'jdjason569develop@gmail.com',
    //     subject: 'Asignacion de turno',
    //     text: reasonText,
    //   });
    // }
  }

  async sendWhatsapp() {
    await this.client.messages.create({
      body: 'hola te envio un mensaje desde api barber',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+573233494728',
    });
  }
}
