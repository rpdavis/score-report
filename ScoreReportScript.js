(function() {
    function extractDataFromTable() {
        // Get the div containing the table
        const divScoreReportHtmlView = document.getElementById('dvScoreReportHtmlView');
        if (!divScoreReportHtmlView) {
            console.error('Div not found');
            return null;
        }

        // Find the first table within the div
        const table = divScoreReportHtmlView.querySelector('table');
        if (!table) {
            console.error('Table not found');
            return null;
        }

        // Initialize variables to store extracted data
        let data = {
            name: '',
            school: '',
            dateOfBirth: '',
            age: '',
            sex: '',
            dateOfTesting: '',
            examiners: ''
        };

        // Extract data from each row of the table
        table.querySelectorAll('tr').forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                const textContent = cell.textContent.trim();
                if (textContent.startsWith('Name:')) {
                    data.name = textContent.replace('Name:', '').trim();
                } else if (textContent.startsWith('School:')) {
                    data.school = textContent.replace('School:', '').trim();
                } else if (textContent.startsWith('Date of Birth:')) {
                    data.dateOfBirth = textContent.replace('Date of Birth:', '').trim();
                } else if (textContent.startsWith('Age:')) {
                    data.age = textContent.replace('Age:', '').trim();
                } else if (textContent.startsWith('Sex:')) {
                    data.sex = textContent.replace('Sex:', '').trim();
                } else if (textContent.startsWith('Date of Testing:')) {
                    data.dateOfTesting = textContent.replace('Date of Testing:', '').trim();
                } else if (textContent.startsWith('Examiners:')) {
                    data.examiners = textContent.replace('Examiners:', '').trim();
                }
            });
        });

        return data;
    }

    const extractedData = extractDataFromTable();
    if (!extractedData) {
        console.error('Failed to extract data');
        return;
    }

    // Use the extracted data
    console.log('Extracted Data:', extractedData);

    // Additional logic to create and download HTML content
    // This portion assumes you want to create an HTML representation of the extracted data
    let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Extracted Data Report</title>
        </head>
        <body>
            <h1>Score Report</h1>
            <p><strong>Name:</strong> ${extractedData.name}</p>
            <p><strong>School:</strong> ${extractedData.school}</p>
            <p><strong>Date of Birth:</strong> ${extractedData.dateOfBirth}</p>
            <p><strong>Age:</strong> ${extractedData.age}</p>
            <p><strong>Sex:</strong> ${extractedData.sex}</p>
            <p><strong>Date of Testing:</strong> ${extractedData.dateOfTesting}</p>
            <p><strong>Examiners:</strong> ${extractedData.examiners}</p>
        </body>
        </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'extracted_data.html';
    document.body.appendChild(link); // This makes it work on Firefox.
    link.click();
})();
