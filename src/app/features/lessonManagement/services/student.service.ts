import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// My
import { ControllerDataService } from 'src/app/shared/layout/services/api/controller-data.service';


@Injectable()
export class StudentService extends ControllerDataService {
    constructor(http: HttpClient) {
        super(http);
        this.setControllerName("Student"); // Burayı değiştir.
    }

   
}
