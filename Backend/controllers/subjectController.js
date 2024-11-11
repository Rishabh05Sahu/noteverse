const Subject = require('../models/subject');

exports.addSubject = async (req, res) => {
    const { semester, subjects } = req.body;

    if (!semester || !Array.isArray(subjects) || subjects.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Semester and an array of subjects are required.'
        });
    }

    try {
        const newSemester = new Subject({
            semester: semester,
            subjects: subjects
        });

        await newSemester.save();

        res.json({
            success: true,
            message: 'Subjects added successfully!',
            data: newSemester
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding subjects',
            error: error.message
        });
    }
}


exports.filterSubjects = async (req, res) => {
    const { semester } = req.params;
    try {
        const semesterData = await Subject.findOne({ semester: semester });

        console.log(semesterData.subjects)
        res.json(semesterData.subjects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subjects', error: error.message });
    }
}