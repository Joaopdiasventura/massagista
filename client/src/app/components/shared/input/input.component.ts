// input.component.ts
import { Component, Input } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";

@Component({
  selector: "custom-input",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <input
      [id]="id"
      [name]="name"
      [type]="type"
      [placeholder]="placeholder"
      [formControl]="control"
      required
    />
  `,
  styleUrls: ["./input.component.scss"],
})
export class InputComponent {
  @Input() id: string = "";
  @Input() name: string = "";
  @Input() type: string = "text";
  @Input() placeholder: string = "";
  @Input() control: FormControl = new FormControl();
}
