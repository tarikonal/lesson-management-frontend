import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

export class DataService {

    constructor(public http: HttpClient, public url: string) {
        this.url = url;
    }

    protected get(adres: string, options?: any) {
        if (options) {
            return <Observable<any>>this.http.get(this.url + adres, options);
        }
        else {
            return <Observable<any>>this.http.get(this.url + adres);
        }
    }

    protected getReguestParam(adres: string, paramName: string, param?: any) {
        if (param != null) {
            let params = new HttpParams();
            params = params.append(paramName, param);
            return <Observable<any>>(this.http.get(this.url + adres, { params: params }));
        } else {
            return this.http.get(this.url + adres);
        }
    }

    protected getAndDownloadFile(adres: any, data?: any) {
        this.http.get(this.url + adres,
            {
                responseType: 'blob',
                observe: 'response',
                headers: { 'Access-Control-Expose-Headers': 'X-Custom-header' },
                params: data
            },).subscribe((blob) => {
                let a = window.document.createElement('a');
                a.href = window.URL.createObjectURL(new Blob([blob.body as BlobPart], { type: blob.headers.get('Content-Type') as string }));
                a.download = blob.headers.get("Content-Disposition") as string
                a.target = '_blank'
                a.click()
            });
    }

    protected postAndDownloadFile(adres: any, data?: any) {
        this.http.post(this.url + adres, data,
            {
                responseType: 'blob',
                observe: 'response',
                headers: { 'Access-Control-Expose-Headers': 'X-Custom-header' },
            },).subscribe((blob) => {
                let a = window.document.createElement('a');
                a.href = window.URL.createObjectURL(new Blob([blob.body as BlobPart], { type: blob.headers.get('Content-Type') as string }));
                a.download = blob.headers.get("Content-Disposition") as string
                a.click()
            });
    }

    protected postAndDownloadFileWithFilename(adres: any, data: any, filename: any) {
        this.http.post(this.url + adres, data,
            {
                responseType: 'blob',
                observe: 'response',
                headers: { 'Access-Control-Expose-Headers': 'X-Custom-header' },
            },).subscribe((blob) => {
                let a = window.document.createElement('a');
                a.href = window.URL.createObjectURL(new Blob([blob.body as BlobPart], { type: blob.headers.get('Content-Type') as string }));
                a.download = filename;
                a.click()
            });
    }

    protected getBlob2(id: any) {
        return this.http.get(this.url + "belgeById/" + id);
    }

    protected post(adres: any, options?: any) {
        const optionsAndHeaders = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: options
        };

        return this.http.post(this.url + adres, options, optionsAndHeaders)
    }

    protected createValue(resource: any, adres: any, options?: any) {
        const options2 = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: options
        };
        return this.http.post(this.url + adres, resource, options2);
    }

    protected updateValue(resource: any, adres: any, options?: any) {
        const options2 = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: options
        };
        return this.http.put(this.url + adres, resource, options2);
    }

    protected deleteValue(adres: any, options?: any) {
        const options2 = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: options
        };
        return this.http.delete(this.url + adres, options2)
            .pipe(map(response => response))
    }
}