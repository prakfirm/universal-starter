import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {LazyComponent} from "./lazy.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: LazyComponent,
                data: {
                    keywords: 'keywords_lazy',
                    description: 'description_lazy',
                    title: 'site_title_lazy'
                }
            }
        ])
    ]
})
export class LazyRoutingModule {
}
