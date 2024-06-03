
import multer from 'multer'
import path from "path";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Next, Req, Res } from '../types/serverPackageTypes';



// Custom middleware to set limits based on file type using startsWith
const setFileLimit = (req: Req, res: Res, next: Next) => {
    // Access the file using the correct key ('medias')
    const file = req.file
    console.log('file --',file);
    if (!file) {
        return res.status(400).send('No media file found.');
    }

    let maxSize;
    if (file.mimetype.startsWith('image/')) {
        maxSize = 5 * 1024 * 1024; // 5 MB for images
    } else if (file.mimetype.startsWith('video/')) {
        maxSize = 10 * 1024 * 1024; // 10 MB for videos
    } else if (file.mimetype.startsWith('audio/')) {
        maxSize = 5 * 1024 * 1024; // 5 MB for audio files
        console.log('audio');
    } else {
        maxSize = 5 * 1024 * 1024; // Default to 5 MB for other documents
    }

    if (file.size > maxSize) {
console.log('size increase');
        if (typeof file.path === 'string' && file.path.trim().length > 0) {
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        } else {
            console.error('Invalid file path:', file.path);
        }
        
        return res.status(400).json({ error: 'File size exceeds the limit.' });
    }

    next()
}



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDirectory = path.join(__dirname, '../public/media')
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4() + '-' + file.originalname
        cb(
            null,
            uniqueSuffix
        );
    },
});

const multerMid = multer({
    storage: storage,
    limits: {
        fieldNameSize: 100,
        fieldSize:  10* 1024 * 1024
    }
});

export {
    multerMid,
    setFileLimit
}