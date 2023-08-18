import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { AppError } from "../../../../shared/errors/AppError";


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

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) { }     

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect e-mail or password", 400);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Incorrect e-mail or password");
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

export { AuthenticateUserUseCase };
