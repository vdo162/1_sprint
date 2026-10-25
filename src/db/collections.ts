import { Collection, Db } from 'mongodb';
import { Blogger } from '../bloggers/domain/blogger';
import { Post } from '../posts/domain/post';

export const BLOGGER_COLLECTION_NAME = 'bloggers';
export const POST_COLLECTION_NAME = 'posts';

// Коллекции инициализируются один раз в initCollections() после подключения к БД.
// До этого момента они undefined, поэтому обращаться к ним можно только после runDB().
export let bloggerCollection: Collection<Blogger>;
export let postCollection: Collection<Post>;

// Создаём объекты коллекций из подключённой базы.
export function initCollections(db: Db): void {
  bloggerCollection = db.collection<Blogger>(BLOGGER_COLLECTION_NAME);
  postCollection = db.collection<Post>(POST_COLLECTION_NAME);
}

// Список всех коллекций считаем в МОМЕНТ вызова (уже после initCollections),
// а не на этапе загрузки модуля — иначе сюда попали бы ещё не инициализированные (undefined) коллекции.
export function getAllCollections(): Collection<any>[] {
  return [bloggerCollection, postCollection];
}
