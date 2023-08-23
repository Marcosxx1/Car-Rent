import { Column, Entity, PrimaryColumn } from "typeorm";

import { v4 as uuidV4 } from "uuid";

@Entity("cars")
export class CarModel {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;


  @Column()
  description: string;

  @Column()
  daily_rate: number;


  @Column({ default: true })
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;


  @Column()
  brand: string;

  @Column({ nullable: true, default: null })
  category_id: string;

  @Column({ default: "now()" })
  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

