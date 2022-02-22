const client = require('./client');
const messages = require('../proto/notes_pb');

function main() {

    let empty = new messages.Empty();

    client.list(empty, (err, response) => {
        if (err) {
            throw err;
        }
        const { notesList } = response.toObject()
        console.log(notesList);
    });
}

main();