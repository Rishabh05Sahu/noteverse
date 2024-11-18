const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')
const upload = require('./middleware/upload')
const noteRoutes = require('./routes/noteRoutes')
const pyqRoutes = require('./routes/pyqRoutes')
const subjectRoutes = require('./routes/subjectRoutes')
const port = 4000;
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

app.use('/notes', express.static('upload/notes'))
app.post('/upload', upload.single('upload'), async (req, res) => {

    const file = req.file;
    if (!file) {
        return res.status(400).send({ success: 0, error: "No file uploaded" });
    }
    const fileName = `${Date.now()}_${file.originalname}`;
    const { data, error } = await supabase.storage
        .from("notes-files")
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            cacheControl: '3600',
        });

    if (error) {
        console.error(error);
        return res.status(500).send({ success: 0, error: "Failed to upload file" });
    }

    // Generate public URL
    const { data: publicData } = supabase.storage
        .from("notes-files")
        .getPublicUrl(fileName);
    res.json({
        success: 1,
        url: publicData.publicUrl,
    })
})


app.use('/note', noteRoutes);
app.use('/pyq', pyqRoutes);
app.use('/subject', subjectRoutes);

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server running on port ${port}`);
    } else {
        console.log(`Error: ` + error);
    }
});