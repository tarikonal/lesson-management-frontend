import { Component, OnInit } from '@angular/core';
// Theme
import {
    ConfirmationService,
    ConfirmEventType,
    MessageService,
} from 'primeng/api';
// My
import { TeacherService } from '../../services/teacher.service';
import { TeacherDto } from '../../models/teacherDto';
import { UpdateTeacherDto } from '../../models/updateTeacherDto';
import { CreateTeacherDto } from '../../models/createTeacherDto';
@Component({
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
})
export class TeacherComponent implements OnInit {
    teacherList!: TeacherDto[];
    teacherUpdateModel = new UpdateTeacherDto();
    teacherSaveModel = new CreateTeacherDto();
    showGuncelleDialog: boolean = false;
    constructor(
        private teacherService: TeacherService,
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

        this.getTeachers();
    }

    getTeachers() {
        this.teacherService.getAll().subscribe(
            (data) => {
                this.teacherList = data; //.body
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
        this.teacherService.add(this.teacherSaveModel).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: ' Eklendi.',
                });

                this.getTeachers();
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
        this.teacherService.update(this.teacherUpdateModel).subscribe({
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
        this.teacherUpdateModel = value;
        this.showGuncelleDialog = true;
    }

    sil(id: any) {
        this.confirmationService.confirm({
            message: 'Bu kaydı silmek istediğinize emin misiniz?',
            header: 'Silme İşlemi',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.teacherService.delete(id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Başarılı',
                            detail: ' silme işlemi başarılı',
                        });
                        this.getTeachers();
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
