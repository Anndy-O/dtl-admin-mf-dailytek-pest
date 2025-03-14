import { DashTableComponent } from './components/dash-table/dash-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalEmpleadosComponent } from './components/modales/modal-empleados/modal-empleados.component';
import { FormsModule } from '@angular/forms';
import { MetricasComponent } from './components/metricas/metricas.component';

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    DashTableComponent,
    ModalEmpleadosComponent,
    MetricasComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    DashTableComponent,
    ModalEmpleadosComponent,
    MetricasComponent
  ],
})
export class SharedModule { }
