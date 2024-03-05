function generateIntroBodyContent(data) {
  // Assuming data contains firstName for simplicity; adjust according to your actual data structure
  const { firstName } = data;

  return `
    <p><strong>I. Reason for Referral:</strong></p>
    <p>${firstName} was referred for this academic assessment as part of a 3-year re-evaluation for special education services. (Please see the psycho-educational report for additional information).</p>

    <p><strong>II. Methods of Data Collection:</strong></p>
    <p>The following procedures were used to obtain a valid estimate of ${firstName}'s academic achievement:</p>
    <ol>
        <li>Assessment Observations</li>
        <li>Woodcock-Johnson Tests of Achievement, Fourth edition (WJ-IV-ACH)</li>
    </ol>

    <p><strong>III. Current Information:</strong></p>
    <p>${firstName} is an 8th grade student at Jepson Middle School receiving Special Education services in RSP English and RSP math. ${firstName} is a model student. She is well-behaved and works hard in all of her classes.</p>

    <p><strong>IV. Academic Testing:</strong></p>
    <p>${firstName} was administered the Woodcock-Johnson Tests of Achievement, fourth edition (WJ-IV-ACH) by Ryan Davis, Special Education Teacher. The WJ-IV-ACH is a standardized test of achievement that can be used to assess basic academic skills.</p>

    <p>${firstName} was tested in a separate classroom over 5 days in forty-minute increments. The testing room was quiet and ${firstName} was attentive to the tasks in front of her. She appeared at ease and comfortable through the assessment. She was able to persist with difficult tasks though at times she would be slow to skip a question she did not know.</p>

    <p>Yes_x__ No___ The instrument used during this assessment has been validated for the specific purpose for which it was used.</p>
    <p>Yes__x_ No ___ Assessment results were obtained through a valid administration of the test.</p>
    <p>Yes__x_ No ___ These assessment results may be considered an accurate reflection of ${firstName}'s present level of academic functioning. During her timed assessments of math and writing fluency she would write the words “I don’t know” each time she skipped a problem. However, the delay is caused was relatively minimal.</p>
  `;
}

export function generateHTMLContent(data) {
  const introBodyContent = generateIntroBodyContent(data);

  // The following builds the complete HTML structure including introBodyContent
  // Adjust and extend this template as necessary to include other parts of the report
  const fullReportHTML = `
    <div id="reportContent">
      ${introBodyContent}
      <p><strong>${data.firstName}'s scores were as follows:</strong></p>
      <!-- Insert score tables or other data presentations here -->
    </div>
  `;

  return fullReportHTML;
}
