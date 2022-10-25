const {Schema, model} = require("./dbconnection") // import Schema & model
const dbMiddleware = require('./db.errorHandler')
const userSchema = new Schema({
    username: { type: String, unique: true, required: true, index: { unique: true } },
    password: { type: String, required: true, select: false }
}, { timestamps: true })


userSchema.pre('save', function preFun() {
    console.log('Saving', this.username);
})
/**
 * The mongoose.model() function takes the model's name and schema as parameters, and returns
 * a class. That class is con􀂦gured to cast, validate, and track changes on the paths de􀂦ned in the
 * schema. Schemas have numerous features beyond just type checking
 */
const User = model('User', userSchema);
userSchema.post('save', dbMiddleware.saveToDbErrorHandler);

module.exports = User