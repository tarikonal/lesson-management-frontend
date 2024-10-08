import { Component } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-custom-spinner',
  templateUrl: './custom-spinner.component.html'
})

export class CustomSpinnerComponent {
    constructor(public loader: LoaderService) { }
}
