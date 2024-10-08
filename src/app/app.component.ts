import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './shared/layout/services/app.layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(
        private primengConfig: PrimeNGConfig,
        private layoutService: LayoutService
    ) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true;

        this.layoutService.config = {
            ripple: true, // toggles ripple on and off filled , outlined
            inputStyle: 'outlined', // default style for input elements
            menuMode: 'slim-plus', // layout mode of the menu, valid values are "static", "overlay", "slim", "horizontal", "drawer" and "reveal"
            colorScheme: 'light', // color scheme of the template, valid values are "light" and "dark"
            componentTheme: 'teal', // default component theme for PrimeNG
            scale: 15, // size of the body font size to scale the whole application
            menuTheme: 'dark', // theme of the menu
            topbarTheme: 'dark', // theme of the topbar
            menuProfilePosition: 'start', // position of the profile menu inside the main menu, valid values are "start" and "end",
        };

        // prime ng z indeksleri ayarla.
        this.primengConfig.zIndex = {
            modal: 1100,    // dialog, sidebar
            overlay: 1000,  // dropdown, overlaypanel
            menu: 1000,     // overlay menus
            tooltip: 1100   // tooltip
        };

        this.primengConfig.setTranslation({
            startsWith: 'Şununla Başlar',
            contains: 'Şunları İçerir',
            notContains: 'Şunları İçermez',
            endsWith: 'Şununla Biter',
            equals: 'Eşittir',
            notEquals: 'Eşit Değildir',
            noFilter: 'Filtre Yok',
            apply: 'Uygula',
            matchAll: 'Hepsini Eşleştir',
            matchAny: 'Herhangi Birini Eşleştir',
            addRule: 'Kural Ekle',
            clear: 'Temizle',
            lt: 'den Küçük',
            lte: 'den Küçük veya Eşit',
            gt: 'den Büyük',
            gte: 'den Büyük veya Eşit',
            is: 'Seçilen',
            isNot: 'Seçilen değil.',
            before: 'Önce',
            after: 'Sonra',
            dateIs: 'Seçilen Tarih',
            dateIsNot: 'Seçilen Tarih Değil',
            dateBefore: 'Seçilen Tarihten Önce',
            dateAfter: 'Seçilen Tarihten Sonra',
            removeRule: 'Kuralı Sil',
            accept: 'Evet',
            reject: 'Hayır',
            choose: 'Seç',
            upload: 'Yükle',
            cancel: 'İptal',
            monthNames: [
                'Ocak',
                'Şubat',
                'Mart',
                'Nisan',
                'Mayıs',
                'Haziran',
                'Temmuz',
                'Ağustos',
                'Eylül',
                'Ekim',
                'Kasım',
                'Aralık',
            ],
            monthNamesShort: [
                'Oca',
                'Şub',
                'Mar',
                'Nis',
                'May',
                'Haz',
                'Tem',
                'Ağu',
                'Eyl',
                'Eki',
                'Kas',
                'Ara',
            ],
            dayNames: [
                'Pazar',
                'Pazartesi',
                'Salı',
                'Çarşamba',
                'Perşembe',
                'Cuma',
                'Cumartesi',
            ],
            dayNamesShort: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
            dayNamesMin: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
            weekHeader: 'Hf',
            today: 'Bugün',
            weak: 'Zayıf',
            medium: 'Orta',
            strong: 'Güçlü',
            /* passwordPrompt: 'Şire Giriniz.',*/
            emptyMessage: 'Sonuç Bulunamadı!',
            emptyFilterMessage: 'Sonuç Bulunamadı!',
        });
    }
}
