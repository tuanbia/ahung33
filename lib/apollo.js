// Add Apollo Client to this file
import {ApolloClient,InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
    uri: `https://bestpetlove.net/graphql`,
    cache: new InMemoryCache(),
})