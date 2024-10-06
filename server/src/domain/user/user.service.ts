import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserRepository } from "./user.repository";
import { ConfigService } from "@nestjs/config";
import { hash, genSalt, compare } from "bcrypt";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.checkEmailExists(createUserDto.email);
    createUserDto.password = await this.hashPassword(createUserDto.password);
    return await this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException("Usuário não encontrado");
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException("Usuário não encontrado");
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (updateUserDto.email && updateUserDto.email != user.email)
      await this.checkEmailExists(updateUserDto.email);

    if (updateUserDto.password)
      updateUserDto.password = await this.hashPassword(updateUserDto.password);

    return await this.userRepository.update(id, { ...user, ...updateUserDto });
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.userRepository.remove(id);
  }

  async validateLogin(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.findByEmail(loginUserDto.email);
    if (!(await this.comparePasswords(loginUserDto.password, user.password)))
      throw new UnauthorizedException("Senha incorreta");
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(
      password,
      await genSalt(parseInt(this.configService.get("salt"))),
    );
  }

  async comparePasswords(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await compare(password, passwordHash);
  }

  async checkEmailExists(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new BadRequestException(
        "Já existe um usuário cadastrado com esse email",
      );
    }
  }
}
