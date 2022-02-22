const client = require('./client');
const messages = require('../proto/notes_pb');

function main() {
    let empty = new messages.Empty();

    const call = client.listStream(empty);

    call.on('data', (response) => {
        console.log(response.toObject());
    });

    call.on('end', () => {
        console.log('successfully fetch List notes');
    });
}

main();