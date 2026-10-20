import { WithId } from 'mongodb';
import { Blogger } from '../../types/blogger';
import { BloggerViewModel } from '../../types/blogger-view-model';

export function mapToBloggerViewModel(
  blogger: WithId<Blogger>,
): BloggerViewModel {
  return {
    id: blogger._id.toString(),
    name: blogger.name,
    description: blogger.description,
    websiteUrl: blogger.websiteUrl,
    isMembership: blogger.isMembership,
    createdAt: blogger.createdAt,
  };
}
