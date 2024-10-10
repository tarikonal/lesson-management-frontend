import { Component, OnInit } from '@angular/core';
// Theme
import {
    ConfirmationService,
    ConfirmEventType,
    MessageService,
} from 'primeng/api';
// My
import { FamilyService } from '../../services/family.service';
import { StudentService } from '../../services/student.service';
import { StudentDto } from '../../models/studentDto';
import { CreateStudentDto } from '../../models/createStudentDto';
import { UpdateStudentDto } from '../../models/updateStudentDto';
import { FamilyDto } from '../../models/familyDto';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
})
export class StudentComponent implements OnInit {
    familyList!: FamilyDto[];
    studentList!: StudentDto[];
    studentUpdateModel = new UpdateStudentDto();
    studentSaveModel = new CreateStudentDto();
    showGuncelleDialog: boolean = false;
    constructor(
        private studentService: StudentService,
        private familyService: FamilyService,
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

        this.getStudents();
        this.getFamilies();
    }

    getFamilies() {
        //var userName = localStorage.getItem('currentUser');
        this.familyService.getAllAsync().subscribe(
            (data) => {
                this.familyList = data; //.body
            },

            (error) => {
                console.log(error);
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
                   // sessionStorage.clear();
                    window.location.href =
                    'http://localhost:4200/#';
                } else {
                    // Handle other error cases
                    console.error('An error occurred:', error);
                }
            }
        );
    }

    getStudents() {
        this.studentService.getAllAsync().subscribe(
            (data) => {
                this.studentList = data; //.body
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
                    //sessionStorage.clear();
                    // window.location.href =
                    //     'https://lessonManagement.tarikonal.com.tr';
                } else {
                    // Handle other error cases
                    console.error('An error occurred:', error);
                }
            }
        );
    }

    ekle() {
        console.log('FamilyID = '+JSON.stringify(this.studentSaveModel.familyId))
        this.studentService.addAsync(this.studentSaveModel).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: ' Eklendi.',
                });

                this.getStudents();
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
                    console.error('An error occurred:', err);
                } //else
            },
        });
    }

    guncelle() {
        this.studentService.updateAsync(this.studentUpdateModel).subscribe({
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
                console.error('An error occurred:', err);
            },
        });
        this.showGuncelleDialog = false;
    }

    guncelleDialog(value: any) {
        console.log(value);
        this.studentUpdateModel = value;
        this.showGuncelleDialog = true;
    }

    sil(id: any) {
        this.confirmationService.confirm({
            message: 'Bu kaydı silmek istediğinize emin misiniz?',
            header: 'Silme İşlemi',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.studentService.deleteAsync(id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Başarılı',
                            detail: ' silme işlemi başarılı',
                        });
                        this.getStudents();
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Hata',
                            detail: err.message,
                        });
                        console.error('An error occurred:', err);
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
