import type { Tweet } from './api/index.js';
import type { TweetComponents } from './components.js';
type Props = {
    tweet: Tweet;
    components?: Omit<TweetComponents, 'TweetNotFound'>;
};
export declare const EmbeddedTweet: ({ tweet, components }: Props) => JSX.Element;
export {};
