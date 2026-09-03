// --- Tab sync helpers (place BEFORE your $(document).ready(...) that contains the big keydown handler) ---
(function(){
  // Broadcast key press to other tabs
  function broadcastKeyPress(keyCode){
    try{
      const payload = { keyCode: keyCode, ts: Date.now() };
      // write a new value so other tabs get storage event
      localStorage.setItem('sharedKeyEvent', JSON.stringify(payload));
      // (optional) you could remove it after a short time if you want:
      // setTimeout(() => localStorage.removeItem('sharedKeyEvent'), 50);
    } catch(err){
      console.error('broadcastKeyPress error', err);
    }
  }

  window.isMasterController = false;

  // Listen for other tabs
  window.addEventListener('storage', function(ev){
    if(ev.key !== 'sharedKeyEvent') return;
    if(!ev.newValue) return;

    let data;
    try {
      data = JSON.parse(ev.newValue);
    } catch(err) {
      console.error('Invalid sharedKeyEvent JSON', err, ev.newValue);
      return;
    }
    if(!data || typeof data.keyCode === 'undefined') return;

    // Trigger the same jQuery keydown handler but *mark* it as simulated
    // so the handler can skip re-broadcasting (prevents infinite loop)
    var jqEvent = $.Event('keydown', {
      keyCode: data.keyCode,
      which: data.keyCode,
      isSimulated: true
    });
    $(document).trigger(jqEvent);
  });

    window.addEventListener("storage", function(e) {
    if (e.key === "ATA_RESULT") {
        let data = JSON.parse(e.newValue);

        window.GameVariables.AnswerAPercent = data.A;
        window.GameVariables.AnswerBPercent = data.B;
        window.GameVariables.AnswerCPercent = data.C;
        window.GameVariables.AnswerDPercent = data.D;

        // If controller is slave, skip generating, only reveal
        if (!window.isMasterController) {
            revealGraphPercentages();
        }
    }
});
window.addEventListener("storage", function(e) {
    if (e.key === "FF_RESULT") {
        const data = JSON.parse(e.newValue);
        const removed = data.removed;

        // Remove them on all controllers
        removed.forEach(letter => removeAnswer(letter));

    }
});

  // Make broadcast available globally (so your existing handler can call it)
  window.broadcastKeyPress = broadcastKeyPress;
})();

// Create a shared communication channel
const ffChannel = new BroadcastChannel('ff_sync');

window.handleGameKey = function(keyCode) {
	processGameKey({ keyCode: Number(keyCode), which: Number(keyCode) });
};

$(document).ready(function(){
	$(document).on('keydown', function(e)
	{
		if ($(e.target).is('input, textarea, select')) {
			return;
		}
		var isSimulated = !!(e.isSimulated || (e.originalEvent && e.originalEvent.isSimulated) || window.isRemoteEvent);
		var code = e.keyCode || e.which;
		if (isSimulated) {
			window.handleGameKey(code);
		} else {
			if (typeof broadcastKeyPress === 'function') {
				broadcastKeyPress(code);
			}
			window.handleGameKey(code);
		}
	});
});

function processGameKey(e)
{
	if(e.keyCode == 37) // key 'left arrow' for fastest-finger / money tree hide and show
		{
			if(window.GameVariables.IsLogoShowing == false && window.GameVariables.IsInCommercial == false)
			{
if(window.GameVariables.IsPlayingFasestFinger == true)
				{
					if(window.GameVariables.FastestFingerSequenceCounter <= 9)
					{
						if(window.GameVariables.FastestFingerSequenceCounter == 0)
						{
							startShortActiveSound("fastest_finger_contestants.mp3");
						}
						// reveal contestants one at a time
						revealFastestFingerContestants();
						setFFFQuestion(window.GameVariables.FFFQuestionIndex);
					}
					else if(window.GameVariables.FastestFingerSequenceCounter == 10)
					{
						hideContestantNameAndLocation();
					}
					else if(window.GameVariables.FastestFingerSequenceCounter == 11)
{
    // Immediately switch video wall to QFFF tier
    broadcastTierChange('qfff','wrongbg'); 

    startGeneralSound("game_resume_stop.mp3");
    setTimeout(stopLongPassiveSound, 10);
    setTimeout(() => startShortPassiveSound("fastest_finger_read_question.mp3"), 250);
}
					else if(window.GameVariables.FastestFingerSequenceCounter == 12)
					{
						$('.answerGroupBDiv').transition({perspective:4096, 'bottom':'-240px'}, 0);
						$('.answerGroupADiv').transition({perspective:4096, 'bottom':'-240px'}, 0);
						revealFastestFingerQuestion();
						$('.questionStrapDiv').transition({perspective:4096, 'bottom':'-192px', 'rotateX':'0deg'}, 0, function(){
							setTimeout(function(){
								$('.questionStrapDiv').transition({perspective:4096, 'bottom':'234px'}, 500, 'cubic-bezier(0.5, 1.5, 0.5, 1)');
							}, 0);
							setTimeout(function(){
								$('.answerGroupADiv').transition({perspective:4096, 'bottom':'16px'}, 500, 'cubic-bezier(0.5, 1.25, 0.5, 1)');
							}, 250);
							setTimeout(function(){
								$('.answerGroupBDiv').transition({perspective:4096, 'bottom':'16px'}, 500, 'cubic-bezier(0.5, 1.25, 0.5, 1)');
							}, 350);
						});
					}
					else if(window.GameVariables.FastestFingerSequenceCounter == 13)
					{
						startShortActiveSound("fastest_finger_3_stabs.mp3");
						setTimeout(stopShortPassiveSound, 200);
					}
					else if(window.GameVariables.FastestFingerSequenceCounter == 14)
					{
						revealAllAnswersAtOnce();
						startShortPassiveSound("fastest_finger_think.mp3");
					}
					else if(window.GameVariables.FastestFingerSequenceCounter == 15)
{
    hideFastestFingerQuestionAndAnswers();

    // Return video wall to General tier
    broadcastTierChange('general_int','bg1');
}
					else if(window.GameVariables.FastestFingerSequenceCounter == 16)
					{
						startShortPassiveSound("fastest_finger_read_answer_order.mp3");
					}
					else if(window.GameVariables.FastestFingerSequenceCounter == 17)
					{
						showFastestFingerAnswerTree();
					}
					else if(window.GameVariables.FastestFingerSequenceCounter <= 21)
					{
						var soundToPlay = "";
					
						revealFastestFingerAnswersinCorrectOrder();
						
						if(window.GameVariables.FastestFingerSequenceCounter == 18){
							soundToPlay = "fastest_finger_answer_correct_1.mp3";
						}
						else if(window.GameVariables.FastestFingerSequenceCounter == 19){
							soundToPlay = "fastest_finger_answer_correct_2.mp3";
						}
						else if(window.GameVariables.FastestFingerSequenceCounter == 20){
							soundToPlay = "fastest_finger_answer_correct_3.mp3";
						}
						else if(window.GameVariables.FastestFingerSequenceCounter == 21){
							soundToPlay = "fastest_finger_answer_correct_4.mp3";
						}
						
						startGeneralSound(soundToPlay);
					}
					else if(window.GameVariables.FastestFingerSequenceCounter == 22)
					{
						hideFastestFingerAnswerTree();
						showFastestFingerContestants();
					}
					else if(window.GameVariables.FastestFingerSequenceCounter == 23)
					{
						revealFastestFingerWinnersAndTimes();
						startGeneralSound("fastest_finger_reveal_times.mp3");
						setTimeout(stopShortPassiveSound, 200);
					}
					else if(window.GameVariables.FastestFingerSequenceCounter == 24)
					{
						flashFastestTimeStep1();
						startGeneralSound("fastest_finger_winner.mp3");
					}
					else if(window.GameVariables.FastestFingerSequenceCounter == 25)
					{
						showTheFastestFingerWinner();
					}
					else if(window.GameVariables.FastestFingerSequenceCounter == 26)
					{
						hideTheFastestFingerWinner();
					}
					else if (window.GameVariables.FastestFingerSequenceCounter == 27) {
    startShortActiveSound("hello_long.mp3");
    window.GameVariables.IsPlayingFasestFinger = false;

    // --- trigger Enter Hot Seat animation ---
    try {
        // If enterHotSeat() exists in this window (same page)
        if (typeof enterHotSeat === 'function') {
            enterHotSeat();
        }
    } catch(e) {
        console.warn('enterHotSeat() call failed:', e);
    }

    // --- Notify video/logo page if it’s separate ---
    try {
        const payload = JSON.stringify({ action: 'enterHotSeat', ts: Date.now() });
        localStorage.setItem('videoWallEvent', payload);
    } catch (err) {
        console.warn('Could not send enterHotSeat event to video wall', err);
    }
}		
					window.GameVariables.FastestFingerSequenceCounter++;
				}
				else if(window.GameVariables.QuestionInProgress == false && window.GameVariables.IsInCommercial == false && window.GameVariables.IsTotalPrizeMoneyShowing == false){
					// money tree animations
					if(window.GameVariables.MoneyTreeSequenceCounter == 0)
					{
						if(window.GameVariables.QuestionLevel < 8){
							startLongPassiveSound("explain_rules.mp3");
						}
						else{
							startLongPassiveSound("explain_rules_v2.mp3");
						}
					}
					else if(window.GameVariables.MoneyTreeSequenceCounter == 1)
					{
						slideInMoneyTree();
						window.GameVariables.IsMoneyTreeShowing = true;
					}
					else if(window.GameVariables.MoneyTreeSequenceCounter == 2)
					{
						scaleTreeLevels(window.GameVariables.QuestionLevel);
					}
					else if(window.GameVariables.MoneyTreeSequenceCounter == 3)
					{
						unscaleTreeLevels();
					}
					else if(window.GameVariables.MoneyTreeSequenceCounter >= 4)
					{
						
						window.GameVariables.IsMoneyTreeShowing == true ? slideOutMoneyTree() : slideInMoneyTree();
						window.GameVariables.IsMoneyTreeShowing == true ? setLevelOnMoneyTree(window.GameVariables.QuestionLevel) : null;
						window.GameVariables.STQUnlockedLevel > window.GameVariables.QuestionLevel ? stqLifeLineSlideOut() : null;
						window.GameVariables.IsMoneyTreeShowing = !window.GameVariables.IsMoneyTreeShowing;
						window.GameVariables.IsExplainingRules = false;
					}
					
					window.GameVariables.MoneyTreeSequenceCounter++;
				}
			}
		}
		else if(e.keyCode == 38) // key 'up arrow' NOT ASSIGNED
		{
			countQuestionAndAnswerGlint();
			showNextLevelOnMoneyTree(window.GameVariables.QuestionLevel);
		}
		else if(e.keyCode == 39) // key 'right arrow' for question navigation
		{
			if(window.GameVariables.IsPlayingFasestFinger == false && window.GameVariables.IsMoneyTreeShowing == false && window.GameVariables.IsExplainingRules == false && window.GameVariables.IsInCommercial == false && window.GameVariables.IsNameStrapShowing == false && window.GameVariables.IsTotalPrizeMoneyShowing == false){
				if(window.GameVariables.QuestionSequenceCounter == -1){
					return;
				}			
				else if(window.GameVariables.QuestionSequenceCounter == 0){
					// play lights down sound
					playLightsDownSound();
					
				}
			else if(window.GameVariables.QuestionSequenceCounter == 1){
					setQuestion(false);
					window.GameVariables.QuestionInProgress = true;
					// setup question and answers
					$('.answerGroupBDiv').transition({perspective:4096, 'bottom':'-331px'}, 0);
					$('.answerGroupADiv').transition({perspective:4096, 'bottom':'-256px'}, 0);
					$('.questionStrapDiv').transition({perspective:4096, 'bottom':'-192px', 'rotateX':'0deg'}, 0);
					revealQuestionAndAnswerStraps();
					playBackgroundSound();
					$('.questionStrapDiv').transition({perspective:4096, 'bottom':'62px'}, 700, 'cubic-bezier(0.5, 2, 0.5, 1)');
				}
				else if(window.GameVariables.QuestionSequenceCounter == 2){
					$('.questionStrapDiv').transition({perspective:4096, 'bottom':'229px'}, 250, 'linear', function(){
						$('.questionStrapDiv').transition({perspective:4096, 'bottom':'220px'}, 375, 'linear');
					});
					setTimeout(function(){
						$('.answerGroupADiv').transition({perspective:4096, 'bottom':'0px'}, 500, 'cubic-bezier(0.5, 1.35, 0.5, 1)');
					}, 0);
					setTimeout(function(){
						$('.answerGroupBDiv').transition({perspective:4096, 'bottom':'0px'}, 500, 'cubic-bezier(0.5, 1.25, 0.5, 1)');
					}, 50);
				}
				else if(window.GameVariables.QuestionSequenceCounter <= 6){
					revealAnswersOneByOne();
					
					if(window.GameVariables.QuestionSequenceCounter == 6){
						window.GameVariables.QuestionSequenceCounter = -1;
						return;
					}
				}
				else if(window.GameVariables.QuestionSequenceCounter == 7){
					if(window.GameVariables.CurrentCorrectAnswer == window.GameVariables.CurrentTargetAnswer){
						showFinalToCorrectAnswerStep1(window.GameVariables.CurrentTargetAnswer.toUpperCase());
						playCorrectAnswerSound();
					}
					else if(window.GameVariables.CurrentTargetAnswer != window.GameVariables.CurrentCorrectAnswer){
						revealNormalToCorrectAnswerStep1(window.GameVariables.CurrentCorrectAnswer.toUpperCase());
						window.GameVariables.QuestionSequenceCounter = 9;
						playWrongAnswerSound();
					}
					
					hideLifeLineCentered();
					
					if(window.GameVariables.IsLevelStrapShowing == true){
						hideLevelStrap();
						window.GameVariables.IsLevelStrapShowing = false;
					}
				}
				else if(window.GameVariables.QuestionSequenceCounter == 8){
					if(window.GameVariables.QuestionLevel == 15){
						$('.answerGroupBDiv').transition({perspective:4096, 'bottom':'-390px'}, 375, 'linear');
						$('.answerGroupADiv').transition({perspective:4096, 'bottom':'-390px'}, 375, 'linear');
						$('.questionStrapDiv').transition({perspective:4096, 'bottom':'-170px'}, 375, 'linear', function(){
							showMillionaireTitleStrap();
						});
					}
					else{
						$('.winStrapDiv').transition({perspective:4096, 'bottom':'162px', 'rotateX':'90deg'}, 0);
						$('.answerGroupBDiv').transition({perspective:4096, 'bottom':'-240px'}, 375, 'ease-in');
						$('.answerGroupADiv').transition({perspective:4096, 'bottom':'-240px'}, 375, 'ease-in');
						$('.questionStrapDiv').transition({perspective:4096, 'bottom':'162px', 'rotateX':'-90deg'}, 200, 'ease-in', function(){
							$('.winStrapDiv').transition({perspective:4096, 'bottom':'90px', 'rotateX':'0deg'}, 300, 'ease-out', function(){
								hideQuestionAndAnswerStraps();
								resetAnswerStraps();
							});
						});
						showAmountWon();
					}
				}
				else if(window.GameVariables.QuestionSequenceCounter == 9){
					if(window.GameVariables.QuestionLevel == 15){
						hideMillionaireTitleStrap();
						window.GameVariables.IsWalkingAway = true;
					}
					else {
						$('.winStrapDiv').transition({perspective:4096, 'bottom':'-300px','rotateX':'110deg'}, 450, 'ease-in', function(){
							hideAmountWon();
						});
					}
					
					window.GameVariables.QuestionLevel++;
					setLevelOnMoneyTree(window.GameVariables.QuestionLevel);
					
					window.GameVariables.QuestionInProgress = false;
					
					if(window.GameVariables.QuestionLevel < 6){
						window.GameVariables.QuestionSequenceCounter = 0;
					}
					else{
						window.GameVariables.QuestionSequenceCounter = -1;
					}
					/* END OF CORRECT ANSWER GIVEN CONTROL */
				}
				else if(window.GameVariables.QuestionSequenceCounter == 10){
					/* START OF WRONG ANSWER GIVEN CONTROL */
					reduceAmountWon();
					$('.answerGroupBDiv').transition({perspective:4096, 'bottom':'-390px'}, 375, 'linear');
					$('.answerGroupADiv').transition({perspective:4096, 'bottom':'-390px'}, 375, 'linear');
					$('.questionStrapDiv').transition({perspective:4096, 'bottom':'-170px'}, 375, 'linear', function(){
						hideQuestionAndAnswerStraps();
					});
					window.GameVariables.QuestionInProgress = false;
					window.GameVariables.IsWalkingAway = true;
					window.GameVariables.QuestionSequenceCounter = 0;
				}
				
				window.GameVariables.QuestionSequenceCounter++;
			}
		}
		else if(e.keyCode == 40) // key 'down arrow' for total prize money
		{
			if(window.GameVariables.QuestionInProgress == false && window.GameVariables.IsMoneyTreeShowing == false  && window.GameVariables.IsNameStrapShowing == false){
				if(window.GameVariables.QuestionLevel - 1 == 15){
					window.GameVariables.IsTotalPrizeMoneyShowing == true ? hideMillionaireTitleStrap() : showMillionaireTitleStrap();
				}
				else{
					window.GameVariables.IsTotalPrizeMoneyShowing == true ? hideTotalPrizeMoneyStrap() : showTotalPrizeMoneyStrap();
				}
				
				window.GameVariables.IsTotalPrizeMoneyShowing = !window.GameVariables.IsTotalPrizeMoneyShowing;
				
				if(window.GameVariables.IsWalkingAway == true){
					window.GameVariables.QuestionLevel > 10 == true ? startGeneralSound("walk_away_large.mp3") : startGeneralSound("walk_away_small.mp3");
					window.GameVariables.IsWalkingAway = false;
				}
				
			}
		}
		else if(e.keyCode == 49) // key '1' to lock in 'A' as final
		{
			if(window.GameVariables.QuestionInProgress == true && window.GameVariables.CannotLockInFinalAnswer == false && window.GameVariables.AnswerAIsOut == false && window.GameVariables.CurrentTargetAnswer == "" && window.GameVariables.QuestionSequenceCounter == -1){
				lockInFinalAnswer('A');
				window.GameVariables.CurrentTargetAnswer = "a";
				
				if(window.GameVariables.IsWalkingAway == false){
					playFinalAnswerSound();
				}
			}
		}
		else if(e.keyCode == 50) // key '2' to lock in 'B' as final
		{
			if(window.GameVariables.QuestionInProgress == true && window.GameVariables.CannotLockInFinalAnswer == false && window.GameVariables.AnswerBIsOut == false && window.GameVariables.CurrentTargetAnswer == "" && window.GameVariables.QuestionSequenceCounter == -1){
				lockInFinalAnswer('B');
				window.GameVariables.CurrentTargetAnswer = "b";
				
				if(window.GameVariables.IsWalkingAway == false){
					playFinalAnswerSound();
				}
			}
		}
		else if(e.keyCode == 51) // key '3' to lock in 'C' as final
		{
			if(window.GameVariables.QuestionInProgress == true && window.GameVariables.CannotLockInFinalAnswer == false && window.GameVariables.AnswerCIsOut == false && window.GameVariables.CurrentTargetAnswer == "" && window.GameVariables.QuestionSequenceCounter == -1){
				lockInFinalAnswer('C');
				window.GameVariables.CurrentTargetAnswer = "c";
				
				if(window.GameVariables.IsWalkingAway == false){
					playFinalAnswerSound();
				}
			}
		}
		else if(e.keyCode == 52) // key '4' to lock in 'D' as final
		{
			if(window.GameVariables.QuestionInProgress == true && window.GameVariables.CannotLockInFinalAnswer == false && window.GameVariables.AnswerDIsOut == false && window.GameVariables.CurrentTargetAnswer == "" && window.GameVariables.QuestionSequenceCounter == -1){
				lockInFinalAnswer('D');
				window.GameVariables.CurrentTargetAnswer = "d";
				
				if(window.GameVariables.IsWalkingAway == false){
					playFinalAnswerSound();
				}
			}
		}
		else if(e.keyCode == 53) // key '4' to lock in 'D' as final
		{
		        showSafetyNetOnMoneyTree(5);
				startGeneralSound("lifeline_0_on.mp3");
		}
		else if(e.keyCode == 54) // key '4' to lock in 'D' as final
		{
		        showSafetyNetOnMoneyTree(10);
				startGeneralSound("lifeline_1_on.mp3");
		}
		else if(e.keyCode == 65) // key 'a' for ask the audience animations
		{
			if(window.GameVariables.IsMoneyTreeShowing == true){
				if(window.GameVariables.IsATALifeLineUsed == false){
					ataPulseLifeLine();
					startGeneralSound("lifeline_3_on.mp3");
				}
			}
			else if(window.GameVariables.QuestionInProgress == true){
				if(window.GameVariables.ataLifeLineSequenceCounter == 0){
					// play ata start sound
					window.GameVariables.CannotLockInFinalAnswer = true;
					startLifelineActiveSound("ata_start.mp3");
					window.isMasterController = false;
					setTimeout(stopLongPassiveSound, 200);
					window.GameVariables.FirstTierBackgroundSoundPlaying = false;
				}
				else if(window.GameVariables.ataLifeLineSequenceCounter == 1){
				}
				else if(window.GameVariables.ataLifeLineSequenceCounter == 2){
					// play ata vote sound
					generateGraphPercentanges();
					slideInATAGraph();
					startLifelinePassiveSound("ata_vote.mp3");
					setTimeout(stopLifelineActiveSound, 200);
				}
				else if(window.GameVariables.ataLifeLineSequenceCounter == 3){
					// play ata stop vote sound
					revealGraphPercentages();
					startLifelineActiveSound("ata_end.mp3");
                    stopAllRandomHeightsAndReveal();
					setTimeout(stopLifelinePassiveSound, 200);
					setTimeout(function(){
						playBackgroundSound();
					}, 400);
				}
				else if(window.GameVariables.ataLifeLineSequenceCounter == 4){
					slideOutATAGraph();
					ataLifeLineDisable();
					window.GameVariables.CannotLockInFinalAnswer = false;
					window.GameVariables.ataLifeLineSequenceCounter = -1;
				}
				
				window.GameVariables.ataLifeLineSequenceCounter++;
			}
		}
		else if(e.keyCode == 67) // key 'c' for commerical in/out
		{
			if(window.GameVariables.IsMoneyTreeShowing == false){
				if(window.GameVariables.QuestionInProgress == false){
					if(window.GameVariables.IsInCommercial == true){
						hideMillionaireLogo();
						if(window.GameVariables.IsFirstQuestionOfGame == false){
							startShortActiveSound("commercial_out.mp3");
						}
						else{
							startShortActiveSound("hello_long.mp3");
							    try {
        // If enterHotSeat() exists in this window (same page)
        if (typeof enterHotSeat === 'function') {
            enterHotSeat();
        }
    } catch(e) {
        console.warn('enterHotSeat() call failed:', e);
    }

    // --- Notify video/logo page if it’s separate ---
    try {
        const payload = JSON.stringify({ action: 'enterHotSeat', ts: Date.now() });
        localStorage.setItem('videoWallEvent', payload);
    } catch (err) {
        console.warn('Could not send enterHotSeat event to video wall', err);
    }
						}
					}
					else{
						showMillionaireLogo();
						window.GameVariables.FirstTierBackgroundSoundPlaying = false;
						setTimeout(stopLongPassiveSound, 250);
						setTimeout(stopLongActiveSound, 250);
						startShortActiveSound("commercial_in.mp3");
					}
					
					window.GameVariables.IsInCommercial = !window.GameVariables.IsInCommercial;
				}
				else if(window.GameVariables.QuestionInProgress == true){
					if(window.GameVariables.commericalSequenceCounter == 0){
						hideQuestionAndAnswerStraps();
						$('.currentLevelStrapDiv').css('opacity', 0);
						window.GameVariables.CannotLockInFinalAnswer = true;
					}
					else if(window.GameVariables.commericalSequenceCounter == 1){
						showMillionaireLogo();
						window.GameVariables.FirstTierBackgroundSoundPlaying = false;
						setTimeout(stopLongPassiveSound, 250);
						setTimeout(stopLongActiveSound, 250);
						startShortActiveSound("commercial_in.mp3");
					}
					else if(window.GameVariables.commericalSequenceCounter == 2){
						hideMillionaireLogo();
						startShortActiveSound("commercial_out.mp3");
					}
					else if(window.GameVariables.commericalSequenceCounter == 3){
						revealQuestionAndAnswerStraps();
						$('.currentLevelStrapDiv').css('opacity', 1);
						window.GameVariables.CannotLockInFinalAnswer = false;
						if(window.GameVariables.QuestionSequenceCounter == -1){
							playBackgroundSound();
						}
						else if(window.GameVariables.QuestionSequenceCounter == 6){
							if(window.GameVariables.QuestionLevel > 5){
								playFinalAnswerSound();
							}
							else{
								playBackgroundSound();
							}
						}
						window.GameVariables.commericalSequenceCounter = -1;
					}
					
					window.GameVariables.commericalSequenceCounter++;
				}
			}
		}
		else if(e.keyCode == 69) // key 'e' for explain rules sound
		{
			if(window.GameVariables.QuestionInProgress == false && window.GameVariables.IsInCommercial == false)
			{
				if(window.GameVariables.QuestionLevel < 8){
					startLongPassiveSound("explain_rules.mp3");
				}
				else{
					startLongPassiveSound("explain_rules_v2.mp3");
				}
			}
		}
		else if(e.keyCode == 70) // key 'f' for fifty-fifty
{
    if (window.GameVariables.IsMoneyTreeShowing == true){
        if(window.GameVariables.IsFFLifeLineUsed == false){
            ffPulseLifeLine();
            startGeneralSound("lifeline_1_on.mp3");
        }
    }
    else if(window.GameVariables.QuestionInProgress == true){
ffLifeLineDisable();
        // Only master executes ffRemoveTwoWrongAnswers()
        if (window.isMasterController) {
            if(!window.GameVariables.AnswerAIsOut && 
               !window.GameVariables.AnswerBIsOut &&
               !window.GameVariables.AnswerCIsOut && 
               !window.GameVariables.AnswerDIsOut)
            {
                const removed = ffRemoveTwoWrongAnswers();   // <— returns the removed letters
                startLifelineActiveSound("fifty_fifty.mp3");

                // Broadcast removed answers to all controllers
                localStorage.setItem("FF_RESULT", JSON.stringify({
                    removed: removed,
                    ts: Date.now()
                }));
            }
        }
        // Slaves do nothing here — they will update via localStorage event
    }
}
else if(e.keyCode == 82) // key 'r' for fifty-fifty enable
		{
		if(window.GameVariables.IsMoneyTreeShowing == true){
					ffPulseLifeLine();
					ffLifeLineEnable();
					startGeneralSound("fastest_finger_reveal_times.mp3");
			}
		}
		else if(e.keyCode == 84) // key 't' for paf enable
		{
		if(window.GameVariables.IsMoneyTreeShowing == true){
					pafLifeLineEnable();
					startGeneralSound("fastest_finger_reveal_times.mp3");
			}
		}
		else if(e.keyCode == 89) // key 'y' for ata enable
		{
		if(window.GameVariables.IsMoneyTreeShowing == true){
					ataPulseLifeLine();
					ataLifeLineEnable();
					startGeneralSound("fastest_finger_reveal_times.mp3");
			}
		}
		else if(e.keyCode == 73) // key 'i' for ath enable
		{
		if(window.GameVariables.IsMoneyTreeShowing == true){
					stqPulseLifeLine();
					stqLifeLineEnable();
					startGeneralSound("fastest_finger_reveal_times.mp3");
			}
		}
		else if(e.keyCode == 71) // key 'g' for game over / reset
		{
			hideMillionaireLogo();
			if(typeof hidebreaktext === 'function') hidebreaktext();
			window.GameVariables.IsInCommercial = false;
			window.GameVariables.QuestionInProgress = true;
			window.GameVariables.QuestionLevel = 1;
			if(typeof setStartingQuestionLevel === 'function') setStartingQuestionLevel(1);
			if(typeof setLevelOnMoneyTree === 'function') setLevelOnMoneyTree(1);
			if(typeof setQuestion === 'function') setQuestion(false);
			if(typeof resetAnswerStraps === 'function') resetAnswerStraps();
			if(typeof revealQuestionAndAnswerStraps === 'function') revealQuestionAndAnswerStraps();
			if(typeof revealQuestionAndAnswer1Straps === 'function') revealQuestionAndAnswer1Straps();
			if(typeof revealAllAnswersAtOnce === 'function') revealAllAnswersAtOnce();

			startGeneralSound("game_over.mp3");
			setTimeout(stopLongPassiveSound, 500);
			setTimeout(stopLifelineActiveSound, 500);
			window.GameVariables.QuestionSequenceCounter = 0;
			window.GameVariables.MoneyTreeSequenceCounter = 0;
			window.GameVariables.IsFirstQuestionOfGame = true;
			
			$('.moneyTreeDiv, .moneyTree1Div').css({'opacity': 0, 'right': '-760px'}).transition({perspective:0, opacity:0, right:"-760px"}, 1);
			$('.logoContainerDiv').css({'opacity': 0, 'display': 'none', 'pointer-events': 'none'});
		}
		else if(e.keyCode == 76) // key 'l' for life line strap animations
		{
			if(window.GameVariables.QuestionInProgress == true){
				window.GameVariables.IsLifeLineStrapShowing == true ? slideLifeLineStrapOut() : slideLifeLineStrapIn();
				window.GameVariables.IsLifeLineStrapShowing = !window.GameVariables.IsLifeLineStrapShowing
			}
		}
		else if(e.keyCode == 77) // key 'm' for money level amount strap animations
		{
			if(window.GameVariables.QuestionInProgress == true){
				window.GameVariables.IsLevelStrapShowing == true ? hideLevelStrap() : showLevelStrap();
				window.GameVariables.IsLevelStrapShowing = !window.GameVariables.IsLevelStrapShowing;
			}
		}
		else if(e.keyCode == 78) // key 'n' for name strap animations
		{
			if(window.GameVariables.QuestionInProgress == false && window.GameVariables.IsInCommercial == false && window.GameVariables.IsMoneyTreeShowing == false && window.GameVariables.IsTotalPrizeMoneyShowing == false){
				window.GameVariables.IsNameStrapShowing == true ? hideNameStrap() : showNameStrap();
				window.GameVariables.IsNameStrapShowing = !window.GameVariables.IsNameStrapShowing;
			}
		}
		else if(e.keyCode == 80) // key 'p' for phone a friend animations
		{
			if(window.GameVariables.IsMoneyTreeShowing == true){
				if(window.GameVariables.IsPAFLifeLineUsed == false){
					pafPulseLifeLine();
					startGeneralSound("lifeline_2_on.mp3");
				}
			}
			else if(window.GameVariables.QuestionInProgress == true){
				if(window.GameVariables.pafLifeLineSequenceCounter == 0){
					startLifelineActiveSound("paf_start.mp3");
					//setTimeout(stopLongPassiveSound, 200);
					fadeOutLongPassiveSound(1);
					window.GameVariables.CannotLockInFinalAnswer = true;
					window.GameVariables.FirstTierBackgroundSoundPlaying = false;
				}
				else if(window.GameVariables.pafLifeLineSequenceCounter == 1){
					hideQuestionAndAnswerStraps();
					$('.currentLevelStrapDiv').css('opacity', 0);

					if(window.GameVariables.ShowLifeLineCenteredAnimation == true){
						hideJustLifeLineCenteredContainer();
					}
				}
				else if(window.GameVariables.pafLifeLineSequenceCounter == 2){
					revealQuestionAndAnswerStraps();
					$('.currentLevelStrapDiv').css('opacity', 1);
					pafRevealClock();
					
					if(window.GameVariables.ShowLifeLineCenteredAnimation == true){
						showJustLifeLineCenteredContainer();
					}
				}
				else if(window.GameVariables.pafLifeLineSequenceCounter == 3){
					pafEndClockEarly();
					setTimeout(stopLifelinePassiveSound, 200);
				}
				
				window.GameVariables.pafLifeLineSequenceCounter++;
			}
		}
		else if(e.keyCode == 79) // key 'o' for Opening music
		{
			startShortActiveSound("main_theme.mp3");
		}
		else if(e.keyCode == 81) // key 'q' for game resume
		{
			if(window.GameVariables.QuestionInProgress == false){
				startLongPassiveSound("game_resume.mp3");
			}
		}
		else if(e.keyCode == 83) // key 's' for switch the question animations
		{
			if(window.GameVariables.IsMoneyTreeShowing == true){
				if(window.GameVariables.QuestionLevel <= window.GameVariables.STQUnlockedLevel){
					if(window.GameVariables.LifeLineAnimationCounter == 0){
						setLevelOnMoneyTree(window.GameVariables.STQUnlockedLevel);
						window.GameVariables.IsSTQActive = true;
					}
					else if(window.GameVariables.LifeLineAnimationCounter == 1){
						stqLifeLineSlideIn();
					}
					else if(window.GameVariables.LifeLineAnimationCounter == 2){
						stqPulseLifeLine();
						startGeneralSound("lifeline_4_on.mp3");
						window.GameVariables.LifeLineAnimationCounter = -1;
					}
					
					window.GameVariables.LifeLineAnimationCounter++;
				}
				else if(window.GameVariables.IsSTQLifeLineUsed == false) {
					stqPulseLifeLine();
					startGeneralSound("lifeline_4_on.mp3");
				}
			}
			else if(window.GameVariables.QuestionInProgress == true){
				if(window.GameVariables.stqLifeLineSequenceCounter == 0){
					showLifeLineCentered('#stqLifeLineCenterImg');
					startLifelineActiveSound("ath.mp3");
					setTimeout(stopLongPassiveSound, 200);
					window.GameVariables.FirstTierBackgroundSoundPlaying = false;
					window.GameVariables.CannotLockInFinalAnswer = true;
				}
				else if(window.GameVariables.stqLifeLineSequenceCounter == 1){
					startLifelinePassiveSound("ath_end.mp3");
					stqLifeLineDisable();
					setTimeout(stopLifelineActiveSound, 100);
					setTimeout(function(){
						playBackgroundSound();
					}, 1000);
					window.GameVariables.CannotLockInFinalAnswer = false;
					window.GameVariables.stqLifeLineSequenceCounter = -1;
					hideLifeLineCentered();
				}
				
				window.GameVariables.stqLifeLineSequenceCounter++;
			}			
		}
		else if(e.keyCode == 85) // key 'u' for undo final answer / restart question
		{
			if(window.GameVariables.QuestionSequenceCounter == 7 || window.GameVariables.IsWalkingAway == true){
				undoFinaledAnswer();
				setTimeout(stopLongActiveSound, 200);
				window.GameVariables.IsWalkingAway = false;
				window.GameVariables.walkAwaySequenceCounter = 0;
				window.GameVariables.QuestionSequenceCounter = -1;
			}
			
			if(window.GameVariables.QuestionInProgress){
				playBackgroundSound();
			}
		}
		else if(e.keyCode == 87) // key 'w' for walk away
		{
			if(window.GameVariables.QuestionInProgress == true){
				if(window.GameVariables.walkAwaySequenceCounter == 0){
					window.GameVariables.QuestionLevel > 10 == true ? startShortActiveSound("quit_large.mp3") : startShortActiveSound("quit_small.mp3");
					setTimeout(stopLongPassiveSound, 200);
					broadcastTierChange('general_int','bg1');
					window.GameVariables.IsWalkingAway = true;
				}
				else if(window.GameVariables.walkAwaySequenceCounter == 1){
					startGeneralSound("2drumhits.mp3");
					if(window.GameVariables.CurrentTargetAnswer == "" || (window.GameVariables.CurrentTargetAnswer != window.GameVariables.CurrentCorrectAnswer)){
						revealNormalToCorrectAnswerStep1(window.GameVariables.CurrentCorrectAnswer.toUpperCase());
					}
					else if(window.GameVariables.CurrentTargetAnswer == window.GameVariables.CurrentCorrectAnswer){
						showFinalToCorrectAnswerStep1(window.GameVariables.CurrentCorrectAnswer.toUpperCase());
					}
					
					hideLifeLineCentered();
					
					if(window.GameVariables.IsLevelStrapShowing == true){
						hideLevelStrap();
						window.GameVariables.IsLevelStrapShowing = false;
					}
				}
				else if(window.GameVariables.walkAwaySequenceCounter == 2){
					$('.answerGroupBDiv').transition({perspective:4096, 'bottom':'-390px'}, 375, 'linear');
					$('.answerGroupADiv').transition({perspective:4096, 'bottom':'-390px'}, 375, 'linear');
					$('.questionStrapDiv').transition({perspective:4096, 'bottom':'-170px'}, 375, 'linear', function(){
						hideQuestionAndAnswerStraps();
					});
					window.GameVariables.QuestionInProgress = false;
					window.GameVariables.walkAwaySequenceCounter = -1;
				}
				
				window.GameVariables.walkAwaySequenceCounter++;
			}
	}
	else if(e.keyCode == 88) // key 'x' to stop audio
	{
		stopLongActiveSound();
		stopLongPassiveSound();
		stopShortActiveSound();
		stopShortPassiveSound();
		stopLifelineActiveSound();
		stopLifelinePassiveSound();
		if(window.GameVariables && window.GameVariables.GeneralSound){
			window.GameVariables.GeneralSound.pause();
		}
	}
}

