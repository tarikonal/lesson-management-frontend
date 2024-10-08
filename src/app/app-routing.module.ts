import { NgModule } from '@angular/core';
import {
    ExtraOptions,
    provideRouter,
    RouterModule,
    Routes,
    withComponentInputBinding,
} from '@angular/router';
import { AppLayoutComponent } from './shared/layout/components/layout/app.layout.component';
import { authGuard } from './core/services/auth.guard';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled',
};

const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        component: AppLayoutComponent,
        children: [
            // {
            //     path: '',
            //     data: { breadcrumb: 'Strateji Yönetim' },
            //     loadChildren: () =>
            //         import('./../app/features/dashboard/dashboard.module').then(
            //             (m) => m.DashboardModule
            //         ),
            // },     
            {
                path: '',
                data: { breadcrumb: 'Lesson Management' },
                loadChildren: () =>
                    import('./../app/features/dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },          
            {
                path: 'uikit',
                data: { breadcrumb: 'UI Kit' },
                loadChildren: () =>
                    import('./demo/components/uikit/uikit.module').then(
                        (m) => m.UIkitModule
                    ),
            },
            {
                path: 'utilities',
                data: { breadcrumb: 'Utilities' },
                loadChildren: () =>
                    import('./demo/components/utilities/utilities.module').then(
                        (m) => m.UtilitiesModule
                    ),
            },
            {
                path: 'pages',
                data: { breadcrumb: 'Pages' },
                loadChildren: () =>
                    import('./demo/components/pages/pages.module').then(
                        (m) => m.PagesModule
                    ),
            },
            {
                path: 'profile',
                data: { breadcrumb: 'User Management' },
                loadChildren: () =>
                    import('./demo/components/profile/profile.module').then(
                        (m) => m.ProfileModule
                    ),
            },
            {
                path: 'documentation',
                data: { breadcrumb: 'Documentation' },
                loadChildren: () =>
                    import(
                        './demo/components/documentation/documentation.module'
                    ).then((m) => m.DocumentationModule),
            },
            {
                path: 'blocks',
                data: { breadcrumb: 'Prime Blocks' },
                loadChildren: () =>
                    import(
                        './demo/components/primeblocks/primeblocks.module'
                    ).then((m) => m.PrimeBlocksModule),
            },
            {
                path: 'ecommerce',
                data: { breadcrumb: 'E-Commerce' },
                loadChildren: () =>
                    import('./demo/components/ecommerce/ecommerce.module').then(
                        (m) => m.EcommerceModule
                    ),
            },
            {
                path: 'apps',
                data: { breadcrumb: 'Apps' },
                loadChildren: () =>
                    import('./demo/components/apps/apps.module').then(
                        (m) => m.AppsModule
                    ),
            },

           
            {
                path: 'lessonManagement',
                data: { breadcrumb: 'Ders Yönetimi' },
                loadChildren: () =>
                    import('./../app/features/lessonManagement/lessonManagement.module').then(
                        (m) => m.LessonManagementModule
                    ),
            },
        ],
    },

    {
        path: 'notfound',
        loadChildren: () =>
            import('./demo/components/notfound/notfound.module').then(
                (m) => m.NotfoundModule
            ),
    },
    {
        path: 'notfound2',
        loadChildren: () =>
            import('./demo/components/notfound2/notfound2.module').then(
                (m) => m.Notfound2Module
            ),
    },
    {
        path: 'landing',
        loadChildren: () =>
            import('./demo/components/landing/landing.module').then(
                (m) => m.LandingModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule],
    providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}
