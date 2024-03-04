
// 1. Create your score report in Microsoft edge 
// 2. Choose "Web Page" for output format 
// 2. Right click on the score report and select "inspect"
// 4. Click on "⟩⟩" and select "console"
// 5. Copy and paste the following code and hit return



    // Get the <b> element containing the label "Name:"
    var nameElement = document.querySelector('#dvScoreReportOutPut a');
    var fullName = nameElement.textContent.trim();

    // Split the full name into first and last name
    var commaIndex = fullName.indexOf(',');
    var lastName = fullName.substring(0, commaIndex).trim();
    var firstName = fullName.substring(commaIndex + 2).trim(); // Adding 2 to skip the comma and the following space

    console.log("First Name: " + firstName);
    console.log("Last Name: " + lastName);


//------------
    // Function to remove leading and trailing parentheses from a string
    const removeParentheses = (str) => str.replace(/\(([^)]+)\)/, '').trim();

    // Function to capitalize the first letter of each word
    const capitalizeFirstLetter = (str) => str.toLowerCase().replace(/^(.)|\s+(.)/g, ($1) => $1.toUpperCase());

    // Function to check if a cell contains nested tables
    const hasNestedTables = (cell) => cell.querySelector('table') !== null;

    // Function to determine the description based on standard score
    const getDescription = (standardScore) => {
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
    };

    // Select the tables with the class "search-results"
    let clusterTables = document.querySelectorAll('table.search-results');

    // Initialize the HTML content
    let newHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Extracted Data</title>
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }

            td {
                border: 1px solid #000;
                padding: 6.624px;
                text-align: center;
            }

            td:nth-child(1) {
                width: 1.813in;
                text-align: left;
            }

            td:nth-child(2) {
                width: 1.438in;
            }

            td:nth-child(3) {
                width: 1.53in;
            }

            td:nth-child(4) {
                width: 1.553in;
                text-align: left;
            }

            .header-cell {
                background-color: #ccc;
                text-align: center;
            }

            .normal-cell {
                text-align: center;
            }

            .cap {
                font-weight: bold;
            }
        </style>
    </head>
    <body>BODY
    <textarea id="IntroBodyContent">hello</textarea>
    `;
//add html text
// import('./bodyText.js')
  //.catch(error => console.error('Error importing bodyText.js:', error));
  
    // Define clusters and their corresponding test names
    const clusters = [
        {
            name: 'A. Reading Clusters',
            tests: [
                ['READING', 'Letter-Word Identification', 'Passage Comprehension'],
                ['BROAD READING', 'Letter-Word Identification', 'Sentence Reading Fluency', 'Passage Comprehension'],
                ['BASIC READING SKILLS', 'Letter-Word Identification', 'Word Attack'],
                ['READING FLUENCY', 'Sentence Reading Fluency', 'Oral Reading'],
                ['READING COMPREHENSION', 'Passage Comprehension', 'Reading Recall']
            ]
        },
        {
            name: 'B. Writing Clusters',
            tests: [
                ['WRITTEN EXPRESSION', 'Writing Samples', 'Sentence Writing Fluency'],
                ['Spelling']
            ]
        },
        {
            name: 'C. Math Clusters',
            tests: [
                ['MATHEMATICS', 'Applied Problems', 'Calculation'],
                ['BROAD MATHEMATICS', 'Applied Problems', 'Calculation', 'Math Facts Fluency'],
                ['MATH CALCULATION SKILLS', 'Calculation', 'Math Facts Fluency'],
                ['MATH PROBLEM SOLVING', 'Applied Problems', 'Number Matrices']
            ]
        },
        {
            name: 'D. Oral Language Clusters',
            tests: [
                ['ORAL LANGUAGE', 'Picture Vocabulary', 'Oral Comprehension'],
                ['BROAD ORAL LANGUAGE', 'Picture Vocabulary', 'Oral Comprehension', 'Understanding Directions'],
                ['ORAL EXPRESSION', 'Picture Vocabulary', 'Sentence Repetition'],
                ['LISTENING COMP', 'Oral Comprehension', 'Understanding Directions']
            ]
        }
    ];

    // Object to store test names and their corresponding standard scores
    const testScores = {};

    // Loop through each cluster
    clusters.forEach((cluster) => {
        // Loop through each test in the cluster
        cluster.tests.forEach((test) => {
            // Loop through each table
            clusterTables.forEach((clusterTable) => {
                // Extract data from each row of the table
                const rows = clusterTable.querySelectorAll('tr');

                // Loop through each row in the table
                for (let i = 0; i < rows.length; i++) {
                    const cells = rows[i].querySelectorAll('td, th'); // Include th tags as well

                    // Ensure there are at least 5 cells and no nested tables
                    if (cells.length >= 5 && !hasNestedTables(cells[4])) {
                        const testName = cells[0].innerText.trim();

                        // Select the fifth td or th element in the row
                        const targetTd = rows[i].querySelector('td:nth-child(5), th:nth-child(5)');

                        // Check if the targetTd is found and the testName matches any of the specified test names
                        if (targetTd && test.includes(testName)) {
                            // Extract and remove parentheses from the content
                            const standardScore = removeParentheses(targetTd.innerText.trim());

                            // Store the test name and standard score in the object
                            testScores[testName] = standardScore;
                        }
                    }
                }
            });
        });
    });

    // Define clusters and their corresponding test names
    clusters.forEach((cluster) => {
        // Print cluster name
        newHTML += `<h2>${cluster.name}</h2>`;

        // Loop through each test in the cluster
        cluster.tests.forEach((test) => {
            // Add table header
            newHTML += `
            <table border="1">
                <tr>
                    <th></th>
                    <th>Standard Score</th>
                    <th>Percentile</th>
                    <th>Descriptor</th>
                </tr>
            `;

            // Loop through each table
            clusterTables.forEach((clusterTable, index) => {
                // Extract data from each row of the table
                const rows = clusterTable.querySelectorAll('tr');

                // Loop through each row in the table and add to the HTML content
                for (let i = 0; i < rows.length; i++) {
                    const cells = rows[i].querySelectorAll('td, th'); // Include th tags as well

                    // Ensure there are at least 5 cells and no nested tables
                    if (cells.length >= 5 && !hasNestedTables(cells[4])) {
                        const testName = cells[0].innerText.trim();

                        // Select the fifth td or th element in the row
                        const targetTd = rows[i].querySelector('td:nth-child(5), th:nth-child(5)');

                        // Check if the targetTd is found and the testName matches any of the specified test names
                        if (targetTd && test.includes(testName)) {
                            // Extract and remove parentheses from the content
                            const standardScore = removeParentheses(targetTd.innerText.trim());

                            // Extract and remove parentheses from the PR content
                            const targetTdpr = rows[i].querySelector('td:nth-child(6), th:nth-child(6)');
                            const testPr = targetTdpr ? removeParentheses(targetTdpr.innerText.trim()) : '';

                            // Determine the description based on standard score
                            const description = getDescription(standardScore);

                            // Add a new row for each extracted data
                            newHTML += `
                            <tr>
                                <td class="${testName === testName.toUpperCase() ? 'cap' : ''}">${capitalizeFirstLetter(testName)}</td>
                                <td>${standardScore}</td>
                                <td>${testPr}</td>
                                <td>${description}</td>
                            </tr>
                            `;
                        }
                    }
                }
            });

            // Close the table
            newHTML += `</table>`;
        });
    });

    // Generate paragraphs at the bottom of the page based on descriptor categories
    newHTML += '<div>';
    ['Very Superior', 'Superior', 'High Average', 'Average','Low Average', 'Low', 'Very Low'].forEach((descriptor) => {
        const testsWithScore = Object.entries(testScores)
            .filter(([testName, score]) => getDescription(score) === descriptor);

        if (testsWithScore.length > 0) {
            newHTML += `<p>When compared to other students at their age level, ${firstName}’s standard scores are in the ${descriptor.toLowerCase()} range for `;
            newHTML += testsWithScore.map(([testName, score]) => `${capitalizeFirstLetter(testName)} (${score})`).join(', ');
            newHTML += `</p>`;
        }
    });
   newHTML += '<textarea id="IntroBodyContent">' +
    '<p><strong>I. Reason for Referral:</strong></p>' +
    '<p>${firstName} was referred for this academic assessment as part of a 3-year re-evaluation for special education services. (Please see the psycho-educational report for additional information).</p>' +
    '<p><strong>II. Methods of Data Collection:</strong></p>' +
    '<p>The following procedures were used to obtain a valid estimate of ${firstName}&apos;s academic achievement:</p>' +
    '<ol>' +
    '<li>Assessment Observations</li>' +
    '<li>Woodcock-Johnson Tests of Achievement, Fourth edition (WJ-IV-ACH)</li>' +
    '</ol>' +
    '<p><strong>III. Current Information:</strong></p>' +
    '<p>${firstName} is an 8th grade student at Jepson Middle School receiving Special Education services in RSP English and RSP math. ${firstName} is a model student. She is well-behaved and works hard in all of her classes.</p>' +
    '<p><strong>IV. Academic Testing:</strong></p>' +
    '<p>${firstName} was administered the Woodcock-Johnson Tests of Achievement, fourth edition (WJ-IV-ACH) by Ryan Davis, Special Education Teacher. The WJ-IV-ACH is a standardized test of achievement that can be used to assess basic academic skills.</p>' +
    '<p>${firstName} was tested in a separate classroom over 5 days in forty-minute increments. The testing room was quiet and ${firstName} was attentive to the tasks in front of her. She appeared at ease and comfortable through the assessment. She was able to persist with difficult tasks though at times she would be slow to skip a question she did not know.</p>' +
    '<p>Yes_x__ No___ The instrument used during this assessment has been validated for the specific purpose for which it was used.</p>' +
    '<p>Yes__x_ No ___ Assessment results were obtained through a valid administration of the test.</p>' +
    '<p>Yes__x_ No ___ These assessment results may be considered an accurate reflection of ${firstName}&apos;s present level of academic functioning. During her timed assessments of math and writing fluency she would write the words “I don’t know” each time she skipped a problem. However, the delay is caused was relatively minimal.</p>' +
    '<p><strong>${firstName}&apos;s scores were as follows:</strong></p></textarea></div>';

    // Close the HTML content
    newHTML += `
    </body>
    </html>
    `;

    // Create a Blob and download the file
    const blob = new Blob([newHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'extracted_data.html';
    link.click();

