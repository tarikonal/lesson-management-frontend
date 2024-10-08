import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// My
import { ControllerDataService } from 'src/app/shared/layout/services/api/controller-data.service';

@Injectable()
export class DashboardService extends ControllerDataService {
    constructor(http: HttpClient) {
        super(http);
        this.setControllerName("Dashboard"); // Burayı değiştir.
    }
}

