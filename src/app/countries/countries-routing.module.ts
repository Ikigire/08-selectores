import { RouterModule, Routes } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'main',
                component: SelectorPageComponent
            },
            {
                path: '**',
                redirectTo: 'main'
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class CountriesRoutingModule { }
