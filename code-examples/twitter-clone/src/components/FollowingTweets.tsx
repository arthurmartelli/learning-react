import React from "react";
import { api } from "~/utils/api";
import InfiniteTweetList from "./InfiniteTweetList";

export default function FollowingTweets() {
  const tweets = api.tweets.infiniteFeed.useInfiniteQuery(
    { onlyFollowing: true },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage || false} // tweets.hasNextPage can be undefined
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}
