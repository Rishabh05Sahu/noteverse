const Note = require('../models/note')

exports.allNotes = async (req, res) => {
    let notes = await Note.find({});
    res.send(notes)
}

exports.addNote = async (req, res) => {
    const newNote = new Note({
        subject: req.body.subject,
        unit: req.body.unit,
        url: req.body.url,
        semester: req.body.semester,
    });
    console.log(newNote)
    await newNote.save();
    res.json({
        success: true,
        name: req.body.subject
    })
}

exports.deleteNote = async (req, res) => {
    await Note.findOneAndDelete({ _id: req.body._id })
    res.json({
        success: true
    })
}

exports.filterNotes = async (req, res) => {
    const { semester, subject } = req.params;
    try {
        const notes = await Note.find({ semester, subject });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error: error.message });
    }
}