import { ApolloClient, createNetworkInterface } from 'react-apollo';
import BuildUtils from 'utils/buildUtils';
import { addErrorListener } from 'utils/commonUtils';

/*
* Reducer for apollo
*/

export const SERVER_URL = BuildUtils.build.serverURL;

// create network interface
const networkInterface = createNetworkInterface({
  uri: SERVER_URL,
});

// catch GraphQL && Network errors.
const errorsAfterware = {
  applyAfterware: addErrorListener,
};

networkInterface.useAfter([errorsAfterware]);


export const apolloClient = apolloClient || new ApolloClient({
  networkInterface,
});
