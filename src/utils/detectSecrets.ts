export function sanitizeCode(code: string): string {
  // Regular expressions to detect API keys and other secrets
  const patterns = [
    /['"][A-Za-z0-9]{32,}['"]/g, // Generic API key pattern
    /api_key\s*=\s*['"][A-Za-z0-9]{32,}['"]/gi, // Specific patterns
    // Add more patterns as needed
  ];

  let sanitizedCode = code;

  patterns.forEach((pattern) => {
    sanitizedCode = sanitizedCode.replace(pattern, '"<string>"');
  });

  return sanitizedCode;
}
