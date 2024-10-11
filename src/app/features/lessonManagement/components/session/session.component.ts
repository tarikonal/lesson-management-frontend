import { Component, OnInit } from '@angular/core';
// Theme
import {
    ConfirmationService,
    ConfirmEventType,
    MessageService,
} from 'primeng/api';
// My
//import { CalendarModule } from 'primeng/calendar';
import { SessionDto } from '../../models/sessionDto';
import { StudentDto } from '../../models/studentDto';
import { TeacherDto } from '../../models/teacherDto';
import { UpdateSessionDto } from '../../models/updateSessionDto';
import { LessonDto } from '../../models/lessonDto';
import { CreateSessionDto } from '../../models/createSessionDto';
import { StudentService } from '../../services/student.service';
import { TeacherService } from '../../services/teacher.service';
import { SessionService } from '../../services/session.service';
import { LessonService } from '../../services/lesson.service';
@Component({
    selector: 'app-session',
    templateUrl: './session.component.html',
})
export class SessionComponent implements OnInit {
    sessionList!: SessionDto[];
    lessonList!: LessonDto[];
    studentList!: StudentDto[];
    teacherList!: TeacherDto[];
    date?:string;
    sessionUpdateModel = new UpdateSessionDto();
    sessionSaveModel = new CreateSessionDto();
    showGuncelleDialog: boolean = false;
    constructor(
        private teacherService: TeacherService,
        private sessionService: SessionService,
        private studentService: StudentService,
        private lessonService: LessonService,
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

        this.getSessions();
        this.getLessons();
        this.getStudents();
        this.getTeachers();
    }
  // Method to calculate total price
  getTotalPrice(): number {
    return this.sessionList.reduce((sum, session) => {
      return sum + (session.durationInHours! * session.hourlyPrice!);
    }, 0); // Start the sum from 0
  }

    getLessons() {
      
        this.lessonService.getAllAsync().subscribe(
            (data) => {
                this.lessonList = data; //.body
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
                   // sessionStorage.clear();
                    // window.location.href =
                    // 'https://lessonManagement.tarikonal.com.tr';
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


    getTeachers() {
        this.teacherService.getAllAsync().subscribe(
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
                    //sessionStorage.clear();
                    // window.location.href =
                    // 'https://lessonManagement.tarikonal.com.tr';
                } else {
                    // Handle other error cases
                    console.error('An error occurred:', error);
                }
            }
        );
    }

    getSessions() {
        this.sessionService.getAllAsync().subscribe(
            (data) => {
                this.sessionList = data; //.body
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
                    // 'https://lessonManagement.tarikonal.com.tr';
                    
                } else {
                    // Handle other error cases
                    console.error('An error occurred:', error);
                }
            }
        );
    }

    ekle() {
        this.sessionService.addAsync(this.sessionSaveModel).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: ' Eklendi.',
                });

                this.getSessions();
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
        this.sessionService.updateAsync(this.sessionUpdateModel).subscribe({
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
        this.sessionUpdateModel = value;
        this.showGuncelleDialog = true;
    }

    sil(id: any) {
        this.confirmationService.confirm({
            message: 'Bu kaydı silmek istediğinize emin misiniz?',
            header: 'Silme İşlemi',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.sessionService.deleteAsync(id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Başarılı',
                            detail: ' silme işlemi başarılı',
                        });
                        this.getSessions();
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
