import { UserLevel } from '~core/enums';

export class User {
  id: string;
  name: string;
  username: string;
  password: string;
  level: UserLevel;
};
