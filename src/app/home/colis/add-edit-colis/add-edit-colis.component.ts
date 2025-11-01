import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ErrorMessageComponent} from '../../../components/error-message/error-message.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-edit-colis',
  imports: [
    ReactiveFormsModule,
    ErrorMessageComponent,
    NgIf
  ],
  templateUrl: './add-edit-colis.component.html',
})
export class AddEditColisComponent {

  colisForm = new FormGroup({
    codeColis: new FormControl('', [Validators.required]),
    libelleColis: new FormControl('', [Validators.required]),
    poidsColis: new FormControl('', [Validators.required]),
    descriptionColis: new FormControl('', [Validators.required]),
    typeColis: new FormControl('', [Validators.required]),
  })

  errorMessage = "";

  onColisAdd() {
    if(this.colisForm.valid) {
      console.log(this.colisForm.value);
    } else {
      this.errorMessage = "Vérifier vos entrées";
    }
  }

}
