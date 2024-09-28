import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TimeoutInterceptor } from "./shared/interceptor/timeout.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { AppConfig } from "./config/app.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: AppConfig().frontend,
    methods: ["GET", "DELETE", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalGuards();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}
bootstrap();
