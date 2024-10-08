import { Component, OnInit } from '@angular/core';
// Theme
import {
    ConfirmationService,
    ConfirmEventType,
    MessageService,
} from 'primeng/api';
// My
import { FamilyService } from '../../services/family.service';
import { FamilyDto } from '../../models/familyDto';
import { CreateFamilyDto } from '../../models/createFamilyDto';
import { UpdateFamilyDto } from '../../models/updateFamilyDto';

@Component({
    selector: 'app-family',
    templateUrl: './family.component.html',
})
export class FamilyComponent implements OnInit {
    familyList!: FamilyDto[];
    familyUpdateModel = new UpdateFamilyDto();
    familySaveModel =   new CreateFamilyDto();
    showGuncelleDialog: boolean = false;
    constructor(
        private amacService: FamilyService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    ngOnInit(): void {
        // this.amacList =
        //     [
        //         {
        //             id: 'any',
        //             aciklama: 'stringstringstringstringstringstringstringstringstringstring',
        //             aktifMi: 'string'
        //         },
        //         {
        //             id: 'any',
        //             aciklama: 'stringstringstringstringstringstringstringstringstringstring',
        //             aktifMi: 'string'
        //         },
        //
        //     ]

        this.getFamilies();
    }

    getFamilies() {
        this.amacService.getAll().subscribe(
            (data) => {
                this.familyList = data; //.body
            },

            (error) => {
                if (error.status === 401) {
                    // Display error message for 401 status code
                    console.log(
                        'Unauthorized: Please provide valid credentials.'
                    );
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Hata',
                        detail: 'Giriş Sayfasına Yönlendiriliyorsunuz',
                    });
                    sessionStorage.clear();
                    window.location.href =
                    'https://lessonManagement.tarikonal.com.tr';
                } else {
                    // Handle other error cases
                    console.error('An error occurred:', error);
                }
            }
        );
    }

    ekle() {
        this.amacService.add(this.familySaveModel).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: ' Eklendi.',
                });

                this.getFamilies();
            },
            error: (err) => {
                //console.log(err);
                if (err.error.status === 400) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Hata',
                        detail: 'Eksik giriş yaptınız.',
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Hata',
                        detail: err.message,
                    });
                } //else
            },
        });
    }

    guncelle() {
        this.amacService.update(this.familyUpdateModel).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: ' Güncellendi',
                });
                this.showGuncelleDialog = false;
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Hata',
                    detail: err.message,
                });
            },
        });
        this.showGuncelleDialog = false;
    }

    guncelleDialog(value: any) {
        console.log(value);
        this.familyUpdateModel = value;
        this.showGuncelleDialog = true;
    }

    sil(id: any) {
        this.confirmationService.confirm({
            message: 'Bu kaydı silmek istediğinize emin misiniz?',
            header: 'Silme İşlemi',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.amacService.delete(id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Başarılı',
                            detail: ' silme işlemi başarılı',
                        });
                        this.getFamilies();
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Hata',
                            detail: err.message,
                        });
                    },
                });
            },
            reject: (type: any) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Reddedildi',
                            detail: ' silme işlemini iptal ettiniz',
                        });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'İptal Edildi',
                            detail: ' silme işleminden çıktınız.',
                        });
                        break;
                }
            },
        });
    }
}
