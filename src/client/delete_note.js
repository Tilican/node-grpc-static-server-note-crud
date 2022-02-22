const client = require('./client')
const messages = require('../proto/notes_pb');

const noteId = new messages.NoteRequestId()
noteId.setId('1')

client.delete(noteId, (error, _) => {
    if (!error) {
        console.log('Note Has been successfully deleted')
    } else {
        console.error(error)
    }
})
            