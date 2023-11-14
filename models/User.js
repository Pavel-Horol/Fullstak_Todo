import { Schema, model, Types } from "mongoose";

const schema = new Schema({
    email: {type: String, require: true, uniq: true},
    password: {type: String, require: true},
    todos: [{type: Types.ObjectId, ref: 'Todos'}]
})

export default model('User', schema)