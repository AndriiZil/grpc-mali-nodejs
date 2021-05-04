const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');

const PROTO_PATH = path.resolve(__dirname, './helloworld.proto');

const pd = protoLoader.loadSync(PROTO_PATH);
const loaded = grpc.loadPackageDefinition(pd);
const helloProto = loaded.helloworld;

function main () {
    const client = new helloProto.Greeter('localhost:50051', grpc.credentials.createInsecure());
    let user;

    if (process.argv.length >= 3) {
        user = process.argv[2]
    } else {
        user = 'world'
    }

    client.sayHello({ name: user }, function (err, response) {
        console.log('Greeting:', response.message);
    });
}

main();
