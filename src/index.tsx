import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store/index";
import "./index.css";
import App from "./App";
import { LP_UNISWAP_URI, NETWORK, SUBGRAPH_URI, WALLET_CONNECT_RPC } from "./settings";
import HttpsRedirect from "react-https-redirect";
import { LP_UNISWAP_V3_HAT_ETH_APOLLO_CONTEXT, Endpoint } from "./constants/constants";
import { Config, DAppProvider } from "@usedapp/core";
import { getChainById } from "@usedapp/core/dist/esm/src/helpers";

const main_subgraph = new HttpLink({
  uri: SUBGRAPH_URI
});

const lp_uniswap_subgraph = new HttpLink({
  uri: LP_UNISWAP_URI
});

const apolloLink = ApolloLink.split(operation => operation.getContext().clientName === LP_UNISWAP_V3_HAT_ETH_APOLLO_CONTEXT, lp_uniswap_subgraph, main_subgraph);

let config: Config = {
  networks: [getChainById(NETWORK)!],
  readOnlyChainId: NETWORK,
  readOnlyUrls: {
    [NETWORK]: WALLET_CONNECT_RPC || Endpoint[NETWORK]
  },
  autoConnect: true
}
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: apolloLink
})

ReactDOM.render(
  <DAppProvider config={config}>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <HttpsRedirect>
          <Router>
            <App />
          </Router>
        </HttpsRedirect>
      </ApolloProvider>
    </Provider>
  </DAppProvider>,
  document.getElementById("root")
);
