import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AddressService {
  constructor(private readonly configService: ConfigService) {}

  async verifyCep(cep: string) {
    const key = this.configService.get<string>("googleApiKey");
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961454&location_type=ROOFTOP&result_type=street_address&address=${cep}&language=pt-br&key=${key}`;
    return await fetch(url).then((result) => result.json());
  }
}
