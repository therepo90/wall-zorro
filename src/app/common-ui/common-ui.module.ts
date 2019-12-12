import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const modules = [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
]

@NgModule({
    declarations: [],
    imports: modules,
    exports: modules,
})
export class CommonUiModule {}
