var apollo = require("apollo-client");
var gql = require("graphql-tag");


var client = new apollo.ApolloClient({

    networkInterface: apollo.createNetworkInterface({
        uri: "/graphql",
    }),

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
