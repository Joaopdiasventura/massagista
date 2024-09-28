import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Component } from "@angular/core";
import { UserService } from "../../../../shared/service/user.service";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../../../shared/button/button.component";
import { InputComponent } from "../../../shared/input/input.component";
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { ErrorComponent } from "../../../shared/error/error.component";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingComponent,
    InputComponent,
    ButtonComponent,
    ErrorComponent,
  ],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  isLoading: boolean = false;
  error: string | undefined;
  address: string | undefined;

  registerForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    name: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    cep: new FormControl("", [
      Validators.required,
      Validators.pattern("\\d{8}"),
    ]),
    number: new FormControl("", [Validators.required]),
    birthDate: new FormControl(new Date(), [Validators.required]),
  });

  constructor(private userService: UserService) {}

  get emailControl(): FormControl {
    return this.registerForm.get("email") as FormControl;
  }

  get passwordControl(): FormControl {
    return this.registerForm.get("password") as FormControl;
  }

  get nameControl(): FormControl {
    return this.registerForm.get("name") as FormControl;
  }

  get cepControl(): FormControl {
    return this.registerForm.get("cep") as FormControl;
  }

  get numberControl(): FormControl {
    return this.registerForm.get("number") as FormControl;
  }

  get birthDateControl(): FormControl {
    return this.registerForm.get("birthDate") as FormControl;
  }

  async register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (!this.address) {
      this.error = "Valide o CEP";
      return;
    }

    this.isLoading = true;

    const fullAddress = `${(this.cepControl.value as string).replace("-", "")}${
      this.numberControl.value
    }`;

    const formData = new FormData();
    formData.append("email", this.emailControl.value);
    formData.append("password", this.passwordControl.value);
    formData.append("name", this.nameControl.value);
    formData.append("address", fullAddress);
    formData.append(
      "birthDate",
      new Date(this.birthDateControl.value).toISOString()
    );

    const result = await this.userService.register(formData);
    if (result) this.error = result.message;

    this.isLoading = false;
  }

  async verifyCep() {
    if (this.cepControl.value == "") {
      this.cepControl.setErrors({ pattern: true });
      return;
    }
    this.isLoading = true;
    try {
      const { address } = await this.userService.verifyCep(
        this.cepControl.value
      );
      this.error = undefined;
      this.address = address;
    } catch (error: any) {
      this.error = error;
      this.address = undefined;
    } finally {
      this.isLoading = false;
    }
  }

  isFieldInvalid(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }
}
