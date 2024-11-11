const mongoose=require('mongoose');

const PYQ = mongoose.model("PYQ", {

    subject: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },


})

module.exports=PYQ;