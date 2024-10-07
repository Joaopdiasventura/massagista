import { Injectable } from "@nestjs/common";
import { SendMessageDto } from "../../../domain/appointment/dto/send-message.dto";

@Injectable()
export class EmailService {
  async sendMessage(sendMessageDto: SendMessageDto) {
    console.log("email", sendMessageDto);
  }
}
