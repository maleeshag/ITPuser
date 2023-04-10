//organization data model
const mongoose = require('mongoose')

const orgSchema = new mongoose.Schema(
{
    orgname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model('Organization', orgSchema)