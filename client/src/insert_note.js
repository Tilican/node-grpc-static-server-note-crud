const client = require('./client')
const messages = require('../proto/notes_pb');

const newNote = new messages.Note()
newNote.setTitle("New Note")
newNote.setContent("New Note content")

client.insert(newNote, (error, note) => {
    if (!error) {
        console.log('New Note created successfully', note.toObject())
    } else {
        console.error(error)
    }
})
