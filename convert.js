const fs = require('fs');

const htmlContent = fs.readFileSync('../index.html', 'utf8');

// Function to convert CSS string to object string
function cssToObjectString(cssStr) {
  const parts = cssStr.split(';').filter(p => p.trim() !== '');
  const cssObj = parts.map(part => {
    let [key, ...valueParts] = part.split(':');
    if (!key || valueParts.length === 0) return null;
    key = key.trim();
    let value = valueParts.join(':').trim();
    
    // Convert kebab-case to camelCase
    const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    
    // Add quotes around value unless it's a number (but CSS properties often need quotes even for numbers)
    return `"${camelKey}": "${value}"`;
  }).filter(Boolean).join(', ');
  
  return `{{ ${cssObj} }}`;
}

// Replace style="xxx" with style={{...}}
let reactContent = htmlContent.replace(/style="([^"]+)"/g, (match, cssStr) => {
  return `style=${cssToObjectString(cssStr)}`;
});

// The wrapper
const wrapperBegin = `
export default function Page() {
  return (
    <main className="w-full flex justify-center bg-white min-h-screen">
      <div className="w-[1441px] h-[4114px] shrink-0 relative bg-white overflow-hidden shadow-sm">
`;

const wrapperEnd = `
      </div>
    </main>
  );
}
`;

// Extract inner content from first div of index.html
// The file has <div style="width: 1441px; height: 4114px; position: relative; background: white; overflow: hidden">
// We replace the outermost div with our own wrapper to center it
let pageContent = reactContent.replace(/<div(?:[^>]*)>/i, wrapperBegin); // Match the first div
pageContent = pageContent.replace(/<\/div>\s*$/i, wrapperEnd); // Replace the last closing div

// Also remove the "data-icon" and "data-type" or any other non-standard props that might cause issues, 
// though React generally accepts data-* attributes. Let's keep them as they are Data attributes.
// Check for <br> and other unclosed tags
pageContent = pageContent.replace(/<br>/g, '<br/>');

fs.writeFileSync('src/app/page.tsx', pageContent);

console.log('Conversion successful!');
