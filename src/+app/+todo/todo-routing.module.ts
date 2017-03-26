import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {TodoComponent} from './todo.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'todo', component: TodoComponent,

                data: {
                    keywords: 'keywords_todo',
                    description: 'description_todo',
                    title: 'site_title_todo'
                }
            }
        ])
    ]
})
export class TodoRoutingModule {
}
