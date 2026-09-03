let pressCount = 0;
let specialMode = true; // first cycle active

document.addEventListener("keydown", function(e) {
    const video = document.getElementById("moneyTreeDiv");

    // Only run if both flags are false
    if (window.GameVariables.IsPlayingFasestFinger || window.GameVariables.QuestionInProgress) return;

    if (e.keyCode === 37) { // key 'M'
        pressCount++;

        if (specialMode) {
            if (pressCount === 2) {
                video.play();
            } else if (pressCount === 5) {
                video.pause();
                specialMode = false; // go back to normal toggle mode
            }
        } else {
            // normal toggle mode
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
    }
});
