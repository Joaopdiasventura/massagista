import { Injectable } from "@nestjs/common";
import { SendMessageDto } from "../../../domain/appointment/dto/send-message.dto";

@Injectable()
export class WhatsappService {
  async sendMessage(sendMessageDto: SendMessageDto) {
    console.log("zapzap", sendMessageDto);
  }
}
