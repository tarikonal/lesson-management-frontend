import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// My
import { DataService } from './data.service';

@Injectable()
export class ControllerDataService extends DataService {
    constructor(http: HttpClient) {
        super(http, environment.backendUrl);
    }

    private _controllerName: string = 'Data/';

    // Başlangıçta bu method çağrılmalı.
    protected setControllerName(controllerName: string = "Data") {
        this._controllerName = controllerName + "/";
    }

    // Controller name i çağır.
    protected getControllerName(): string {
        return this._controllerName;
    }

    // Uygulama ID çağır.
    // protected getUygulamaId(): number {
    //     return environment.uygulamaId;
    // }

    getAll(options?: any): Observable<any> {
        return this.get(this._controllerName + 'GetAll', options);
    }

    getAllAsync(options?: any): Observable<any> {
        return this.get(this._controllerName + 'GetAllAsync', options);
    }

    getById(id: any): Observable<any> {
        return this.get(this._controllerName + 'GetById/' + id);
    }

    getByIdAsync(id: any): Observable<any> {
        return this.get(this._controllerName + 'GetByIdAsync/' + id);
    }

    add(options?: any): Observable<any> {
        return this.post(this._controllerName + 'Add', options);
    }

    addAsync(options?: any): Observable<any> {
        return this.post(this._controllerName + 'AddAsync', options);
    }

    update(options?: any): Observable<any> {
        return this.updateValue(options, this._controllerName + 'Update', options);
    }

    updateAsync(options?: any): Observable<any> {
        return this.updateValue(options, this._controllerName + 'UpdateAsync', options);
    }

    delete(id: any): Observable<any> {
        return this.deleteValue(this._controllerName + 'Delete/' + id);
    }

    deleteAsync(id: any): Observable<any> {
        return this.deleteValue(this._controllerName + 'DeleteAsync/' + id);
    }

    deleteWithModel(options?: any): Observable<any> {
        return this.updateValue(options, this._controllerName + 'DeleteWithModel', options);
    }

    deleteWithModelAsync(options?: any): Observable<any> {
        return this.updateValue(options, this._controllerName + 'DeleteWithModelAsync', options);
    }
}
