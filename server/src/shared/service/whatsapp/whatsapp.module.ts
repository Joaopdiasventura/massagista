import { Module } from "@nestjs/common";
import { WhatsappService } from "./whatsapp.service";

@Module({
  exports: [WhatsappService],
  providers: [WhatsappService],
})
export class WhatsappModule {}
