const client = require('./client')

const messages = require('../proto/notes_pb');

const noteId = new messages.NoteRequestId()
noteId.setId('1')

client.get(noteId, (error, note) => {
    if (!error) {
        console.log('Note feched successfully', note.toObject())
    } else {
        console.error(error)
    }
})
