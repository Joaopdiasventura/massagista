import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpCode,
  UnauthorizedException,
  UseGuards,
  NotFoundException,
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
import { AuthenticatedRequest } from "../../shared/interface/authenticated-request.interface";
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
    const existUser = await this.userService.findByEmail(createUserDto.email);
    if (existUser)
      throw new BadRequestException("Já existe um usuário com esse email");
    createUserDto.password = await this.userService.hashPassword(
      createUserDto.password,
    );
    const user = await this.userService.create(createUserDto);
    return {
      token: await this.authService.generateToken(user._id.toString()),
      user,
    };
  }

  @HttpCode(200)
  @Post("/login")
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (!user) throw new NotFoundException("Email não cadastrado");
    if (
      !(await this.userService.comparePasswords(
        loginUserDto.password,
        user.password,
      ))
    )
      throw new UnauthorizedException("Senha incorreta");
    return {
      token: await this.authService.generateToken(user._id.toString()),
      user,
    };
  }

  @HttpCode(200)
  @Post("decodeToken")
  async decodeToken(@Body() decodeTokenDto: DecodeTokenDto) {
    return this.findById(
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
  @Get(":_id")
  async findById(@Param("_id") _id: string) {
    try {
      const user = await this.userService.findById(_id);
      if (!user) throw new NotFoundException("Usuário não encontrado");
      return user;
    } catch (error) {
      throw new NotFoundException("Usuário não encontrado");
    }
  }

  @Get("/validateCep/:cep")
  async validateCep(@Param("cep") cep: string) {
    const { results } = await this.userService.verifyCep(cep);
    if (results.length == 0) throw new BadRequestException("CEP inválido");
    return { address: results[0].formatted_address };
  }

  @UseGuards(AuthGuard)
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: AuthenticatedRequest,
  ) {
    await this.findById(_id);
    if (!(request.user._id.toString() == _id || request.user.adm))
      throw new UnauthorizedException(
        "Você não tem permissão para atualizar este usuário",
      );

    return this.userService.update(_id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":_id")
  async remove(
    @Param("_id") _id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    await this.findById(_id);
    if (!(request.user._id.toString() == _id || request.user.adm))
      throw new UnauthorizedException(
        "Você não tem permissão para atualizar este usuário",
      );

    return { message: await this.userService.remove(_id) };
  }
}
