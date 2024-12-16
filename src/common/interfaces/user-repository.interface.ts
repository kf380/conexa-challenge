export interface UserModel {
    _id?: string;
    email: string;
    password: string;
    role: string;
  }
  
  export interface IUserRepository {
    createUser(email: string, password: string, role?: string): Promise<UserModel>;
    findUserByEmail(email: string): Promise<UserModel | null>;
    findUserById(id: string): Promise<UserModel | null>;
  }
  