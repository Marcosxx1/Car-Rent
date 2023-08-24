export interface ISpecification {
  id?: string;
  name: string;
  description: string;
  created_at: Date;
}

export class Specification {
  private props: ISpecification;

  get data() {
    return this.props;
  }

}


