// Function to dynamically load a script and return a promise
export function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
    });
}

// Function to dynamically load a CSS stylesheet
export function loadCSS(href) {
    const link = document.createElement('link');
    link.href = href;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

// Utility for removing parentheses from strings
export function removeParentheses(str) {
    return str.replace(/\(([^)]+)\)/, '').trim();
}

// Utility to capitalize the first letter of each word in a string
export function capitalizeFirstLetter(str) {
    return str.toLowerCase().replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
}

// Function to check if a DOM element contains nested tables
export function hasNestedTables(element) {
    return element.querySelector('table') !== null;
}

// Function to convert a standard score into a descriptive category
export function getDescription(standardScore) {
    const score = parseFloat(standardScore);
    if (isNaN(score)) return ''; // Return empty string if standard score is not a valid number

    if (score < 70) return 'Very Low';
    else if (score >= 70 && score <= 79) return 'Low';
    else if (score >= 80 && score <= 89) return 'Low Average';
    else if (score >= 90 && score <= 110) return 'Average';
    else if (score >= 111 && score <= 120) return 'High Average';
    else if (score >= 121 && score <= 130) return 'Superior';
    else if (score > 131) return 'Very Superior';

    return ''; // Default case, return empty string
}

// Example usage of loadScript
// loadScript('https://example.com/script.js')
//   .then(() => console.log('Script loaded successfully'))
//   .catch(error => console.error('Script loading failed', error));

// Add any other utility functions you need in your application here.
