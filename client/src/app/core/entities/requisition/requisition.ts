export interface RequisitionDto {
  requester: string;
  description?: string;
  price?: number;
}

export class Requisition {
  id: string;
  requester: string;
  description?: string;
  price?: number;
}
