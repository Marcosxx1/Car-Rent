import { v4 as uuidV4 } from "uuid";

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

  constructor(props: ISpecification) {
    this.props = props;
    if (!this.props.id) {
      this.props.id = uuidV4();
    }
  }
}


