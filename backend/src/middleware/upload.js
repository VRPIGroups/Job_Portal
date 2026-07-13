// backend/src/middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadBasePath = path.join(__dirname, '../../public/uploads');
const resumePath = path.join(uploadBasePath, 'resumes');
const imagePath = path.join(uploadBasePath, 'images');

if (!fs.existsSync(resumePath)) {
  fs.mkdirSync(resumePath, { recursive: true });
}
if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, { recursive: true });
}

// Multer Disk Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'resume') {
      cb(null, resumePath);
    } else {
      cb(null, imagePath);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const cleanedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(cleanedOriginalName)}`);
  }
});

// File validation filters
const fileFilter = (req, file, cb) => {
  const fileExts = {
    resume: ['.pdf', '.doc', '.docx'],
    logo: ['.png', '.jpg', '.jpeg', '.webp'],
    profile_image: ['.png', '.jpg', '.jpeg', '.webp']
  };

  const fileMimeTypes = {
    resume: [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    logo: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
    profile_image: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
  };

  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = fileExts[file.fieldname] || [];
  const allowedMimeTypes = fileMimeTypes[file.fieldname] || [];

  if (!allowedExts.includes(ext) || !allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error(`Invalid file type for field '${file.fieldname}'. Allowed: ${allowedExts.join(', ')}`), false);
  }

  cb(null, true);
};

// Create Multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: (req, file, cb) => {
      // Multer limits can also be enforced via separate middleware
      // We will set maximum size dynamically
      if (file.fieldname === 'resume') {
        return parseInt(process.env.MAX_RESUME_SIZE) || 5242880; // 5MB
      } else {
        return parseInt(process.env.MAX_IMAGE_SIZE) || 2097152; // 2MB
      }
    }
  }
});

// Size check wrapper middleware to return clean JSON errors rather than HTML stack traces
const uploadHandler = (fieldname, isArray = false) => {
  const uploadMiddleware = isArray 
    ? upload.array(fieldname) 
    : upload.single(fieldname);

  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            const limit = fieldname === 'resume' ? '5MB' : '2MB';
            return res.status(400).json({ success: false, message: `File size too large. Max limit is ${limit}.` });
          }
          return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
        }
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  };
};

module.exports = {
  uploadResume: uploadHandler('resume'),
  uploadLogo: uploadHandler('logo'),
  uploadProfileImage: uploadHandler('profile_image'),
  uploadMultiple: upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'profile_image', maxCount: 1 }
  ]),
  // Expose base paths
  uploadBasePath,
  resumePath,
  imagePath
};
