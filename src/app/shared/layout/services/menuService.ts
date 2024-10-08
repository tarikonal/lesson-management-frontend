import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// My
import { ControllerDataService } from './api/controller-data.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
})
export class MenuService extends ControllerDataService {
    constructor(http: HttpClient) {
        super(http);
        this.setControllerName("DisServis"); // Burayı değiştir.
    }

    // Kullanıcımım yetkili oldugu menüleri getir.
    // async GetKullaniciMenus(kullaniciAdi: string): Promise<Observable<any>> {
    //     return  await this.http.get(environment.backendUrlMenu + this.getControllerName() + 'GetKullaniciMenus?kullaniciAdi=' + kullaniciAdi + '&uygulamaId=' + this.getUygulamaId().toString());
    // }
}
