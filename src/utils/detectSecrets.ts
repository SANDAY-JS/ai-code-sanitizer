export function sanitizeCode(code: string): string {
  // Regular expressions to detect API keys and other secrets
  const patterns = [
    /(['"])[A-Za-z0-9-_]{32,}\1/g, // Generic API key pattern
    /\b[A-Za-z0-9-_]{32,}\b/g, // Any 32+ character alphanumeric strings
    /api_key\s*=\s*(['"])[A-Za-z0-9-_]+?\1/gi, // Specific patterns
    /password\s*=\s*(['"])[^'"]+?\1/gi, // Passwords assigned to variables
    // Add more patterns as needed
  ];

  let sanitizedCode = code;

  patterns.forEach((pattern) => {
    sanitizedCode = sanitizedCode.replace(pattern, '"<string>"');
  });

  return sanitizedCode;
}
