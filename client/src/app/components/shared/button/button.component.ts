import { Component, Input } from "@angular/core";

@Component({
  selector: "customButton",
  standalone: true,
  template: `
    <button [id]="id" [type]="type" [disabled]="disabled" class="custom-button">
      {{ label }}
    </button>
  `,
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  @Input() id: string = "";
  @Input() type: "button" | "submit" | "reset" = "button";
  @Input() label: string = "";
  @Input() disabled: boolean = false;
}
