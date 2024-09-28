import { Component } from "@angular/core";
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { InputComponent } from "../../../shared/input/input.component";
import { UserService } from "../../../../shared/service/user.service";
import { ButtonComponent } from "../../../shared/button/button.component";
import { ErrorComponent } from "../../../shared/error/error.component";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingComponent,
    InputComponent,
    ButtonComponent,
    ErrorComponent,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  isLoading: boolean = false;
  error!: string;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
    ]),
  });

  constructor(private userService: UserService) {}

  get emailControl(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }

  async login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const result = await this.userService.login(
      this.loginForm.value as { email: string; password: string }
    );
    if (result) this.error = result.message;
    this.isLoading = false;
  }
}
