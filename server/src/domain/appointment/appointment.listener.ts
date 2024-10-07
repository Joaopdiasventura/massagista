import { SendMessageDto } from "./dto/send-message.dto";
import { WhatsappService } from "./../../shared/service/whatsapp/whatsapp.service";
import { EmailService } from "../../shared/service/email/email.service";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class AppointmentListener {
  constructor(
    private readonly whatsappService: WhatsappService,
    private readonly emailService: EmailService,
  ) {}

  @OnEvent("sendMessage")
  handleSendMessage(sendMessageDto: SendMessageDto) {
    this.whatsappService.sendMessage(sendMessageDto);
    this.emailService.sendMessage(sendMessageDto);
  }
}
