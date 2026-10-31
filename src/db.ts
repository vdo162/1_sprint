import { Collection, Db, MongoClient } from 'mongodb';
import { SETTINGS } from './settings/config';
import { Blog } from './blogs/domain/blog';
import { Post } from './posts/domain/post';
import { User } from './users/domain/user';

const jestAdapter = {
  runtimeAdapters: {
    os: require('os'), // Принудительно передаем модуль OS, который Jest не мог собрать автоматически
  },
};

enum COLLECTION_NAME {
  USER = 'users',
  BLOG = 'blogs',
  POST = 'posts',
}

type Collections = {
  usersCollection: Collection<User>;
  blogsCollection: Collection<Blog>;
  postsCollection: Collection<Post>;
};

export const db = {
  client: null as unknown as MongoClient,

  clientDb: null as unknown as Db,

  collections: {} as Collections,

  async run(url: string) {
    this.client = new MongoClient(url, jestAdapter);
    this.clientDb = this.client.db(SETTINGS.DB_NAME);
    this.initCollections();

    try {
      await this.client.connect();
      await this.clientDb.command({ ping: 1 });
      console.log('Connected to the database');
    } catch (e) {
      await this.client.close();
      throw new Error(`Database not connected: ${e}`);
    }
  },

  async stop() {
    if (!this.client) {
      throw new Error(`No active client`);
    }
    await this.client.close();
    console.log('Connection successful closed');
  },

  async drop() {
    try {
      const collectionsList = Object.values(this.collections);

      await Promise.all(
        collectionsList.map((collection) => collection.deleteMany({})),
      );
    } catch (e) {
      await this.stop();
      console.error('Error in drop db:', e);
    }
  },

  initCollections() {
    this.collections = {
      usersCollection: this.clientDb.collection<User>(COLLECTION_NAME.USER),
      blogsCollection: this.clientDb.collection<Blog>(COLLECTION_NAME.BLOG),
      postsCollection: this.clientDb.collection<Post>(COLLECTION_NAME.POST),
    };
  },
};
