const grpc = require('@grpc/grpc-js')
const { v1: uuidv1 } = require('uuid')

let messages = require('../proto/notes_pb');
let services = require('../proto/notes_grpc_pb');

const notes = [
    { id: '1', title: 'Note 1', content: 'Content 1'},
    { id: '2', title: 'Note 2', content: 'Content 2'}
]

function main() {
    let server = new grpc.Server();

    server.addService(services.NoteServiceService, {
        list: (_, callback) => {
            let reply = new messages.NoteList();

            notes.forEach(({ id, title, content }) => {
                let noteReply = new messages.Note();
                noteReply.setId(id);
                noteReply.setTitle(title);
                noteReply.setContent(content);
                reply.addNotes(noteReply);
            })

            callback(null, reply)
        },
        listStream: (call) => {
            notes.forEach(({ id, title, content }) => {
                let noteReply = new messages.Note();
                noteReply.setId(id);
                noteReply.setTitle(title);
                noteReply.setContent(content);
                call.write(noteReply)
            })
            call.end()
        },
        get: (call, callback) => {
            const params = call.request.toObject();

            let note = notes.find((n) => n.id === params.id)
            if (note) {

                const noteObj = new messages.Note()
                noteObj.setId(note.id)
                noteObj.setTitle(note.title)
                noteObj.setContent(note.content)

                callback(null, noteObj)
            } else {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                })
            }
        },
        insert: (call, callback) => {
            let note = call.request;
            note.setId(uuidv1());

            notes.push(note.toObject())

            callback(null, note)
        },
        update: (call, callback) => {
            const params = call.request.toObject();
            let existingNote = notes.find((n) => n.id === params.id)
            if (existingNote) {
                existingNote.title = params.title
                existingNote.content = params.content

                const noteObj = new messages.Note()
                noteObj.setId(existingNote.id)
                noteObj.setTitle(existingNote.title)
                noteObj.setContent(existingNote.content)

                callback(null, noteObj)
            } else {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                })
            }
        },
        delete: (call, callback) => {
            const params = call.request.toObject();
            let existingNoteIndex = notes.findIndex((n) => n.id === params.id)
            if (existingNoteIndex !== -1) {
                notes.splice(existingNoteIndex, 1)
                callback(null, new messages.Empty())
            } else {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                })
            }
        }
    });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (args) => {
        console.log('Server running at http://127.0.0.1:50051', args)
        server.start();
    });
}

main()