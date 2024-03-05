import { loadScript, loadCSS } from './utils.js';
import { extractDataFromTable } from './dataExtraction.js';
import { generateHTMLContent } from './htmlGenerator.js';

// Define the scripts and CSS files you want to dynamically load
const scriptsToLoad = [
    'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js',
    // Add other script URLs as needed
];
const cssToLoad = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.0.0/css/all.min.css',
    // Add other CSS URLs as needed
];

// Load external scripts dynamically
Promise.all(scriptsToLoad.map(script => loadScript(script)))
    .then(() => {
        console.log('All external scripts loaded successfully.');
        // Load CSS files
        cssToLoad.forEach(css => loadCSS(css));
        // Once scripts are loaded, extract data and generate the report
        const extractedData = extractDataFromTable();
        if (extractedData) {
            const htmlContent = generateHTMLContent(extractedData);
            document.getElementById('reportContainer').innerHTML = htmlContent;
        }
    })
    .catch(error => {
        console.error('Error loading external scripts:', error);
    });

// Add any additional initialization logic here
