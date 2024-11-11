const mongoose=require('mongoose');

const Note = mongoose.model("Note", {

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

module.exports=Note;