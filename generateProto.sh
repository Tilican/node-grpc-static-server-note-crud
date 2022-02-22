rm -rf src/proto
mkdir src/proto
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:src/ --grpc_out=grpc_js:src/ proto/notes.proto