import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { AddressService } from "./address.service";

@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get("/validateCep/:cep")
  async validateCep(@Param("cep") cep: string) {
    const { results } = await this.addressService.verifyCep(cep);
    if (results.length == 0) throw new BadRequestException("CEP inválido");
    return { address: results[0].formatted_address as string };
  }
}
