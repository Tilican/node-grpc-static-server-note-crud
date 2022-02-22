const grpc = require("@grpc/grpc-js");
const services = require("../proto/notes_grpc_pb");

module.exports = new services.NoteServiceClient('localhost:50051', grpc.credentials.createInsecure());