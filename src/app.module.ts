import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TurnModule } from './turns/turn.module';
import { MailerModule } from '@nestjs-modules/mailer';
require('dotenv').config()


@Module({
  imports: [UserModule, TurnModule, ScheduleModule.forRoot(),TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432') ,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    retryDelay: 3000,
    retryAttempts: 10
  }), MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: 'jdjason569develop@gmail.com', // Aquí debes ingresar tu dirección de correo electrónico
        pass: 'cgfegbihhdrcebtw', // Aquí debes ingresar contraseña de verificacion de dos pasos
      },
      tls: {
        ciphers: 'SSLv3',
      },
      socketTimeout: 90000, // aumentar el tiempo de espera a 60 segundos
    },
    defaults: { 
      from: '"No Reply" <jdjason569develop@gmail.com>', // Aquí debes ingresar la dirección de correo electrónico desde la que quieres enviar los correos electrónicos
    },
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
