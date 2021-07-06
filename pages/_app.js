import "../styles/globals.css";
import { Provider } from "next-auth/client";
import {
  ApolloProvider,
  ApolloClient,
  gql,
  InMemoryCache,
} from "@apollo/client";

function MyApp({ Component, pageProps }) {
  const { GRAPHQL_SERVER } = process.env;

  const client = new ApolloClient({
    uri: GRAPHQL_SERVER,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
