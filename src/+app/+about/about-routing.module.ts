import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AboutComponent} from './about.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'about', component: AboutComponent,
                data: {
                    keywords: 'keywords_about',
                    description: 'description_about',
                    title: 'site_title_about'
                }
            }
        ])
    ]
})
export class AboutRoutingModule {
}
