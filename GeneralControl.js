function hideMillionaireLogo(){
	window.GameVariables.IsLogoShowing = false;
	$('.logoContainerDiv').css({'opacity': 0, 'display': 'none', 'pointer-events': 'none'}).transition({perspective:0,opacity:0}, 0, 'linear');
}

function showMillionaireLogo(){
	window.GameVariables.IsLogoShowing = true;
	$('.logoContainerDiv').css({'opacity': 1, 'display': 'block', 'pointer-events': 'auto'}).transition({perspective:0,opacity:1}, 0, 'linear');
	animateLogoBeams();
}

function animateLogoBeams(){
	$('#logoBeam1Img').transition({perspective:0, opacity:0.75}, 2000, 'linear', function(){
		$('#logoBeam1Img').transition({perspective:0, opacity:1}, 2000, 'linear');
	});
	
	$('#logoBeam2Img').transition({perspective:0, opacity:1}, 2000, 'linear', function(){
		$('#logoBeam2Img').transition({perspective:0, opacity:0.75}, 2000, 'linear', function(){
			if(window.GameVariables.IsLogoShowing == true){
				animateLogoBeams();
			}
		});
	});
}

function broadcastTierChange(tierName, bgName) {
    try {
        localStorage.setItem('videoWallTier', JSON.stringify({
            tier: tierName,
            bg: bgName,
            ts: Date.now()
        }));
    } catch (err) {
        console.error(err);
    }
}

function broadcastQmarkZoom() {
  localStorage.setItem('qmarkZoomTrigger', JSON.stringify({ time: Date.now() }));
}

function broadcastWalkAway() {
  localStorage.setItem('videoWallEvent', JSON.stringify({
  action: 'enterHotSeatOnce',
  time: Date.now() // ensures the value changes even if action repeats, so 'storage' event fires
}));
}

function playLightsDownSound() {
    const qLevel = window.GameVariables.QuestionLevel;
    const sounds = window.GameVariables.LightsDownSounds;

    // --- Tier 1: Q1–Q5 ---
    if (window.GameVariables.IsFirstQuestionOfGame || qLevel <= 5) {
        window.GameVariables.IsFirstQuestionOfGame = false;
        broadcastTierChange('q1_q5', 'bgq1');
        startGeneralSound(sounds[0]);
        setTimeout(stopLongPassiveSound, 1000);
        return;
    }

    // --- Tier 2: Q6–Q10 ---
    if (qLevel === 6) {
        broadcastTierChange('q6_q10', 'bgq6');
        startLongActiveSound(sounds[qLevel - 1]);
        setTimeout(stopLongPassiveSound, 1000);
        return;
    }

    // --- Tier 3: Q11–Q14 ---
    if (qLevel === 11) {
        broadcastTierChange('q11_q14', 'bgq11');
        startLongActiveSound(sounds[qLevel - 1]);
        setTimeout(stopLongPassiveSound, 200);
        return;
    }

    // --- Tier 4: Q15 ---
    if (qLevel === 15) {
        broadcastTierChange('q15', 'bgq15');
        startLongActiveSound(sounds[qLevel - 1]);
        setTimeout(stopLongPassiveSound, 200);
        return;
    }

    // --- Fallback (safety) ---
    broadcastQmarkZoom();
    startLongActiveSound(sounds[qLevel - 1]);
    setTimeout(stopLongPassiveSound, 200);
    return;
}

function playBackgroundSound(){
	if(window.GameVariables.QuestionLevel < 6 && window.GameVariables.FirstTierBackgroundSoundPlaying == false){
		window.GameVariables.FirstTierBackgroundSoundPlaying = true;
		startLongPassiveSound(window.GameVariables.RoundBackgroundSounds[window.GameVariables.QuestionLevel - 1]);
	}
	else if(window.GameVariables.QuestionLevel > 5){
		startLongPassiveSound(window.GameVariables.RoundBackgroundSounds[window.GameVariables.QuestionLevel - 1]);
		setTimeout(stopLongActiveSound, 200);
	}
}

function playFinalAnswerSound(){
	if(window.GameVariables.QuestionLevel > 5){
		startLongActiveSound(window.GameVariables.FinalAnswerSounds[window.GameVariables.QuestionLevel - 1]);
		setTimeout(stopLongPassiveSound, 200);
	}
}

function playCorrectAnswerSound(){
	if(window.GameVariables.QuestionLevel < 6){
		startGeneralSound(window.GameVariables.CorrectAnswerSounds[window.GameVariables.QuestionLevel - 1]);
		
		if(window.GameVariables.QuestionLevel == 5){
			setTimeout(stopLongPassiveSound, 1000);
		}
	}
	else if(window.GameVariables.QuestionLevel == 10 || window.GameVariables.QuestionLevel == 15){
		startLongPassiveSound(window.GameVariables.CorrectAnswerSounds[window.GameVariables.QuestionLevel - 1]);
		setTimeout(stopLongActiveSound, 1000);
	}
	else{
		startLongPassiveSound(window.GameVariables.CorrectAnswerSounds[window.GameVariables.QuestionLevel - 1]);
		setTimeout(stopLongActiveSound, 200);
	}
}

function playWrongAnswerSound(){
    let qLevel = window.GameVariables.QuestionLevel;

    // Broadcast wrong tier immediately
    broadcastTierChange('wrong','wrongbg');

    if(qLevel < 6){
        startGeneralSound(window.GameVariables.WrongAnswerSounds[qLevel - 1]);
        setTimeout(stopLongPassiveSound, 200);

    } else if(qLevel == 6 || qLevel == 11){
        startLongPassiveSound(window.GameVariables.WrongAnswerSounds[qLevel - 1]);
        setTimeout(stopLongActiveSound, 1000);

    } else{
        startLongPassiveSound(window.GameVariables.WrongAnswerSounds[qLevel - 1]);
        setTimeout(stopLongActiveSound, 200);
    }

    // Reset to general after 3 seconds
    setTimeout(() => {
        broadcastTierChange('general_int','bg1');
    }, 3000);
}
