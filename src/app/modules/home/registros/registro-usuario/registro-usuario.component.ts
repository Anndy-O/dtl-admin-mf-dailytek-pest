import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/core/service/user-service/user.service';
import { Usuario } from 'src/app/core/interface/Usuarios/usuario.interface';
import { Empleado } from 'src/app/core/interface/Comunes/empleado.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioRequest } from 'src/app/core/interface/Usuarios/requests/usuario.request.interface';
import { LocalStorageDataService } from 'src/app/core/service/comunes-service/local-storage-data.service';

@Component({
  selector: 'btl-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  empleados: Empleado[] = [];
  usuarioForm: FormGroup;
  isModalOpen: boolean = false;
  modalData: any = [];

  constructor(
    private usuarioService: UsuarioService,
    private localStorageDataService: LocalStorageDataService,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      codigoEmpleado: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      cargo: ['', Validators.required],
      activo: ['A'],
      empresa: [''],
      oficina: [''],
    });
  }

  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerEmpleados();
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
      },
      error: (err: any) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  obtenerEmpleados() {
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

  crearUsuario() {
    if (this.usuarioForm.valid) {
      const usuarioRequest: UsuarioRequest = this.usuarioForm.value;
      usuarioRequest.activo = 'A';
      usuarioRequest.empresa = this.localStorageDataService.getEmpresaId();
      usuarioRequest.oficina = this.localStorageDataService.getOficinaId();
      this.usuarioService.crearUsuario(usuarioRequest).subscribe({
        next: (nuevoUsuario: Usuario) => {
          console.log('Usuario creado con éxito:', nuevoUsuario);
          this.usuarios.push(nuevoUsuario);
          this.usuarioForm.reset();
        },
        error: (err: any) => {
          console.error('Error al crear usuario:', err);
        }
      });
    } else {
      console.error('Formulario no válido');
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  handleModalClose() {
    this.isModalOpen = false;
  }

  handleSelectedCode(codigo: string) {
    this.usuarioForm.patchValue({
      codigoEmpleado: codigo
    });
    this.isModalOpen = false;
  }
}
