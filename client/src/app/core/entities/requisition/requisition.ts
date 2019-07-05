import { User } from '../user/user';
import { RequisitionStatus } from '~core/enums';
import { UserService } from '../user/user.service';

export interface RequisitionDto {
  requester: User;
  abdicator: User;
  description?: string;
  price?: number;
  status: RequisitionStatus;
}

export class Requisition {
  id: string;
  requester: string;
  abdicator: string;
  description?: string;
  price?: number;
  status: RequisitionStatus;
}
