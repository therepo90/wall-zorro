import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/containers/login/login.component';
import { WallComponent } from './wall/containers/wall/wall.component';
import { PostDetailsComponent } from './wall/containers/post-details/post-details.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthGuardService } from './auth/services/auth-guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    {
        path: 'wall',
        component: WallComponent,
        pathMatch: 'full',
        canActivate: [AuthGuardService],
    },

    {
        path: 'wall/:postId/details',
        component: PostDetailsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuardService],
    },
    { path: '404', component: PageNotFoundComponent, pathMatch: 'full' },
    { path: '', redirectTo: '/wall', pathMatch: 'full' },
    { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule {}
