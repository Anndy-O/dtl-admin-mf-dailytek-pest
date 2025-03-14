import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeRoutingModule } from './home.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { RegistroUsuarioComponent } from './registros/registro-usuario/registro-usuario.component';
import { RegistroEmpleadoComponent } from './registros/registro-empleado/registro-empleado.component';
import { RegistrarClientesComponent } from './registros/registrar-clientes/registrar-clientes.component';
import { ClientesComponent } from './registros/components/clientes/clientes.component';
import { ClientesTemporalesComponent } from './registros/components/clientes-temporales/clientes-temporales.component';
import { TablaClientesComponent } from './registros/components/tabla-clientes/tabla-clientes.component';
import { TablaClientesTemporalesComponent } from './registros/components/tabla-clientes-temporales/tabla-clientes-temporales.component';



@NgModule({
  declarations: [
    LoginComponent,
    DashBoardComponent,
    RegistroUsuarioComponent,
    RegistroEmpleadoComponent,
    RegistrarClientesComponent,
    ClientesComponent,
    ClientesTemporalesComponent,
    TablaClientesComponent,
    TablaClientesTemporalesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class HomeModule { }
