
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository, UserModel } from 'src/common/interfaces/user-repository.interface';
import { UserDocument, UserEntity } from '../schemas/user.schema';

@Injectable()
export class MongoUserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(email: string, password: string, role: string = 'regular'): Promise<UserModel> {
    const existing = await this.userModel.findOne({ email }).exec();
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const newUser = new this.userModel({ email, password, role });
    const saved = await newUser.save();

    return {
      _id: saved._id.toString(),
      email: saved.email,
      password: saved.password,
      role: saved.role,
    };
  }

  async findUserByEmail(email: string): Promise<UserModel | null> {
    const userDoc = await this.userModel.findOne({ email }).exec();
    if (!userDoc) return null;
    return {
      _id: userDoc._id.toString(),
      email: userDoc.email,
      password: userDoc.password,
      role: userDoc.role,
    };
  }

  async findUserById(id: string): Promise<UserModel | null> {
    const userDoc = await this.userModel.findById(id).exec();
    if (!userDoc) return null;
    return {
      _id: userDoc._id.toString(),
      email: userDoc.email,
      password: userDoc.password,
      role: userDoc.role,
    };
  }
}
