export interface ICategory {
  id?: string;
  name: string;
  description: string;
  created_at?: Date;
}
export class Category {
  private props: ICategory;

  get data() {
    return this.props;
  }
}