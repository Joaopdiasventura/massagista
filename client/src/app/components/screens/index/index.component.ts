import { UserContext } from "./../../../shared/context/user.context";
import { Component } from "@angular/core";
import { UserService } from "../../../shared/service/user.service";
import { LoadingComponent } from "../../shared/loading/loading.component";
import { User } from "../../../shared/interface/user.interface";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-index",
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: "./index.component.html",
  styleUrl: "./index.component.scss",
})
export class IndexComponent {
  isLoading: boolean = false;
  currentUser!: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private userContext: UserContext
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userContext.currentUserData.subscribe((userData) => {
      if (!userData) {
        const token = localStorage.getItem("token");
        if (!token) {
          this.router.navigate(["/login"]);
          return;
        }
        this.userService.handleToken(token);
        return;
      }
      this.currentUser = userData;
    });
    this.isLoading = false;
  }
}
