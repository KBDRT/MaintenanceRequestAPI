import bcrypt from 'bcrypt';
import { IUserRepository } from '../repositories/abstractions/user-repository.interface';
import { UserRepository } from '../repositories/implementations/db-user.repository';
import { User } from '../domains/entities/user.entity';
import { randomUUID } from 'node:crypto';
import { UserRole } from '../domains/enums/user-role.enum';
import { RegisterUserRequest } from '../dto/auth/register-user-request.dto';
import { RegisterUserResult } from '../dto/auth/register-user-result.dto';
import jwt, { JwtPayload } from "jsonwebtoken";
import authConfig from '../config/auth.config';
import { LoginUserRequest } from '../dto/auth/login-user-request.dto';
import { ConflictError } from '../errors/conflicts.error';
import { AuthenticationError } from '../errors/authentication.error';
import { GetTokensResult } from '../dto/auth/get-tokens-result.dto';
import { TokenPayload } from '../dto/types/tokens-payload.type';
import { AccessError } from '../errors/accesss.error';


const SALT_ROUNDS = 10;

const repository: IUserRepository = new UserRepository();

export const registerUser = async(request: RegisterUserRequest): Promise<RegisterUserResult> => {

  const exist = await repository.getByLogin(request.login);
  if (exist) {
    throw new ConflictError("Пользователь с таким логином уже существует!", [{field: "login", message: "Неуникальный логин пользователя"}]);
  }

  const hashedPassword = await bcrypt.hash(request.password, SALT_ROUNDS);

  const newUser = new User();
  newUser.id = randomUUID();
  newUser.login = request.login;
  newUser.password = hashedPassword;
  newUser.role = UserRole.viewer;

  await repository.create(newUser);

  const result = new RegisterUserResult();
  result.id = newUser.id;
  result.role = newUser.role;
  result.login = newUser.login;

  return result;
}

export const loginUser = async(request: LoginUserRequest): Promise<GetTokensResult> => {
  const user = await repository.getByLogin(request.login);
  if (!user) {
    throw new AuthenticationError("Неверные данные для входа");
  }

  const success = await bcrypt.compare(request.password, user.password);
  if (!success) {
    throw new AuthenticationError("Неверные данные для входа");
  }

  return generateTokens({...user});
}


export const refreshToken = async(token: string): Promise<GetTokensResult> => { 
  try {
    const decoded = jwt.verify(token, authConfig.secretKey) as TokenPayload;

    const user = await repository.getByLogin(decoded.login as string);
    if (!user) {
      throw new AuthenticationError("Неверные данные");
    }

    return generateTokens({...user});
  }
  catch {
    throw new AccessError("Невалидный токен");
  }
}


export const generateTokens = async(payload: TokenPayload): Promise<GetTokensResult> => {  
  const result = new GetTokensResult();

  result.accessToken = jwt.sign(
    {
      userId: payload.id,
      role: payload.role,
      login: payload.login,
      technicianId: payload.technicianId
    }, 
    authConfig.secretKey, 
    { expiresIn: "15m" }
  );

  result.refreshToken = jwt.sign(
    {
      userId: payload.id,
      login: payload.login,
    }, 
    authConfig.secretKey, 
    { expiresIn: "7d" }
  );

  return result;
}