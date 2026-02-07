import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GovernmentComponent } from './pages/government/government.component';
import { CorporateComponent } from './pages/corporate/corporate.component';
import { AtlBtlComponent } from './pages/atl-btl/atl-btl.component';
import { StaffingComponent } from './pages/staffing/staffing.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'government', component: GovernmentComponent },
    { path: 'corporate', component: CorporateComponent },
    { path: 'atl-btl', component: AtlBtlComponent },
    { path: 'staffing', component: StaffingComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: '**', redirectTo: '' }
];
