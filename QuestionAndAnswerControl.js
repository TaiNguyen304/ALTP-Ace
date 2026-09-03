function setQuestion(isSettingSwitchQuestion) {
    var targetQuestion = null;

    if (!isSettingSwitchQuestion) {
        targetQuestion = window.GameVariables.QuestionsAndAnswers[window.GameVariables.QuestionLevel - 1];
    } else {
        targetQuestion = window.GameVariables.SwitchQuestionsAndAnswers[window.GameVariables.QuestionLevel - 1];
    }

    if (!targetQuestion) return;

    window.GameVariables.CurrentCorrectAnswer = targetQuestion.CorrectAnswer;

    var infoText = window.GameVariables.Info[window.GameVariables.QuestionLevel - 1] || "";

    $('.questionTd, .question-box').html(targetQuestion.Question);
    $('.infoTd, .question-info').html(infoText);
    $('#answerA .answerP, #ctrlAnsA').html(targetQuestion.AnswerA);
    $('#answerB .answerP, #ctrlAnsB').html(targetQuestion.AnswerB);
    $('#answerC .answerP, #ctrlAnsC').html(targetQuestion.AnswerC);
    $('#answerD .answerP, #ctrlAnsD').html(targetQuestion.AnswerD);

    $('.stat-orange').text(window.GameVariables.QuestionLevel || 0);
    $('.stat-blue').text(15 - (window.GameVariables.QuestionLevel || 1) + 1);
}

function setFFFQuestion(questionIndex){
	questionIndex = questionIndex || 0;
	var targetQuestion = window.GameVariables.FastestFingerQuestions[questionIndex];
	if (!targetQuestion) return;

	window.GameVariables.CurrentFFFCorrectOrder = targetQuestion.CorrectOrder;

	$('.questionTd, .question-box').html(targetQuestion.Question);
	$('#answerA .answerP, #ctrlAnsA').html(targetQuestion.AnswerA);
	$('#answerB .answerP, #ctrlAnsB').html(targetQuestion.AnswerB);
	$('#answerC .answerP, #ctrlAnsC').html(targetQuestion.AnswerC);
	$('#answerD .answerP, #ctrlAnsD').html(targetQuestion.AnswerD);

	// Question text
	$('.fastestFingerTreeQuestionP').html(targetQuestion.Question);

	// Map letter -> answer text, so we can look up any letter's text
	var answerTextByLetter = {
		a: targetQuestion.AnswerA,
		b: targetQuestion.AnswerB,
		c: targetQuestion.AnswerC,
		d: targetQuestion.AnswerD
	};

	// Fill the 4 slots in correct order: order1 = 1st correct, order2 = 2nd correct, etc.
	for(var i = 0; i < targetQuestion.CorrectOrder.length; i++){
		var letter = targetQuestion.CorrectOrder[i]; // e.g. "d"
		var slotId = '#fastestAnswerOrder' + (i + 1);

		$(slotId + ' .fastestTreeLetterP').html(letter.toUpperCase() + ':');
		$(slotId + ' .fastestTreeAnswerP').html(answerTextByLetter[letter]);
	}
}

function showAnswerBars() {
    var correctLetter = window.GameVariables.CurrentCorrectAnswer.toUpperCase();

    $('.rightanswerbarDiv .letterrightP').text(correctLetter);
    $('.wronganswerbarDiv .letterrightP').text(correctLetter);
}

function revealQuestionAndAnswerStraps(){
	$('.answerStrapDiv').css('opacity', 1);
	$('.questionStrapDiv').css('opacity', 1);
	$('.noanswerbarDiv').css('opacity', 1);
	
	if(window.GameVariables.IsSTQLifeLineActiveAtStart == true){
		window.GameVariables.IsSTQLifeLineActiveAtStart = false;
		showLifeLineCentered('#stqLifeLineCenterImg');
	}
}

function revealtherightanswerforhost(){
	$('.rightanswerbarDiv').css('opacity', 1);
}

function revealthewronganswerforhost(){
	$('.wronganswerbarDiv').css('opacity', 1);
}

function showbreaktext(){
	$('.breakP').css('opacity', 1);
}

function hidebreaktext(){
	$('.breakP').css('opacity', 0);
}


function revealQuestionAndAnswer1Straps(){
	$('.answerStrap1Div').css('opacity', 1);
	$('.questionStrap1Div').css('opacity', 1);
	$('.questionTable').css('opacity', 1);
	$('.infoTable').css('opacity', 0);
	
	if(window.GameVariables.IsSTQLifeLineActiveAtStart == true){
		window.GameVariables.IsSTQLifeLineActiveAtStart = false;
		showLifeLineCentered('#stqLifeLineCenterImg');
	}
}

function hideQuestionAndAnswerStraps(){
	$('.answerStrapDiv').css('opacity', 0);
	$('.questionStrapDiv').css('opacity', 0);
	clearTimeout(window.GameVariables.ShowAnswerTimeout);
}

function revealAnswersOneByOne(){
	window.GameVariables.RevealAnswerCounter++;
	
	if(window.GameVariables.RevealAnswerCounter == 1){
		$('#answerA .letterP').css('opacity', 1);
		$('#answerA .answerP').css('opacity', 1);
		$('#answerA .diagonalImg').css('opacity', 1);
	}
	else if(window.GameVariables.RevealAnswerCounter == 2){
		$('#answerB .letterP').css('opacity', 1);
		$('#answerB .answerP').css('opacity', 1);
		$('#answerB .diagonalImg').css('opacity', 1);
	}
	else if(window.GameVariables.RevealAnswerCounter == 3){
		$('#answerC .letterP').css('opacity', 1);
		$('#answerC .answerP').css('opacity', 1);
		$('#answerC .diagonalImg').css('opacity', 1);
	}
	else if(window.GameVariables.RevealAnswerCounter == 4){
		$('#answerD .letterP').css('opacity', 1);
		$('#answerD .answerP').css('opacity', 1);
		$('#answerD .diagonalImg').css('opacity', 1);
		window.GameVariables.RevealAnswerCounter = 0;
	}
}

function revealAllAnswersAtOnce(){
	$('#answerA .letterP, #answerB .letterP, #answerC .letterP, #answerD .letterP').css('opacity', 1);
	$('#answerA .answerP, #answerB .answerP, #answerC .answerP, #answerD .answerP').css('opacity', 1);
	$('#answerA .diagonalImg, #answerB .diagonalImg, #answerC .diagonalImg, #answerD .diagonalImg').css('opacity', 1);
}

function lockInFinalAnswer(answer) {
    if (window.GameVariables.IsSTQActive === true) {
        $('.noanswerbarDiv').css('opacity', 1);
		$('.infoTable').css('opacity', 0);
    } 
	else {
        $('.noanswerbarDiv').css('opacity', 0);
		$('.infoTable').css('opacity', 1);
    }

    $('.letterrightP').css('opacity', 1);
    $('#answer' + answer + ' .finalImg').css('opacity', 1);
    $('#answer' + answer + ' .letterP').css('color', '#000000');
    $('#answer' + answer + ' .answerP').css('color', '#000000');
	$('#answer' + answer + ' .letterP').css('text-shadow','none');
    $('#answer' + answer + ' .answerP').css('text-shadow','none');
    $('#answer' + answer + ' .diagonalImg').attr('src', 'Images/orange_diagonal.png');
    window.GameVariables.QuestionSequenceCounter = 7;
}

function showFinalToCorrectAnswerStep1(answer){
	$('.infoTable').css('opacity', 1);
	$('#answer' + answer + ' .correctImg').css('opacity', 1);
	window.GameVariables.ShowAnswerTimeout = setTimeout(function(){
		showFinalToCorrectAnswerStep2(answer);
	}, 200);
}

function showFinalToCorrectAnswerStep2(answer){
	$('#answer' + answer + ' .correctImg').css('opacity', 0);
	window.GameVariables.ShowAnswerTimeout = setTimeout(function(){
		showFinalToCorrectAnswerStep3(answer);
	}, 200);
}

function showFinalToCorrectAnswerStep3(answer){
	$('#answer' + answer + ' .correctImg').css('opacity', 1);
	window.GameVariables.ShowAnswerTimeout = setTimeout(function(){
		showFinalToCorrectAnswerStep4(answer);
	}, 200);
}

function showFinalToCorrectAnswerStep4(answer){
	$('#answer' + answer + ' .correctImg').css('opacity', 0);
	window.GameVariables.ShowAnswerTimeout = setTimeout(function(){
		showFinalToCorrectAnswerStep5(answer);
	}, 200);
}

function showFinalToCorrectAnswerStep5(answer){
	$('#answer' + answer + ' .correctImg').css('opacity', 1);
}

function revealNormalToCorrectAnswerStep1(answer){
	$('.infoTable').css('opacity', 1);
	$('#answer' + answer + ' .correctImg').css('opacity', 1);
	$('#answer' + answer + ' .letterP').css('color', '#000000');
	$('#answer' + answer + ' .answerP').css('color', '#000000');
	$('#answer' + answer + ' .letterP').css('text-shadow','0px 0px 0px transparent');
	$('#answer' + answer + ' .answerP').css('text-shadow','0px 0px 0px transparent');
	window.GameVariables.ShowAnswerTimeout = setTimeout(function(){
		revealNormalToCorrectAnswerStep2(answer);
	}, 200);
}

function revealNormalToCorrectAnswerStep2(answer){
	$('#answer' + answer + ' .correctImg').css('opacity', 0);
	$('#answer' + answer + ' .letterP').css('color', '#EA932C');
	$('#answer' + answer + ' .answerP').css('color', '#FFFFFF');
	$('#answer' + answer + ' .letterP').css('text-shadow','2px 2px 0px black');
	$('#answer' + answer + ' .answerP').css('text-shadow','2px 2px 0px black');
	window.GameVariables.ShowAnswerTimeout = setTimeout(function(){
		revealNormalToCorrectAnswerStep3(answer);
	}, 200);
}

function revealNormalToCorrectAnswerStep3(answer){
	$('#answer' + answer + ' .correctImg').css('opacity', 1);
	$('#answer' + answer + ' .letterP').css('color', '#000000');
	$('#answer' + answer + ' .answerP').css('color', '#000000');
	$('#answer' + answer + ' .letterP').css('text-shadow','0px 0px 0px transparent');
	$('#answer' + answer + ' .answerP').css('text-shadow','0px 0px 0px transparent');
	window.GameVariables.ShowAnswerTimeout = setTimeout(function(){
		revealNormalToCorrectAnswerStep4(answer);
	}, 200);
}

function revealNormalToCorrectAnswerStep4(answer){
	$('#answer' + answer + ' .correctImg').css('opacity', 0);
	$('#answer' + answer + ' .letterP').css('color', '#EA932C');
	$('#answer' + answer + ' .answerP').css('color', '#FFFFFF');
	$('#answer' + answer + ' .letterP').css('text-shadow','2px 2px 0px black');
	$('#answer' + answer + ' .answerP').css('text-shadow','2px 2px 0px black');
	window.GameVariables.ShowAnswerTimeout = setTimeout(function(){
		revealNormalToCorrectAnswerStep5(answer);
	}, 200);
}

function revealNormalToCorrectAnswerStep5(answer){
	$('#answer' + answer + ' .correctImg').css('opacity', 1);
	$('#answer' + answer + ' .letterP').css('color', '#000000');
	$('#answer' + answer + ' .answerP').css('color', '#000000');
	$('#answer' + answer + ' .letterP').css('text-shadow','0px 0px 0px transparent');
	$('#answer' + answer + ' .answerP').css('text-shadow','0px 0px 0px transparent');
}

function resetAnswerStraps(){
	$('#answerA .letterP, #answerA .answerP').css('opacity', 0);
	$('#answerB .letterP, #answerB .answerP').css('opacity', 0);
	$('#answerC .letterP, #answerC .answerP').css('opacity', 0);
	$('#answerD .letterP, #answerD .answerP').css('opacity', 0);
	$('.finalImg, .correctImg, .diagonalImg').css('opacity', 0);
	$('.diagonalImg').attr('src', 'Images/orange_diagonal.png');
	$('.answerP').css('color','#FFFFFF');
	$('.letterP').css('color','#EA932C');
	$('.answerP').css('text-shadow','2px 2px 0px black');
	$('.letterP').css('text-shadow','2px 2px 0px black');
	$('#ataPercentStrapA').parent().transition({perspective:0, opacity:0}, 0, 'linear');
	$('#ataPercentStrapB').parent().transition({perspective:0, opacity:0}, 0, 'linear');
	$('#ataPercentStrapC').parent().transition({perspective:0, opacity:0}, 0, 'linear');
	$('#ataPercentStrapD').parent().transition({perspective:0, opacity:0}, 0, 'linear');
	window.GameVariables.AnswerAIsOut = false;
	window.GameVariables.AnswerBIsOut = false;
	window.GameVariables.AnswerCIsOut = false;
	window.GameVariables.AnswerDIsOut = false;
	window.GameVariables.CurrentTargetAnswer = "";
	$('.wronganswerbarDiv').css('opacity', 0);
	$('.rightanswerbarDiv').css('opacity', 0);
	$('.noanswerbarDiv').css('opacity', 1);
}

function hidequestiontext(){
	$('.questionTable').css('opacity', 0);
}

function hideanswerbar(){
    $('.wronganswerbarDiv').css('opacity', 0);
	$('.rightanswerbarDiv').css('opacity', 0);
}

function undoFinaledAnswer(){
	window.GameVariables.CurrentTargetAnswer = "";
	$('.wronganswerbarDiv').css('opacity', 0);
	$('.rightanswerbarDiv').css('opacity', 0);
	$('.noanswerbarDiv').css('opacity', 1);
	$('.infoTable').css('opacity', 0);
	$('.answerP').css('text-shadow','2px 2px 0px black');
	$('.letterP').css('text-shadow','2px 2px 0px black');
	if(window.GameVariables.AnswerAIsOut == false){
		$('#answerA .finalImg').css('opacity', 0);
		$('#answerA .diagonalImg').attr('src', 'Images/orange_diagonal.png');
		$('#answerA .answerP').css('color','#FFFFFF');
		$('#answerA .letterP').css('color','#EA932C');
	}
	
	if(window.GameVariables.AnswerAIsOut == false){
		$('#answerA .finalImg').css('opacity', 0);
		$('#answerA .answerP').css('color','#FFFFFF');
		$('#answerA .letterP').css('color','#EA932C');
		$('#answerA .answerP').css('text-shadow','2px 2px 0px black');
		$('#answerA .letterP').css('text-shadow','2px 2px 0px black');
	}
	
	if(window.GameVariables.AnswerBIsOut == false){
		$('#answerB .finalImg').css('opacity', 0);
		$('#answerB .answerP').css('color','#FFFFFF');
		$('#answerB .letterP').css('color','#EA932C');
		$('#answerB .answerP').css('text-shadow','2px 2px 0px black');
		$('#answerB .letterP').css('text-shadow','2px 2px 0px black');
	}
	
	if(window.GameVariables.AnswerCIsOut == false){
		$('#answerC .finalImg').css('opacity', 0);
		$('#answerC .answerP').css('color','#FFFFFF');
		$('#answerC .letterP').css('color','#EA932C');
		$('#answerC .answerP').css('text-shadow','2px 2px 0px black');
		$('#answerC .letterP').css('text-shadow','2px 2px 0px black');
	}
	
	if(window.GameVariables.AnswerDIsOut == false){
		$('#answerD .finalImg').css('opacity', 0);
		$('#answerD .answerP').css('color','#FFFFFF');
		$('#answerD .letterP').css('color','#EA932C');
		$('#answerD .answerP').css('text-shadow','2px 2px 0px black');
		$('#answerD .letterP').css('text-shadow','2px 2px 0px black');
	}
}