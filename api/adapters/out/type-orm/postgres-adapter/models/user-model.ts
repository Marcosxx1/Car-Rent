import { Entity, Column, PrimaryColumn, CreateDateColumn, Index } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity()
class UserModel {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  @Index({ unique: true })
  email: string;

  @Column({ unique: true, nullable: false })
  @Index({ unique: true })
  driver_license: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: 'default_avatar.png' })
  avatar: string;


  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserModel };
