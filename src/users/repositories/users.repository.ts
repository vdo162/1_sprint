import { EmailConfirmation, User } from '../domain/user';
import { ObjectId, WithId } from 'mongodb';
import { db } from '../../db';

export const usersRepository = {
  async findById(id: string): Promise<WithId<User> | null> {
    return await db.collections.usersCollection.findOne({
      _id: new ObjectId(id),
    });
  },

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

  async updateConfirmationStatus(
    id: ObjectId,
    isConfirmed: boolean,
  ): Promise<boolean> {
    const updateResult = await db.collections.usersCollection.updateOne(
      { _id: id },
      { $set: { 'emailConfirmation.isConfirmed': isConfirmed } },
    );

    return updateResult.matchedCount > 0;
  },

  async updateConfirmation(
    id: ObjectId,
    emailConfirmation: EmailConfirmation,
  ): Promise<boolean> {
    const updateResult = await db.collections.usersCollection.updateOne(
      { _id: id },
      { $set: { emailConfirmation } },
    );

    return updateResult.matchedCount > 0;
  },

  async findByLoginOrEmail(loginOrEmail: string): Promise<WithId<User> | null> {
    return db.collections.usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
  },

  async findByLogin(login: string): Promise<WithId<User> | null> {
    return db.collections.usersCollection.findOne({ login });
  },

  async findByEmail(email: string): Promise<WithId<User> | null> {
    return db.collections.usersCollection.findOne({ email });
  },

  async findByConfirmationCode(
    confirmationCode: string,
  ): Promise<WithId<User> | null> {
    return db.collections.usersCollection.findOne({
      'emailConfirmation.confirmationCode': confirmationCode,
    });
  },
};
