var HttpLink = require("apollo-link-http").HttpLink;
var ApolloClient = require("apollo-client").ApolloClient;
var InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;

var gql = require("graphql-tag");


var client = new ApolloClient({
    link: new HttpLink({uri: "/graphql"}),
    cache: new InMemoryCache(),
});


client.query({
    query: gql("{ hello }"),
})
    .catch(function(err){
        console.error(err);
    })
    .then(function(data){
        console.log(data);
    })
    ;
