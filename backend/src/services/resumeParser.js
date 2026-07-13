// backend/src/services/resumeParser.js
const fs = require('fs');
const path = require('path');

let pdfParse;
try {
  pdfParse = require('pdf-parse');
} catch (e) {
  console.warn('[ATS PARSER] pdf-parse is not installed. Fallback to basic text indexing will be active.');
}

let mammoth;
try {
  mammoth = require('mammoth');
} catch (e) {
  console.warn('[ATS PARSER] mammoth is not installed. Fallback to basic text indexing will be active.');
}

// Master list of common technical and professional skills to extract
const COMMON_SKILLS = [
  'React', 'React.js', 'Node', 'Node.js', 'Express', 'Express.js', 'PostgreSQL', 'Postgres', 'SQL', 
  'MongoDB', 'AWS', 'Docker', 'Git', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'Java', 
  'Django', 'Spring', 'C++', 'C#', 'PHP', 'Laravel', 'Angular', 'Vue', 'Ruby', 'Rails', 'Kubernetes', 
  'GCP', 'Azure', 'Redux', 'GraphQL', 'Android', 'iOS', 'Swift', 'Kotlin', 'Go', 'Golang', 'Rust', 
  'Machine Learning', 'Deep Learning', 'NLP', 'Data Science', 'TensorFlow', 'PyTorch', 'Jenkins', 
  'CI/CD', 'Linux', 'Security', 'Agile', 'Scrum', 'Firebase', 'Next.js', 'Vite', 'Tailwind', 'Sass'
];

/**
 * Extracts candidate information from a resume text content using NLP and pattern heuristics.
 */
function extractDetailsFromText(text, fallbackData = {}) {
  let name = fallbackData.full_name || null;
  let email = fallbackData.email || null;
  let phone = fallbackData.phone || null;

  // 1. Email Extraction
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const foundEmail = text.match(emailRegex);
  if (foundEmail && foundEmail.length > 0) {
    email = foundEmail[0].trim();
  }

  // 2. Phone Extraction
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const foundPhone = text.match(phoneRegex);
  if (foundPhone && foundPhone.length > 0) {
    phone = foundPhone[0].trim();
  }

  // 3. Name Extraction (Heuristic: first non-empty lines, or file name)
  if (!name) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length > 0) {
      // Find a line that looks like a name (not an email or phone, short length)
      for (let i = 0; i < Math.min(lines.length, 5); i++) {
        const line = lines[i];
        if (!line.includes('@') && !line.match(/\d/) && line.split(' ').length <= 4 && line.length < 35) {
          name = line;
          break;
        }
      }
    }
  }

  // 4. Skills Extraction (Match against master list)
  const matchedSkills = [];
  const lowercaseText = text.toLowerCase();
  COMMON_SKILLS.forEach(skill => {
    // Escapes regex characters and checks for word boundaries
    const escaped = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(lowercaseText)) {
      matchedSkills.push(skill);
    }
  });
  const skillsStr = matchedSkills.length > 0 ? matchedSkills.join(', ') : (fallbackData.skills || 'JavaScript, React');

  // 5. Experience Extraction
  let experience = 'N/A';
  let experienceYears = 0;
  // Match patterns like "3 years", "5+ yrs", "2.5 years of experience"
  const expRegex = /(\d+(?:\.\d+)?)\s*(?:\+)?\s*(?:years?|yrs?)\b/i;
  const foundExp = text.match(expRegex);
  if (foundExp) {
    experienceYears = parseFloat(foundExp[1]);
    experience = `${experienceYears} Years`;
  } else if (fallbackData.experience) {
    experience = String(fallbackData.experience);
    const parsedYears = parseInt(fallbackData.experience, 10);
    if (!isNaN(parsedYears)) {
      experienceYears = parsedYears;
    }
  }

  // 6. Education Extraction
  let education = 'N/A';
  const eduKeywords = ['Bachelor', 'B.Tech', 'B.E.', 'B.S.', 'M.Tech', 'Master', 'Ph.D.', 'Phd', 'Graduate', 'Diploma', 'University', 'College', 'Institute'];
  const textLines = text.split('\n');
  const eduLines = textLines.filter(line => eduKeywords.some(keyword => new RegExp(`\\b${keyword}\\b`, 'i').test(line)));
  if (eduLines.length > 0) {
    education = eduLines.slice(0, 2).map(l => l.trim()).join(' | ');
  } else if (fallbackData.highest_qualification) {
    education = fallbackData.highest_qualification;
    if (fallbackData.school_university) {
      education += ` - ${fallbackData.school_university}`;
    }
  }

  // 7. Certifications Extraction
  let certifications = 'N/A';
  const certKeywords = ['Certified', 'Certification', 'Certificate', 'AWS Certified', 'Azure Certified', 'PMP', 'Scrum Master', 'CCNA', 'OCP'];
  const certLines = textLines.filter(line => certKeywords.some(keyword => new RegExp(`\\b${keyword}\\b`, 'i').test(line)));
  if (certLines.length > 0) {
    certifications = certLines.slice(0, 3).map(l => l.trim()).join(', ');
  }

  // 8. Projects Extraction
  let projects = 'N/A';
  const projectKeywords = ['Project', 'Key Projects', 'Academic Project', 'Personal Project', 'Portfolio'];
  const projectLines = textLines.filter(line => projectKeywords.some(keyword => new RegExp(`\\b${keyword}\\b`, 'i').test(line)));
  if (projectLines.length > 0) {
    projects = projectLines.slice(0, 3).map(l => l.trim()).join(' | ');
  }

  return {
    full_name: name || fallbackData.full_name || 'Applicant Name',
    email: email || fallbackData.candidate_email || 'email@example.com',
    phone: phone || fallbackData.candidate_phone || 'N/A',
    skills: skillsStr,
    experience,
    experience_years: experienceYears,
    education,
    certifications,
    projects
  };
}

/**
 * Parses an uploaded resume file and extracts candidate metadata.
 */
exports.parseResume = async (filePath, fallbackData = {}) => {
  let textContent = '';

  try {
    if (filePath && fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();

      if (ext === '.pdf') {
        if (pdfParse) {
          const buffer = fs.readFileSync(filePath);
          const data = await pdfParse(buffer);
          textContent = data.text;
        } else {
          // Fallback if pdf-parse is missing
          textContent = fs.readFileSync(filePath, 'binary');
        }
      } else if (ext === '.docx') {
        if (mammoth) {
          const result = await mammoth.extractRawText({ path: filePath });
          textContent = result.value;
        } else {
          // Fallback if mammoth is missing
          textContent = fs.readFileSync(filePath, 'binary');
        }
      } else {
        textContent = fs.readFileSync(filePath, 'utf-8');
      }
    }
  } catch (err) {
    console.error('[ATS PARSER ERROR] Error reading file content:', err.message);
  }

  // If we couldn't extract any meaningful text, use fallback text
  if (!textContent || textContent.trim().length === 0) {
    textContent = `
      Name: ${fallbackData.full_name || ''}
      Email: ${fallbackData.email || ''}
      Phone: ${fallbackData.phone || ''}
      Skills: ${fallbackData.skills || ''}
      Experience: ${fallbackData.experience || ''}
      Education: ${fallbackData.highest_qualification || ''} ${fallbackData.school_university || ''}
    `;
  }

  return extractDetailsFromText(textContent, fallbackData);
};
