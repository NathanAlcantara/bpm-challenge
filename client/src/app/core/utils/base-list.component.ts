import { BaseComponent } from './base.component';

export interface ListParams {
  search?: string;
  page: number;
  size: number;
  sort: number;
  order: string;
}

export interface GridColumns {
  field: string;
  label: string;
  sorted?: boolean;
  converter?: (any) => void;
}

export interface Action {
  label: string;
  action: (any?) => void;
}

export class BaseListComponent extends BaseComponent {

  gridColumns: GridColumns[];
  gridData: any[];
  action: Action;
  isLoading: boolean;
  hasError: boolean;

  columnsLabel: string[] = [];

  constructor() {
    super();
  }
}
