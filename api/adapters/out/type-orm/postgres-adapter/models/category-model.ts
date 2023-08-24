import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("category")
export class CategoryModel {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  @Column({ default: "now()" })
  created_at?: Date;


  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}