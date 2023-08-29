import { Request, Response, NextFunction } from 'express';
import { UserRepositoryAdapter } from '../../../out/type-orm/postgres-adapter/user-repository-adapter';

export async function EnsureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request.body;

  const usersRepository = new UserRepositoryAdapter()
  const user = await usersRepository.findById(user_id)

  if (!user.is_admin) {
    return response.status(401).json({
      error: 'Unauthorized',
    })
  }
  return next()
};
