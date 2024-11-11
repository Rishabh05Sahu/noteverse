const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')
const upload = require('./middleware/upload')
const noteRoutes=require('./routes/noteRoutes')
const pyqRoutes=require('./routes/pyqRoutes')
const subjectRoutes=require('./routes/subjectRoutes')
const port = 4000;

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/notes', express.static('upload/notes'))
app.post('/upload', upload.single('upload'), (req, res) => {
    res.json({
        success: 1,
        url: `http://localhost:${port}/notes/${req.file.filename}`,
    })
})

app.use('/note',noteRoutes);
app.use('/pyq',pyqRoutes);
app.use('/subject',subjectRoutes);

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server running on port ${port}`);
    } else {
        console.log(`Error: ` + error);
    }
});