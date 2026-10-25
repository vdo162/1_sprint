import { WithId } from 'mongodb';
import { Blogger } from '../../domain/blogger';
import { BloggerDataOutput } from '../output/blogger-data.output';

export function mapToBloggerOutput(
  blogger: WithId<Blogger>,
): BloggerDataOutput {
  return {
    id: blogger._id.toString(),
    name: blogger.name,
    description: blogger.description,
    websiteUrl: blogger.websiteUrl,
    isMembership: blogger.isMembership,
    createdAt: blogger.createdAt,
  };
}
