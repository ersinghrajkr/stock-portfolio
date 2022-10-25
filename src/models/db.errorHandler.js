module.exports = {
    saveToDbErrorHandler 
}


/**
 *  In Mongoose, middleware is broken up into 4 types based on the value of this and res:
    Document middleware
    Model middleware
    Aggregation middleware
    Query middleware
    You register middleware using the Schema#pre() and Schema#post() functions. Mongoose
    executes pre() middleware before the wrapped function, and post() middleware after the
    wrapped function.
    Error handling middleware is a special type of post() middleware that only executes if an error
    occurs. Error handling middleware is useful for logging errors and making error messages more
    human readable.
 * @param {*} err 
 * @param {*} doc 
 * @param {*} next 
 * @returns 
 */

function saveToDbErrorHandler(err, doc, next) {
    console.log('Saved', this.username);
    console.log('Error:', err.message);
    if (err.code === 11000) 
        return next(Error('Duplicate _id'));
    next(err);
}