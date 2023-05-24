import { prismaClient } from "../../client/db";
import { GraphqlContext } from "../../interfaces";

interface CreateTweetPayload {
    content : string,
    imageURL? : string
}

const mutations = {
    createTweet: async (
      parent: any,
      { payload }: { payload: CreateTweetPayload },
      ctx: GraphqlContext
    ) => {
      if (!ctx.user) throw new Error("You are not authenticated");
      return 'tweet';
    },
    
  };
  export const resolvers = { mutations};