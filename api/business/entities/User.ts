
export interface IUser {
  id?: string;
  name: string;
  email: string;
  driver_license: string;
  password: string;
  isAdmin: boolean;
  avatar?: string;
  created_at?: Date;
}

export class User {
  private props: IUser;

  get data() {
    return this.props;
  }

}

