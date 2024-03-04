 import('./ScoreReportScript.js')
  .catch(error => console.error('Error importing bodyText.js:', error));
 import('./bodyText.js')
  .catch(error => console.error('Error importing bodyText.js:', error));

document.addEventListener("DOMContentLoaded", function() {
    var introBodyTextarea = document.getElementById("IntroBodyContent");
    if (introBodyTextarea) {
        introBodyTextarea.value = IntroBodyContent;
    } else {
        console.error("Textarea element with id 'IntroBodyContent' not found.");
    }
});
