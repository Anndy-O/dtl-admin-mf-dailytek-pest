import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/core/interface/Usuarios/cliente.interface';
import { ClienteResponse } from 'src/app/core/interface/Usuarios/responses/cliente-response.interface';
import { LocalStorageDataService } from 'src/app/core/service/comunes-service/local-storage-data.service';
import { UsuarioService } from 'src/app/core/service/user-service/user.service';
import { Empleado } from '../../../../../core/interface/Comunes/empleado.interface';
import { Oficina } from 'src/app/core/interface/Comunes/oficina.interface';

@Component({
  selector: 'dtl-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clienteForm: FormGroup;
  vendedores: Empleado[] = [];
  empleados: Empleado[] = [];
  isModalOpen: boolean = false;
  isEmpleado: boolean = false;
  modalData: any = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private localStorageDataService: LocalStorageDataService
  ) {
    this.clienteForm = this.fb.group({
      id: [0],
      cliente: ['', Validators.required],
      codigoCliente: ['', Validators.required],
      status: ['', Validators.required],
      tipoCliente: ['', Validators.required],
      vendedor: ['', Validators.required],
      referido: [''],
      direccion: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contactoAdmin: ['', Validators.required],
      direccionComercial: ['', Validators.required],
      fecha: ['', Validators.required],
      llamadaSeguimientoFecha: ['', Validators.required],
      llamadaSeguimientoHora: ['', Validators.required],
      observaciones: [''],
      empresa: [''],
      oficina: [''],
    });
  }

  ngOnInit() {
    this.cargarVendedores();
    this.cargarEmpleados();
  }

  cargarVendedores() {
    this.usuarioService.obtenerVendedores().subscribe({
      next: (vendedores: Empleado[]) => {
        this.vendedores = vendedores;
        this.modalData = this.vendedores;
      },
      error: (err: any) => {
        console.error('Error al obtener vendedores:', err);
      }
    });
  }

  cargarEmpleados() {
    this.usuarioService.obtenerEmpleados().subscribe({
      next: (data: Empleado[]) => {
        this.empleados = data;
        this.modalData = this.empleados;
      },
      error: (err: any) => {
        console.error('Error al obtener los empleados:', err);
      }
    });
  }

  crearCliente() {
    if (this.clienteForm.valid) {
      const cliente: Cliente = this.clienteForm.value;
      cliente.id = 0;
      cliente.vendedor = this.seleccionarVendedor();
      cliente.empresa = this.localStorageDataService.getEmpresaId();
      cliente.oficina = { id: this.localStorageDataService.getOficinaId(), empresa: cliente.empresa } as Oficina;
      console.log('id oficina: :', cliente.oficina.id);
      cliente.oficina.empresa = this.localStorageDataService.getEmpresaId();
      this.usuarioService.crearCliente(cliente).subscribe({
        next: (nuevoCliente: ClienteResponse) => {
          console.log('Cliente creado con éxito:', nuevoCliente);
          this.clienteForm.reset();
        },
        error: (err: any) => {
          console.error('Error al crear cliente:', err);
        }
      });
    } else {
      console.error('Formulario no válido');
    }
  }

  seleccionarVendedor(): Empleado {
    const codigoVendedor = this.clienteForm.get('vendedor')?.value;
    const vendedor = this.vendedores.find(v => v.codigoEmpleado === codigoVendedor);
    if (!vendedor) {
      throw new Error('El código del vendedor no es válido o no existe.');
    }
    return vendedor;
  }

  openModal(isEmpleado: boolean) {
    this.isEmpleado = isEmpleado;
    this.modalData = this.isEmpleado ? this.empleados : this.vendedores;
    this.isModalOpen = true;
  }

  handleModalClose() {
    this.isModalOpen = false;
  }

  handleSelectedCode(codigo: string) {
    if (!this.isEmpleado) {
      this.clienteForm.patchValue({
      vendedor: codigo
      });
    } else {
      this.clienteForm.patchValue({
      referido: codigo
      });
    }
    this.isModalOpen = false;
  }
}
