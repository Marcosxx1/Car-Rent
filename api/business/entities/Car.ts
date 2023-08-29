
export interface ICar {
  id?: string;
  name: string;
  description: string;
  daily_rate: number;
  available?: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  created_at?: Date;
}

export class Car {
  private props: ICar;

  get data() {
    return this.props;
  }
}