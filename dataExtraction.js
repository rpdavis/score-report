export function extractDataFromTable() {
    const divScoreReportHtmlView = document.getElementById('dvScoreReportHtmlView');
    let extractedData = {
        name: '',
        school: '',
        // Add other fields as necessary
    };

    if (!divScoreReportHtmlView) {
        console.error('Div not found');
        return null;
    }

    // Extraction logic...
    // Assume we fill extractedData based on your initial logic.

    return extractedData;
}
