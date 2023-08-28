import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { v4 as uuidV4 } from "uuid";
import { CategoryModel } from "./category-model";

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

  @ManyToOne(() => CategoryModel)
  @JoinColumn({ name: "category_id" })
  category_id: string;

  @Column({ default: "now()" })
  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

