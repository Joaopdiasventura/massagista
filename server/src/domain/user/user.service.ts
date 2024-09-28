import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { hash, genSalt, compare } from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findById(_id: string): Promise<User> {
    return await this.userModel.findById(_id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(id, updateUserDto);
    return `Usuário atualizado com sucesso`;
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return `Usuário deletado com sucesso`;
  }

  async hashPassword(password: string) {
    return await hash(
      password,
      await genSalt(parseInt(this.configService.get("salt"))),
    );
  }
  
  async comparePasswords(password: string, password_: string) {
    return await compare(password, password_);
  }

  async verifyCep(cep: string) {
    const key = this.configService.get<string>("googleApiKey");
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961454&location_type=ROOFTOP&result_type=street_address&address=${cep}&language=pt-br&key=${key}`;
    return await fetch(url).then((result) => result.json());
  }
}
