import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Req,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { DecodeTokenDto } from "./dto/decode-token.dto";
import { AuthService } from "../../auth/auth.service";
import { AuthGuard } from "../../auth/guard/auth.guard";
import { Access } from "../../auth/decorator/roles.decorator";
import { AuthenticatedRequest } from "../../shared/models/authenticated-request.interface";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseInterceptors(FileInterceptor("file"))
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return {
      token: await this.authService.generateToken(user.id),
      user,
    };
  }

  @HttpCode(200)
  @Post("/login")
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.validateLogin(loginUserDto);
    return {
      token: await this.authService.generateToken(user.id),
      user,
    };
  }

  @HttpCode(200)
  @Post("decodeToken")
  async decodeToken(@Body() decodeTokenDto: DecodeTokenDto) {
    return await this.findById(
      await this.authService.decodeToken(decodeTokenDto.token),
    );
  }

  @UseGuards(AuthGuard)
  @Access("adm")
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findById(@Param("id") id: string) {
    return await this.userService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: AuthenticatedRequest,
  ) {
    this.authService.validatePermission(request.user.id, id, request.user.adm);
    const user = await this.userService.update(id, updateUserDto);
    return { message: "Usuário atualizado com sucesso", user };
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async remove(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    this.authService.validatePermission(request.user.id, id, request.user.adm);
    await this.userService.remove(id);
    return { message: "Usuário deletado com sucesso" };
  }
}
