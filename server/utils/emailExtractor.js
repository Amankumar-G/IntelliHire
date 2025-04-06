export const extractEmail = (text) => {
    if (!text) return null;
  
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi;
    const matches = text.match(emailRegex);
  
    if (matches && matches.length > 0) {
      return matches[0]; // Return the first matched email
    }
  
    return null; // No email found
  }
  
