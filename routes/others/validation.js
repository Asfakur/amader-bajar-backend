const mongoose = require('mongoose');

function isValidateId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

exports.validateId = validateId;

