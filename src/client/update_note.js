const client = require('./client')
const messages = require("../proto/notes_pb");

const updateNote = new messages.Note()
updateNote.setId("1")
updateNote.setTitle("Hello")
updateNote.setContent("World update")


client.update(updateNote, (error, note) => {
    if (!error) {
        console.log('Note has been updated successfully', note.toObject())
    } else {
        console.error(error)
    }
})