import jwt, { SignOptions } from 'jsonwebtoken';
import { SETTINGS } from '../../settings/config';

export const jwtService = {
  async createToken(userId: string): Promise<string | null> {
    try {
      return jwt.sign({ userId }, SETTINGS.AC.SECRET, {
        expiresIn: SETTINGS.AC.TIME,
      } as SignOptions);
    } catch (error) {
      console.error('Token sign error', error);
      return null;
    }
  },

  async verifyToken(token: string): Promise<{ userId: string } | null> {
    try {
      return jwt.verify(token, SETTINGS.AC.SECRET) as { userId: string };
    } catch (error) {
      console.error('Token verify error', error);
      return null;
    }
  },
};
