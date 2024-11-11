const PYQ = require('../models/pyq')

exports.allPyqs= async (req, res) => {
    let pyqs = await PYQ.find({});
    res.send(pyqs)
}

exports.addPyq = async (req, res) => {
    const newPyq = new PYQ({
        subject: req.body.subject,
        unit: req.body.unit,
        url: req.body.url,
        semester: req.body.semester,
    });
    console.log(newPyq)
    await newPyq.save();
    res.json({
        success: true,
        name: req.body.subject
    })
}

exports.deletePyq = async (req, res) => {
    await PYQ.findOneAndDelete({ _id: req.body._id })
    res.json({
        success: true
    })
}

exports.filterPyqs = async (req, res) => {
    const { semester, subject } = req.params;
    try {
        const pyqs = await PYQ.find({ semester, subject });
        res.json(pyqs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error: error.message });
    }
}