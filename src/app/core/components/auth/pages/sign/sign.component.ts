import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  public assets: string = '../../../../../../assets/Angular.png';
  public email: string = '';
  public password: string = '';
  public messageError: string = '';

  public cadastroForm: FormGroup = this.fb.group({
    email: [this.email, [Validators.required, Validators.email]],
    password: [this.password, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  public submitForm() {
    if (this.cadastroForm.valid) {
      this.authService
        .sign({
          email: this.cadastroForm.value.email,
          password: this.cadastroForm.value.password,
        })
        .subscribe({
          next: (res) => res,
          error: (error) => (this.messageError = error),
        });
    }
  }
}
