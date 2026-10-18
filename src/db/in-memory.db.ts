import { Blogger } from '../bloggers/types/blogger';
import { Post } from '../posts/types/post';

export const db = {
  bloggers: <Blogger[]>[
    {
      id: '1',
      name: 'Tom Rider',
      description: 'Tom Rider cool',
      websiteUrl: 'tom.rider@example.com',
    },
    {
      id: '2',
      name: 'Bob',
      description: 'Off road',
      websiteUrl: 'bob@example.com',
    },
  ],
  posts: <Post[]>[],
};
