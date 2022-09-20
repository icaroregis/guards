import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  public assets: string = '../../../../../../assets/Angular.png';
  public email: string = '';
  public password: string = '';

  public cadastroForm: FormGroup = this.fb.group({
    email: [this.email, [Validators.required, Validators.email]],
    password: [this.password, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
