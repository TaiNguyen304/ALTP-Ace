/****************************************************************************************************************/
/* Phone a Friend Life Line Functions */
/****************************************************************************************************************/
function pafPulseLifeLine(){
	$('.pafLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.pafLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.pafLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.pafLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.pafStrapLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.pafStrapLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.pafStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.pafStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
}

function pafLifeLineDisable(){
	$('.pafLifeLine .lifelineUsedImg').css('opacity', 1);
	$('.pafLifeLine .lifelineTreeImg').css('opacity', 1);
	$('.pafStrapLifeLine .lifelineUsedStrapImg').css('opacity', 1);
	$('.pafStrapLifeLine .lifelineStrapImg').css('opacity', 1);
}

function pafAnimateAtom(){
	$('.pafAtomDiv').transition({perspective:0, 'rotate':'360deg'}, 100000, 'linear', function(){
		$('.pafAtomDiv').transition({perspective:0, 'rotate':'0deg'}, 0, 'linear');
		pafAnimateAtom();
	});
}

function pafRevealClock(){
	$('#pafBarTimer0Img').css('opacity', 0);
	$('#pafBarTimer1Img').css('opacity', 0);
	$('#pafBarTimer2Img').css('opacity', 0);
	$('#pafBarTimer3Img').css('opacity', 0);
	$('#pafBarTimer4Img').css('opacity', 0);
	$('#pafBarTimer5Img').css('opacity', 0);
	$('#pafBarTimer6Img').css('opacity', 0);
	$('#pafBarTimer7Img').css('opacity', 0);
	$('#pafBarTimer8Img').css('opacity', 0);
	$('#pafBarTimer9Img').css('opacity', 0);
	$('#pafBarTimer10Img').css('opacity', 0);
	$('#pafBarTimer11Img').css('opacity', 0);
	$('#pafBarTimer12Img').css('opacity', 0);
	$('#pafBarTimer13Img').css('opacity', 0);
	$('#pafBarTimer14Img').css('opacity', 0);
	$('#pafBarTimer15Img').css('opacity', 0);
	$('#pafBarTimer16Img').css('opacity', 0);
	$('#pafBarTimer17Img').css('opacity', 0);
	$('#pafBarTimer18Img').css('opacity', 0);
	$('#pafBarTimer19Img').css('opacity', 0);
	$('#pafBarTimer20Img').css('opacity', 0);
	$('#pafBarTimer21Img').css('opacity', 0);
	$('#pafBarTimer22Img').css('opacity', 0);
	$('#pafBarTimer23Img').css('opacity', 0);
	$('#pafBarTimer24Img').css('opacity', 0);
	$('#pafBarTimer25Img').css('opacity', 0);
	$('#pafBarTimer26Img').css('opacity', 0);
	$('#pafBarTimer27Img').css('opacity', 0);
	$('#pafBarTimer28Img').css('opacity', 0);
	$('#pafBarTimer29Img').css('opacity', 0);
	$('#pafBarTimer30Img').css('opacity', 1);
	pafAnimateAtom();
	$('.pafClockDiv').transition({perspective:0, right:'52px'}, 750, 'ease-out', function(){
		setTimeout(function(){
			pafCountDownClock(0);
			startLifelinePassiveSound("paf_countdown.mp3");
			setTimeout(stopLifelineActiveSound, 200);
		});
	});
}


function pafRevealClock1(){
	$('.pafClock1Div').css('opacity', 1);
	$('.pafClock1Div').transition({perspective:0, opacity:1}, 750, 'ease-out', function(){
		setTimeout(function(){
			pafCountDownClock(0);
			startLifelinePassiveSound("paf_countdown.mp3");
			setTimeout(stopLifelineActiveSound, 200);
		});
	});
}

function pafLifeLineEnable() {
    $('.pafLifeLine .lifelineUsedImg').css('opacity', 0);
    $('.pafLifeLine .lifelineTreeImg').css('opacity', 1);
    $('.pafStrapLifeLine .lifelineUsedStrapImg').css('opacity', 0);
    $('.pafStrapLifeLine .lifelineStrapImg').css('opacity', 1);
}
function ataLifeLineEnable() {
    $('.ataLifeLine .lifelineUsedImg').css('opacity', 0);
    $('.ataLifeLine .lifelineTreeImg').css('opacity', 1);
    $('.ataStrapLifeLine .lifelineUsedStrapImg').css('opacity', 0);
    $('.ataStrapLifeLine .lifelineStrapImg').css('opacity', 1);
}

function ffLifeLineEnable() {
    $('.ffLifeLine .lifelineUsedImg').css('opacity', 0);
    $('.ffLifeLine .lifelineTreeImg').css('opacity', 1);
    $('.ffStrapLifeLine .lifelineUsedStrapImg').css('opacity', 0);
    $('.ffStrapLifeLine .lifelineStrapImg').css('opacity', 1);
}

function stqLifeLineEnable() {
    $('.stqLifeLine .lifelineUsedImg').css('opacity', 0);
    $('.stqLifeLine .lifelineTreeImg').css('opacity', 1);
    $('.stqStrapLifeLine .lifelineUsedStrapImg').css('opacity', 0);
    $('.stqStrapLifeLine .lifelineStrapImg').css('opacity', 1);
}

function pafCountDownClock(timeConsumed){
	if(timeConsumed == 30){
		$('.pafClockTimeDiv>span').html(new Intl.NumberFormat('en', { numberingSystem: window.GameVariables.PaFNumberingSystem }).format(0));
	}
	else{
		$('.pafClockTimeDiv>span').html(new Intl.NumberFormat('en', { numberingSystem: window.GameVariables.PaFNumberingSystem }).format(30 - timeConsumed));
	}

	if(timeConsumed == 0){
		$('#pafBarTimer0Img').css('opacity', 0);
		$('#pafBarTimer1Img').css('opacity', 0);
		$('#pafBarTimer2Img').css('opacity', 0);
		$('#pafBarTimer3Img').css('opacity', 0);
		$('#pafBarTimer4Img').css('opacity', 0);
		$('#pafBarTimer5Img').css('opacity', 0);
		$('#pafBarTimer6Img').css('opacity', 0);
		$('#pafBarTimer7Img').css('opacity', 0);
		$('#pafBarTimer8Img').css('opacity', 0);
		$('#pafBarTimer9Img').css('opacity', 0);
		$('#pafBarTimer10Img').css('opacity', 0);
		$('#pafBarTimer11Img').css('opacity', 0);
		$('#pafBarTimer12Img').css('opacity', 0);
		$('#pafBarTimer13Img').css('opacity', 0);
		$('#pafBarTimer14Img').css('opacity', 0);
		$('#pafBarTimer15Img').css('opacity', 0);
		$('#pafBarTimer16Img').css('opacity', 0);
		$('#pafBarTimer17Img').css('opacity', 0);
		$('#pafBarTimer18Img').css('opacity', 0);
		$('#pafBarTimer19Img').css('opacity', 0);
		$('#pafBarTimer20Img').css('opacity', 0);
		$('#pafBarTimer21Img').css('opacity', 0);
		$('#pafBarTimer22Img').css('opacity', 0);
		$('#pafBarTimer23Img').css('opacity', 0);
		$('#pafBarTimer24Img').css('opacity', 0);
		$('#pafBarTimer25Img').css('opacity', 0);
		$('#pafBarTimer26Img').css('opacity', 0);
		$('#pafBarTimer27Img').css('opacity', 0);
		$('#pafBarTimer28Img').css('opacity', 0);
		$('#pafBarTimer29Img').css('opacity', 0);
		$('#pafBarTimer30Img').css('opacity', 1);
	}
	else if(1 <= timeConsumed <= 30){
		$('#pafBarTimer' + (31 - timeConsumed) + 'Img').css('opacity',0);
		if(timeConsumed != 30){
			$('#pafBarTimer' + (30 - timeConsumed) + 'Img').css('opacity',1);
		}
	}
	
	if(timeConsumed == 30){
		$('#pafBarTimer0Img').css('opacity', 1);
		window.GameVariables.PAFClockTimeout = setTimeout(pafHideClock, 250);
		window.GameVariables.PAFClockTimeout = setTimeout(pafHideClock1, 250);
	}
	else{
		window.GameVariables.PAFClockTimeout = setTimeout(function(){
			pafCountDownClock(timeConsumed + 1);
		}, 995);
	}
}

function pafEndClockEarly(){
	clearTimeout(window.GameVariables.PAFClockTimeout);
	pafHideClock();
	startLifelineActiveSound("paf_end_call_early.mp3");
}

function pafEndClockEarly1(){
	clearTimeout(window.GameVariables.PAFClockTimeout);
	pafHideClock1();
	startLifelineActiveSound("paf_end_call_early.mp3");
}

function pafHideClock(){
	$('.pafClockDiv').transition({perspective:0, right:'-400px'}, 750, 'ease-in', function(){
		$('.pafClockTimeDiv>span').html(new Intl.NumberFormat('en', { numberingSystem: window.GameVariables.PaFNumberingSystem }).format(30));
		$('#pafBarTimer0Img').css('opacity', 0);
		window.GameVariables.pafLifeLineSequenceCounter = 0;
		window.GameVariables.CannotLockInFinalAnswer = false;
		pafLifeLineDisable();
	});
	
	setTimeout(playBackgroundSound, 500);
}

function pafHideClock1(){
	$('.pafClock1Div').transition({perspective:0, opacity:1}, 500, 'ease-in', function(){
		$('.pafClockTimeDiv>span').html(new Intl.NumberFormat('en', { numberingSystem: window.GameVariables.PaFNumberingSystem }).format(30));
		$('.pafClock1Div').css('opacity', 0);
		$('.pafLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
		window.GameVariables.pafLifeLineSequenceCounter = 0;
		window.GameVariables.CannotLockInFinalAnswer = false;
		pafLifeLineDisable();
		broadcastOrbSpin('hide');
  localStorage.setItem("lifelineFlip", JSON.stringify({
    action: "hide",
    lifeline: "paf",
    time: Date.now()
  }));
	});
	
	setTimeout(playBackgroundSound, 500);
}

/****************************************************************************************************************/
/* Fifty-Fifty Life Line Functions */
/****************************************************************************************************************/

function ffPulseLifeLine(){
	$('.ffLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.ffLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.ffLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.ffLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.ffStrapLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.ffStrapLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.ffStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.ffStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
}

function ffLifeLineDisable(){
	$('.ffLifeLine .lifelineUsedImg').css('opacity', 1);
	$('.ffLifeLine .lifelineTreeImg').css('opacity', 1);
	$('.ffStrapLifeLine .lifelineUsedStrapImg').css('opacity', 1);
	$('.ffStrapLifeLine .lifelineStrapImg').css('opacity', 1);
}

function ffRemoveTwoWrongAnswers(){
    const removedLetters = [];
    const wrongAnswers = [];

    // Build list of wrong answers still available
    if(!window.GameVariables.AnswerAIsOut && window.GameVariables.CurrentCorrectAnswer != "a") wrongAnswers.push("A");
    if(!window.GameVariables.AnswerBIsOut && window.GameVariables.CurrentCorrectAnswer != "b") wrongAnswers.push("B");
    if(!window.GameVariables.AnswerCIsOut && window.GameVariables.CurrentCorrectAnswer != "c") wrongAnswers.push("C");
    if(!window.GameVariables.AnswerDIsOut && window.GameVariables.CurrentCorrectAnswer != "d") wrongAnswers.push("D");

    // Shuffle array
    wrongAnswers.sort(() => Math.random() - 0.5);

    // Pick first 2 wrong answers
    removedLetters.push(wrongAnswers[0], wrongAnswers[1]);

    // Hide them
    removedLetters.forEach(letter => removeAnswer(letter));

    return removedLetters; // return array ["B","D"]
}

// helper to hide an answer
function removeAnswer(letter){
    $('#answer' + letter + ' .letterP').css('opacity', 0);
    $('#answer' + letter + ' .answerP').css('opacity', 0);
    $('#answer' + letter + ' .diagonalImg').css('opacity', 0);
    window.GameVariables["Answer" + letter + "IsOut"] = true;
	startLifelineActiveSound("fifty_fifty.mp3");
	$('.ffLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.ffLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
}


// --- keyboard shortcut version ---
let selectedAnswers = []; 

$(document).on('keydown', function(e){
	switch(e.keyCode){
		case 186: // key "1"
			toggleSelected("A");
			break;
		case 188: // key "2"
			toggleSelected("B");
			break;
		case 190: // key "3"
			toggleSelected("C");
			break;
		case 191: // key "4"
			toggleSelected("D");
			break;
		case 70: // Enter
			if(selectedAnswers.length === 2){
				if(window.GameVariables.CurrentCorrectAnswer.toLowerCase() !== selectedAnswers[0].toLowerCase()){
					removeAnswer(selectedAnswers[0]);
				}
				if(window.GameVariables.CurrentCorrectAnswer.toLowerCase() !== selectedAnswers[1].toLowerCase()){
					removeAnswer(selectedAnswers[1]);
				}
				selectedAnswers = []; // reset
				startLifelineActiveSound("fifty_fifty.mp3");
				ffLifeLineDisable();
			}
			break;
	}
});

// toggle selection
function toggleSelected(letter){
	if(selectedAnswers.includes(letter)){
		selectedAnswers = selectedAnswers.filter(l => l !== letter);
	} else {
		if(selectedAnswers.length < 2){
			selectedAnswers.push(letter);
		}
	}
}


/****************************************************************************************************************/
/* Ask the Audience Life Line Functions */
/****************************************************************************************************************/

function ataPulseLifeLine(){
	$('.ataLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.ataLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.ataLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.ataLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.ataStrapLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.ataStrapLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.ataStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.ataStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
}

function ataLifeLineDisable(){
	$('.ataLifeLine .lifelineUsedImg').css('opacity', 1);
	$('.ataLifeLine .lifelineTreeImg').css('opacity', 1);
	$('.ataStrapLifeLine .lifelineUsedStrapImg').css('opacity', 1);
	$('.ataStrapLifeLine .lifelineStrapImg').css('opacity', 1);
}

function slideInATAGraph(){
	var barAHeight = 0 + "px";
	var barBHeight = 0 + "px";
	var barCHeight = 0 + "px";
	var barDHeight = 0 + "px";
	$('.letterATAP').transition({top:"280px"}, 0, 'linear');
	$('.ataGraphPercentDiv').transition({'opacity':0}, 0, 'linear');
	$('.ataGraphDiv').transition({perspective:0, opacity:"1"}, 0, 'linear');
	$('#graphBarA').transition({'height':'0px'}, 0);
	$('#graphBarB').transition({'height':'0px'}, 0);
	$('#graphBarC').transition({'height':'0px'}, 0);
	$('#graphBarD').transition({'height':'0px'}, 0);
	$('.ataGraphDiv').transition({perspective:1920, right:"220px", 'rotateY':'-90deg', scale:[0.4]}, 0, 'ease-out');
    $('.ataGraphDiv').transition({perspective:1920, right:"270px", 'rotateY':'0deg', scale:[1]}, 750, 'ease-out');
	/* LETTER SLIDE DOWN */
	setTimeout(function(){
		$('.letterATAP').transition({perspective:0, opacity:"1"}, 0, 'linear');
		$('.letterATAP').eq(0).transition({top:"330px"}, 300);
	}, 750);

	setTimeout(function(){
		$('.letterATAP').eq(1).transition({top:"330px"}, 300);
	}, 800);

	setTimeout(function(){
		$('.letterATAP').eq(2).transition({top:"330px"}, 300);
	}, 850);

	setTimeout(function(){
		$('.letterATAP').eq(3).transition({top:"330px"}, 300);
	}, 900);
	$('#graphBarA').transition({'height':'276px'}, 750, function(){
		$('#graphBarA').transition({'height':barAHeight}, 750);
	});
	setTimeout(function(){
		$('#graphBarB').transition({'height':'276px'}, 750, function(){
			$('#graphBarB').transition({'height':barBHeight}, 750);
		});
	}, 50);
	setTimeout(function(){
		$('#graphBarC').transition({'height':'276px'}, 750, function(){
			$('#graphBarC').transition({'height':barCHeight}, 750);
		});
	}, 100);
	setTimeout(function(){
		$('#graphBarD').transition({'height':'276px'}, 750, function(){
			$('#graphBarD').transition({'height':barDHeight}, 750);
		});
	}, 150);
	setTimeout(function(){
		startRandomHeights()
	}, 1000);
}

function generateGraphPercentanges(){
	var percentageOfDifficulty = (window.GameVariables.QuestionLevel - 1) * 5;
	var beDevious = (Math.random() * 100) > 90 ? true : false;

	if(window.GameVariables.AnswerAIsOut == true){
		window.GameVariables.AnswerAPercent = 0;
	}
	
	if(window.GameVariables.AnswerBIsOut == true){
		window.GameVariables.AnswerBPercent = 0;
	}
	
	if(window.GameVariables.AnswerCIsOut == true){
		window.GameVariables.AnswerCPercent = 0;
	}
	
	if(window.GameVariables.AnswerDIsOut == true){
		window.GameVariables.AnswerDPercent = 0;
	}
	
	if(beDevious != true){
		if(window.GameVariables.CurrentCorrectAnswer == "a" && window.GameVariables.AnswerAIsOut == false){
			window.GameVariables.AnswerAPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerBPercent = window.GameVariables.AnswerBIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerAPercent));
			window.GameVariables.AnswerCPercent = window.GameVariables.AnswerCIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerAPercent - window.GameVariables.AnswerBPercent));
			window.GameVariables.AnswerDPercent = window.GameVariables.AnswerDIsOut == true ? 0 : 100 - window.GameVariables.AnswerAPercent - window.GameVariables.AnswerBPercent  - window.GameVariables.AnswerCPercent;
		}
		
		if(window.GameVariables.CurrentCorrectAnswer == "b" && window.GameVariables.AnswerBIsOut == false){
			window.GameVariables.AnswerBPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerCPercent = window.GameVariables.AnswerCIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerBPercent));
			window.GameVariables.AnswerDPercent = window.GameVariables.AnswerDIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerBPercent - window.GameVariables.AnswerCPercent));
			window.GameVariables.AnswerAPercent = window.GameVariables.AnswerAIsOut == true ? 0 : 100 - window.GameVariables.AnswerBPercent - window.GameVariables.AnswerCPercent  - window.GameVariables.AnswerDPercent;
		}
		
		if(window.GameVariables.CurrentCorrectAnswer == "c" && window.GameVariables.AnswerCIsOut == false){
			window.GameVariables.AnswerCPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerDPercent = window.GameVariables.AnswerDIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerCPercent));
			window.GameVariables.AnswerAPercent = window.GameVariables.AnswerAIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerCPercent - window.GameVariables.AnswerDPercent));
			window.GameVariables.AnswerBPercent = window.GameVariables.AnswerBIsOut == true ? 0 : 100 - window.GameVariables.AnswerCPercent - window.GameVariables.AnswerDPercent  - window.GameVariables.AnswerAPercent;
		}
		
		if(window.GameVariables.CurrentCorrectAnswer == "d" && window.GameVariables.AnswerDIsOut == false){
			window.GameVariables.AnswerDPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerAPercent = window.GameVariables.AnswerAIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerDPercent));
			window.GameVariables.AnswerBPercent = window.GameVariables.AnswerBIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerDPercent - window.GameVariables.AnswerAPercent));
			window.GameVariables.AnswerCPercent = window.GameVariables.AnswerCIsOut == true ? 0 : 100 - window.GameVariables.AnswerDPercent - window.GameVariables.AnswerAPercent  - window.GameVariables.AnswerBPercent;
		}
	}
	else{
		if(window.GameVariables.AnswerAIsOut == false){
			window.GameVariables.AnswerAPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerBPercent = window.GameVariables.AnswerBIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerAPercent));
			window.GameVariables.AnswerCPercent = window.GameVariables.AnswerCIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerAPercent - window.GameVariables.AnswerBPercent));
			window.GameVariables.AnswerDPercent = window.GameVariables.AnswerDIsOut == true ? 0 : 100 - window.GameVariables.AnswerAPercent - window.GameVariables.AnswerBPercent  - window.GameVariables.AnswerCPercent;
		}
		
		if(window.GameVariables.AnswerBIsOut == false){
			window.GameVariables.AnswerBPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerCPercent = window.GameVariables.AnswerCIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerBPercent));
			window.GameVariables.AnswerDPercent = window.GameVariables.AnswerDIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerBPercent - window.GameVariables.AnswerCPercent));
			window.GameVariables.AnswerAPercent = window.GameVariables.AnswerAIsOut == true ? 0 : 100 - window.GameVariables.AnswerBPercent - window.GameVariables.AnswerCPercent  - window.GameVariables.AnswerDPercent;
		}
		
		if(window.GameVariables.AnswerCIsOut == false){
			window.GameVariables.AnswerCPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerDPercent = window.GameVariables.AnswerDIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerCPercent));
			window.GameVariables.AnswerAPercent = window.GameVariables.AnswerAIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerCPercent - window.GameVariables.AnswerDPercent));
			window.GameVariables.AnswerBPercent = window.GameVariables.AnswerBIsOut == true ? 0 : 100 - window.GameVariables.AnswerCPercent - window.GameVariables.AnswerDPercent  - window.GameVariables.AnswerAPercent;
		}
		
		if(window.GameVariables.AnswerDIsOut == false){
			window.GameVariables.AnswerDPercent = Math.ceil(Math.random() * ((100 - (percentageOfDifficulty / 1.5)) - (95 - percentageOfDifficulty)) + (95 - percentageOfDifficulty));
			window.GameVariables.AnswerAPercent = window.GameVariables.AnswerAIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerDPercent));
			window.GameVariables.AnswerBPercent = window.GameVariables.AnswerBIsOut == true ? 0 : Math.ceil(Math.random() * (100 - window.GameVariables.AnswerDPercent - window.GameVariables.AnswerAPercent));
			window.GameVariables.AnswerCPercent = window.GameVariables.AnswerCIsOut == true ? 0 : 100 - window.GameVariables.AnswerDPercent - window.GameVariables.AnswerAPercent  - window.GameVariables.AnswerBPercent;
		}
	}
	
	var sumOfAllPercents = window.GameVariables.AnswerAPercent + window.GameVariables.AnswerBPercent + window.GameVariables.AnswerCPercent + window.GameVariables.AnswerDPercent;
		
	if(sumOfAllPercents < 100){
		if(window.GameVariables.CurrentCorrectAnswer == "a" && window.GameVariables.AnswerAIsOut == false){
			window.GameVariables.AnswerAPercent += 100 - sumOfAllPercents;
		}
		
		if(window.GameVariables.CurrentCorrectAnswer == "b" && window.GameVariables.AnswerBIsOut == false){
			window.GameVariables.AnswerBPercent += 100 - sumOfAllPercents;
		}
		
		if(window.GameVariables.CurrentCorrectAnswer == "c" && window.GameVariables.AnswerCIsOut == false){
			window.GameVariables.AnswerCPercent += 100 - sumOfAllPercents;
		}
		
		if(window.GameVariables.CurrentCorrectAnswer == "d" && window.GameVariables.AnswerDIsOut == false){
			window.GameVariables.AnswerDPercent += 100 - sumOfAllPercents;
		}
	}
}

let graphIntervals = {}; // store interval IDs

function animateRandomHeights(barId, delay) {
    setTimeout(function () {
        // Start with bar hidden at 0 height
        $('#' + barId).css('height', '0px');

        // Pick first random height
        let firstHeight = Math.floor(Math.random() * 226) + 50;

        // Animate instantly into the first random height
        $('#' + barId).transition({ 'height': firstHeight + 'px' }, 600, 'easeOutCubic');

        // After that, keep randomizing every 0.5s
        graphIntervals[barId] = setInterval(function () {
            let randomHeight = Math.floor(Math.random() * 226) + 50;
            $('#' + barId).transition({ 'height': randomHeight + 'px' }, 500, 'linear');
        }, 500);
    }, delay);
}



function stopAllRandomHeightsAndReveal() {
    // stop random intervals instantly
    for (let id in graphIntervals) {
        clearInterval(graphIntervals[id]);
        // also stop any queued transitions immediately
        $('#' + id).stop(true, true);
    }
    graphIntervals = {};

    // now run the reveal instantly
    revealGraphPercentages();
}

// start random bouncing
function startRandomHeights() {
animateRandomHeights("graphBarA", 0);
animateRandomHeights("graphBarB", 50);
animateRandomHeights("graphBarC", 100);
animateRandomHeights("graphBarD", 150);
}

// later, stop and show real data
// stopAllRandomHeightsAndReveal();

function revealGraphPercentages() {
    var barAHeight = (276 * (window.GameVariables.AnswerAPercent) / 100) + "px";
    var barBHeight = (276 * (window.GameVariables.AnswerBPercent) / 100) + "px";
    var barCHeight = (276 * (window.GameVariables.AnswerCPercent) / 100) + "px";
    var barDHeight = (276 * (window.GameVariables.AnswerDPercent) / 100) + "px";


    // hide percentages first
    $('.ataGraphPercentDiv').transition({'opacity':0}, 0, 'linear');

    // all bars animate together with easing
    $('#graphBarA').transition({'height': barAHeight}, 1000, 'easeInOutCubic');
    $('#graphBarB').transition({'height': barBHeight}, 1000, 'easeInOutCubic');
    $('#graphBarC').transition({'height': barCHeight}, 1000, 'easeInOutCubic');
    $('#graphBarD').transition({'height': barDHeight}, 1000, 'easeInOutCubic');

    // update percentages instantly (text only)
    $('#graphPercentA, #ataPercentStrapA').html(new Intl.NumberFormat('en', { style: "percent", numberingSystem: window.GameVariables.AtANumberingSystem }).format(window.GameVariables.AnswerAPercent / 100));
    $('#graphPercentB, #ataPercentStrapB').html(new Intl.NumberFormat('en', { style: "percent", numberingSystem: window.GameVariables.AtANumberingSystem }).format(window.GameVariables.AnswerBPercent / 100));
    $('#graphPercentC, #ataPercentStrapC').html(new Intl.NumberFormat('en', { style: "percent", numberingSystem: window.GameVariables.AtANumberingSystem }).format(window.GameVariables.AnswerCPercent / 100));
    $('#graphPercentD, #ataPercentStrapD').html(new Intl.NumberFormat('en', { style: "percent", numberingSystem: window.GameVariables.AtANumberingSystem }).format(window.GameVariables.AnswerDPercent / 100));

    // fade in percentages + flash after easing animation
    setTimeout(function() {
        $('.ataGraphPercentDiv').transition({'opacity':1}, 300, 'linear');
        $('.ataGraphFlashDiv').transition({perspective:0, opacity:1}, 300, 'linear', function(){
            $('.ataGraphFlashDiv').transition({perspective:0, opacity:0}, 600, 'linear');
        });
    }, 1000); // matches the bar easing duration
}



function slideOutATAGraph(){
	$('.ataGraphDiv').transition({perspective:1920, right:"270px", 'rotateY':'0deg', scale:[1]}, 0, 'ease-out');
    $('.ataGraphDiv').transition({perspective:1920, right:"220px", 'rotateY':'-90deg', scale:[0]}, 750, 'ease-out'), function(){
		$('#graphBarA').css('height', "0px");
		$('#graphBarB').css('height', "0px");
		$('#graphBarC').css('height', "0px");
		$('#graphBarD').css('height', "0px");
		$('#graphPercentA').html("");
		$('#graphPercentB').html("");
		$('#graphPercentC').html("");
		$('#graphPercentD').html("");
	};
	
	$('#ataPercentStrapA').parent().transition({perspective:0, opacity:1}, 250, 'linear');
	$('#ataPercentStrapB').parent().transition({perspective:0, opacity:1}, 250, 'linear');
	$('#ataPercentStrapC').parent().transition({perspective:0, opacity:1}, 250, 'linear');
	$('#ataPercentStrapD').parent().transition({perspective:0, opacity:1}, 250, 'linear');
}

function slideOutATAGraph1(){
	$('#ataPercentStrapA').parent().transition({perspective:0, opacity:1}, 250, 'linear');
	$('#ataPercentStrapB').parent().transition({perspective:0, opacity:1}, 250, 'linear');
	$('#ataPercentStrapC').parent().transition({perspective:0, opacity:1}, 250, 'linear');
	$('#ataPercentStrapD').parent().transition({perspective:0, opacity:1}, 250, 'linear');
}

/****************************************************************************************************************/
/* Switch the Question Life Line Functions */
/****************************************************************************************************************/

function stqLifeLineSlideIn(){
	$('.ffLifeLine').transition({perspective:0, 'left':'-180px'}, 500, 'linear');
	$('.pafLifeLine').transition({perspective:0, 'left':'167px'}, 500, 'linear');
	$('.ataLifeLine').transition({perspective:0, 'left':'297px'}, 500, 'linear');
	$('.stqLifeLine').transition({perspective:0, opacity: 1, 'left':'427px'}, 500, 'linear');
	
	$('.pafStrapLifeLine').transition({perspective:0, 'left':'625px'}, 500);
	$('.ataStrapLifeLine').transition({perspective:0, 'left':'850px'}, 500);
	$('.stqStrapLifeLine').transition({perspective:0, 'left':'1075px'}, 500);
}

function stqLifeLineSlideIn1(){
	$('.ffLifeLine').transition({perspective:0, 'left':'-180px'}, 500, 'linear');
	$('.pafLifeLine').transition({perspective:0, 'left':'167px'}, 500, 'linear');
	$('.ataLifeLine').transition({perspective:0, 'left':'297px'}, 500, 'linear');
	$('.stqLifeLine').transition({perspective:0, opacity: 1, 'left':'427px'}, 500, 'linear');
	
	$('.pafStrapLifeLine').transition({perspective:0, 'left':'625px'}, 500);
	$('.ataStrapLifeLine').transition({perspective:0, 'left':'850px'}, 500);
	$('.stqStrapLifeLine').transition({perspective:0, 'left':'1075px'}, 500);
}

function stqLifeLineSlideOut(){
	window.GameVariables.LifeLineAnimationCounter = 0;
	$('.ffLifeLine').transition({perspective:0, 'left':'-50px'}, 500, 'linear');
	$('.pafLifeLine').transition({perspective:0, 'left':'232px'}, 500, 'linear');
	$('.ataLifeLine').transition({perspective:0, 'left':'362px'}, 500, 'linear');
	$('.stqLifeLine').transition({perspective:0, opacity: 0, 'left':'760px'}, 500, 'linear');
	
	$('.ffStrapLifeLine').transition({perspective:0, 'left':'745px'}, 500);
	$('.ataStrapLifeLine').transition({perspective:0, 'left':'1090px'}, 500);
	$('.stqStrapLifeLine').transition({perspective:0, 'left':'1870px'}, 500);
}

function stqLifeLineSlideOut1(){
	window.GameVariables.LifeLineAnimationCounter = 0;
	$('.ffLifeLine').transition({perspective:0, 'left':'-50px'}, 500, 'linear');
	$('.pafLifeLine').transition({perspective:0, 'left':'232px'}, 500, 'linear');
	$('.ataLifeLine').transition({perspective:0, 'left':'362px'}, 500, 'linear');
	$('.stqLifeLine').transition({perspective:0, opacity: 0, 'left':'760px'}, 500, 'linear');
	
	$('.pafStrapLifeLine').transition({perspective:0, 'left':'745px'}, 500);
	$('.ataStrapLifeLine').transition({perspective:0, 'left':'1090px'}, 500);
	$('.stqStrapLifeLine').transition({perspective:0, 'left':'1870px'}, 500);
}

function stqPulseLifeLine(){
	$('.stqLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.stqLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.stqLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.stqLifeLine .lifelineYellowTreeImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.stqStrapLifeLine').transition({perspective:0, scale:[1.25,1.25]}, 250, 'ease-out', function(){
		$('.stqStrapLifeLine').transition({perspective:0, scale:[1,1]}, 500, 'ease-in', function(){
			
		});
	});
	
	$('.stqStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 1}, 250, 'ease-out', function(){
		$('.stqStrapLifeLine .lifelineYellowStrapImg').transition({perspective:0, opacity: 0}, 500, 'ease-in', function(){
			
		});
	});
}

function stqLifeLineDisable(){
	$('.stqLifeLine .lifelineUsedImg').css('opacity', 1);
	$('.stqLifeLine .lifelineTreeImg').css('opacity', 1);
	$('.stqStrapLifeLine .lifelineUsedStrapImg').css('opacity', 1);
	$('.stqStrapLifeLine .lifelineStrapImg').css('opacity', 1);
}

function switchOutToNewQuestion(){
	clearTimeout(window.GameVariables.ShowAnswerTimeout);
	resetAnswerStraps();
	stqLifeLineDisable();
	setQuestion(true);
	$('.answerGroupBDiv').transition({perspective:4096, 'bottom':'-240px'}, 0);
	$('.answerGroupADiv').transition({perspective:4096, 'bottom':'-240px'}, 0);
	$('.questionStrapDiv').transition({perspective:4096, 'bottom':'-192px', 'rotateX':'0deg'}, 0);
	$('.questionStrapDiv').transition({perspective:4096, 'bottom':'30px'}, 700, 'cubic-bezier(0.5, 2, 0.5, 1)');
}

function switchAnimation(){
	$('.answerGroupBDiv').transition({perspective:4096, 'bottom':'-390px'}, 375, 'linear');
	$('.answerGroupADiv').transition({perspective:4096, 'bottom':'-390px'}, 375, 'linear');
	$('.questionStrapDiv').transition({perspective:4096, 'bottom':'-170px'}, 375, 'linear');
}

/****************************************************************************************************************/
/* Other Life Line Functions */
/****************************************************************************************************************/

function showLifeLineCentered(target){
	window.GameVariables.ShowLifeLineCenteredAnimation = true;
	
	$(target).css('opacity', 1);
		
	$('.answerStrapLifeLineCenterContainerDiv').transition({perspective:0, scale:[1,1], opacity:1}, 200, 'linear');
}

function showLifeLineCentered1(target){
	window.GameVariables.ShowLifeLineCenteredAnimation = true;
	
	$(target).css('opacity', 1);
		
	$('.answerStrapLifeLineCenterContainer1Div').transition({perspective:0, scale:[1,1], opacity:1}, 200, 'linear');
}

function hideLifeLineCentered(){
	window.GameVariables.ContinuePulsingLifeLineCenter = false;
	window.GameVariables.ShowLifeLineCenteredAnimation = false;
	$('.answerStrapLifeLineCenterContainer1Div').transition({perspective:0, scale:[0.2,0.2], opacity:0}, 200, 'linear');
	$('.answerStrapLifeLineCenterContainerDiv').transition({perspective:0, scale:[0.2,0.2], opacity:0}, 200, 'linear', function(){
		$('.lifelineCenterImg').css('opacity', 0);
	});
}

function broadcastOrbSpin(action = 'toggle') {
  localStorage.setItem('orbSpinTrigger', JSON.stringify({ action, time: Date.now() }));
}

function hideJustLifeLineCenteredContainer(){
	$('.answerStrapLifeLineCenterDiv').css('opacity', 0);
}

function showJustLifeLineCenteredContainer(){
	$('.answerStrapLifeLineCenterDiv').css('opacity', 1);
}

function slideLifeLineStrapIn(){
	$('.lifeLinesLeftStrapDiv').transition({perspective:0, 'left':'112px'}, 500);
}

function slideLifeLineStrapOut(){
	$('.lifeLinesLeftStrapDiv').transition({perspective:0, 'left':'-1696px'}, 500, function(){
		$('.lifeLinesLeftStrapDiv').transition({perspective:0, 'left':'1920px'}, 1, 'linear');
	});
}

function slideLifeLineForStrapIn(){
	$('.lifeLinesLeftForStrapDiv').transition({perspective:0, 'right':'652px'}, 500);
}

function slideLifeLineForStrapOut(){
	$('.lifeLinesLeftForStrapDiv').transition({perspective:0, 'right':'1696px'}, 500, function(){
		$('.lifeLinesLeftForStrapDiv').transition({perspective:0, 'right':'1920px'}, 1, 'linear');
	});
}