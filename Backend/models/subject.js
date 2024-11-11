const mongoose=require('mongoose');

const Subject = mongoose.model("Subject", {
    semester: {
        type: Number,  
        required: true
    },
    subjects: {
        type: [String], 
        required: true
    }
});

module.exports=Subject;