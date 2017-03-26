import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {HomeComponent} from './home.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'home', component: HomeComponent,
                data: {
                    keywords: 'keywords_home',
                    description: 'description_home',
                    title: 'site_title_home'
                }
            }
        ])
    ]
})
export class HomeRoutingModule {
}
