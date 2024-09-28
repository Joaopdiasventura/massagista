import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../environment/environment";
import { UserContext } from "../context/user.context";
import { User } from "../interface/user.interface";

@Injectable({ providedIn: "root" })
export class UserService {
  private baseUrl = environment.apiUrl + "/user";

  constructor(
    private http: HttpClient,
    private router: Router,
    private userContext: UserContext
  ) {}

  public async register(dto: FormData) {
    try {
      const { token } = await firstValueFrom(
        this.http.post<{ token: string }>(this.baseUrl, dto)
      );
      await this.handleToken(token);
      return;
    } catch (error: any) {
      return error.error as { message: string };
    }
  }

  public async login(dto: { email: string; password: string }) {
    try {
      const { token } = await firstValueFrom(
        this.http.post<{ token: string }>(this.baseUrl + "/login", dto)
      );
      await this.handleToken(token);
      return;
    } catch (error: any) {
      return error.error as { message: string };
    }
  }

  public async handleToken(token: string) {
    localStorage.setItem("token", token);
    try {
      const result = await firstValueFrom(
        this.http.post<User>(this.baseUrl + "/decodeToken", { token })
      );
      this.userContext.updateUserData(result);
      this.router.navigate(["/"]);
    } catch (error: any) {
      alert("Erro ao decodificar token: " + error.error.message);
      this.router.navigate(["/login"]);
    }
  }

  public async verifyCep(cep: string) {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("token") as string,
    });
    try {
      return await firstValueFrom(
        this.http.get<{ address: string }>(
          this.baseUrl + "/validateCep/" + cep,
          { headers }
        )
      );
    } catch (error: any) {
      return error.error as { message: string };
    }
  }
}
