
var express = require("express");
var bodyParser = require("body-parser");
var browserify = require("browserify");

var graphql = require("graphql");

var graphqlExpress = require("apollo-server-express").graphqlExpress;
var graphiqlExpress = require ("apollo-server-express").graphiqlExpress

var myGraphQLSchema = new graphql.GraphQLSchema({

    query: new graphql.GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            hello: {
                type: graphql.GraphQLString,
                resolve: function(){
                    return "world";
                }
            }
        }
    })

});

var app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled


app.get("/client.js", function(req, res){
    var b = browserify();
    b.add(__dirname + "/client.js");
    b.bundle().pipe(res);
});
app.use(function(req, res){
    res.end("<script src='/client.js'></script>");
});

var port = 3000;
app.listen(port, function(err){
    if(err) throw err;
    console.log("http://localhost:" + port);
});
