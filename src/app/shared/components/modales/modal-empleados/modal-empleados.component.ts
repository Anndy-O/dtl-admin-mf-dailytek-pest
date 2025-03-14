import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dtl-modal-empleados',
  templateUrl: './modal-empleados.component.html',
  styleUrls: ['./modal-empleados.component.css']
})
export class ModalEmpleadosComponent implements OnChanges {

  @Input() data: any[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() selectedCode = new EventEmitter<string>();

  codigoFilter: string = '';
  nombreFilter: string = '';

  selectedRow: any | null = null;

  filteredData: any[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.filtrarData(this.data);
  }

  filtrarData(data: any) {
    this.filteredData = [...data];
  }

  applyCodigoFilter() {
    if (this.codigoFilter.trim()) {
      this.filteredData = this.data.filter((item) =>
        item.codigoEmpleado.toString().includes(this.codigoFilter.trim())
      );
    } else {
      this.filteredData = [...this.data];
    }
    this.nombreFilter = '';
  }

  applyNombreFilter() {
    if (this.nombreFilter.trim()) {
      this.filteredData = this.data.filter((item) =>
        item.nombre.toLowerCase().includes(this.nombreFilter.trim().toLowerCase())
      );
    } else {

      this.filteredData = [...this.data];
    }
    this.codigoFilter = '';
  }

  selectRow(row: any) {
    this.selectedRow = row;
    this.selectedCode.emit(row.codigoEmpleado);
  }

  closeModal() {
    this.close.emit();
  }

}
