import { Usuario } from 'src/app/core/interface/Usuarios/usuario.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../../interface/Comunes/empleado.interface';
import { UsuarioRequest } from '../../interface/Usuarios/requests/usuario.request.interface';
import { Cliente } from '../../interface/Usuarios/cliente.interface';
import { ClienteTemporal } from '../../interface/Usuarios/cliente-temporal.interface';
import { ClienteResponse } from '../../interface/Usuarios/responses/cliente-response.interface';
import { ClienteTemporalResponse } from '../../interface/Usuarios/responses/cliente-temporal-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private readonly baseUrl = '/usuarios/admin-usuarios';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(`${this.baseUrl}/listar-usuarios`, { withCredentials: true });
  }

  obtenerEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.baseUrl}/listar-empleados`, { withCredentials: true });
  }

  crearUsuario(usuarioRequest: UsuarioRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/registrar-usuario`, usuarioRequest, { withCredentials: true });
  }

  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/listar-clientes`, { withCredentials: true });
  }

  obtenerClientesTemporales(): Observable<ClienteTemporal[]> {
    return this.http.get<ClienteTemporal[]>(`${this.baseUrl}/listar-clientes-temporales`, { withCredentials: true });
  }

  crearCliente(cliente: Cliente): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(`${this.baseUrl}/registrar-cliente`, cliente, { withCredentials: true });
  }

  crearClienteTemporal(clienteTemporal: ClienteTemporal): Observable<ClienteTemporalResponse> {
    return this.http.post<ClienteTemporalResponse>(`${this.baseUrl}/registrar-cliente-temporal`, clienteTemporal, { withCredentials: true });
  }

  obtenerVendedores(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.baseUrl}/listar-vendedores`, { withCredentials: true });
  }

}
