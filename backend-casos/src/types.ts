export interface Caso {
  id: string;
  nombre: string;
  descripcion?: string;
  estado: string;
  prioridad: 'baja' | 'media' | 'alta';
  responsable?: string | undefined;
}
