import { hash } from "bcrypt";
import { UserPort } from "../ports/user-port";
import { IUser } from "../entities/User";
import { DataValidator } from "../../adapters/in/http/utils/validate-data";
import { AppError } from "../../adapters/in/http/utils/get-error";

class UserCreate {
  private validateData: DataValidator;
  private userAdapter: UserPort;

  constructor(userAdapter: UserPort) { this.userAdapter = userAdapter }

  async execute(user: IUser): Promise<void> {

    const hashedPassword = await hash(user.password, 8);

    const userAlreadyExists = await this.userAdapter.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new AppError("User already exists", ["Email address is already in use"], 400);
    }

    this.validateData = new DataValidator();
    await this.validateData.validateData(user);

    await this.userAdapter.create({
      name: user.name,
      email: user.email,
      driver_license: user.driver_license,
      password: hashedPassword,
      is_admin: false
    });
  }

}

export { UserCreate };
