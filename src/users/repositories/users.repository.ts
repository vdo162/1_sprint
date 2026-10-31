import { User } from '../domain/user';
import { ObjectId, WithId } from 'mongodb';
import { db } from '../../db';

export const usersRepository = {
  async create(newUser: User): Promise<string> {
    const insertResult =
      await db.collections.usersCollection.insertOne(newUser);

    return insertResult.insertedId.toString();
  },

  async delete(id: string): Promise<boolean> {
    const deleteResult = await db.collections.usersCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return deleteResult.deletedCount > 0;
  },

  async findByLoginOrEmail(loginOrEmail: string): Promise<WithId<User> | null> {
    return db.collections.usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
  },
};
