import { compare } from "bcrypt";
import { UserPort } from "../ports/user-port";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export class AuthenticateUser {
  constructor(private userAdapter: UserPort) {
    this.userAdapter = userAdapter;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userAdapter.findByEmail(email);

    if (!user) {
      throw ("Incorrect email or password");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw ("Incorrect email or password");
    }

    /* Nunca usar a senha no sign()
  @param informações não criticas, permissões {} 
  @param MD5
  @param {subject: user.id, expiresIn: "string"} */

    const token = sign({}, "9b1e3364a21359c66c7ea29e08735098", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}