// Email validator
export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

// Phone validator
export const validatePhone = (phone) => {
  // Simple phone check: at least 10 digits
  const cleaned = phone.replace(/[^0-9+]/g, '');
  return cleaned.length >= 10;
};

// Required fields validator
export const validateRequired = (val) => {
  if (val === null || val === undefined) return false;
  if (typeof val === 'string') return val.trim().length > 0;
  return true;
};

// File size validator
export const validateFileSize = (file, maxMB) => {
  if (!file) return false;
  const maxBytes = maxMB * 1024 * 1024;
  return file.size <= maxBytes;
};

// File type validator (by extensions with dots)
export const validateFileType = (file, allowedExtensions) => {
  if (!file || !file.name) return false;
  const fileExt = '.' + file.name.split('.').pop().toLowerCase();
  return allowedExtensions.includes(fileExt);
};

// Resume file validator (legacy / all-in-one check)
export const validateResumeFile = (file) => {
  if (!file) return { valid: false, error: 'Resume file is required!' };
  
  const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
  const fileExt = file.name.split('.').pop().toLowerCase();
  
  if (!allowedExtensions.includes(fileExt)) {
    return { valid: false, error: 'Only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed!' };
  }
  
  const maxBytes = 5 * 1024 * 1024; // 5MB
  if (file.size > maxBytes) {
    return { valid: false, error: 'File size must be less than 5MB!' };
  }
  
  return { valid: true };
};

