function showAmountWon() {
	// Calculate lost and wrong amounts automatically from PrizeAmounts only
	// (no dependency on PrizeAmountsLost or WrongAmounts anymore)
	let level = window.GameVariables.QuestionLevel;
	let pa = window.GameVariables.PrizeAmounts;
	let wrongAmount = 0;
	if (level >= 5 && level < 10) {
		wrongAmount = pa[4];
	} else if (level >= 10 && level < 15) {
		wrongAmount = pa[9];
	}
	// For level 15+ wrongAmount stays 0 (final question drops to zero)
	let lostAmount = pa[level - 1] - wrongAmount;


	if (window.GameVariables.UseTopPrizeText == true) {
		if (window.GameVariables.QuestionLevel >= window.GameVariables.TopPrizeQuestionNumber) {
			$('.winningsP').html(window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel - 1]);
			$('.moneyrightP').html(window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel]);
			$('.moneywalkawayP').html(window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel - 1]);
			$('.moneylostP').html(window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel - 1]);
			$('.moneywrongP').html(window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel - 1]);
			$('.totalPrizeMoneyWonDiv').html(window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel - 1]);
			$('.totalPrizeMoneyWon1Div').html(window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel - 1]);
		} else {
			$('.winningsP').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.moneyrightP').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.moneywalkawayP').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.moneylostP').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(lostAmount).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.moneywrongP').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(wrongAmount).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);							
			$('.totalPrizeMoneyWonDiv').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.totalPrizeMoneyWon1Div').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		}
	} else {
		$('.winningsP').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		$('.moneyrightP').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		$('.moneywalkawayP').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		$('.moneylostP').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(lostAmount).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		$('.moneywrongP').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(wrongAmount).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		$('.totalPrizeMoneyWonDiv').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		$('.totalPrizeMoneyWon1Div').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
	}
	$('.winStrapDiv').css('opacity', 1);
}

function showAmountWon1(){
	// Calculate lost and wrong amounts automatically from PrizeAmounts only
	// (no dependency on PrizeAmountsLost or WrongAmounts anymore)
	let level = window.GameVariables.QuestionLevel;
	let pa = window.GameVariables.PrizeAmounts;
	let wrongAmount = 0;
	if (level >= 5 && level < 10) {
		wrongAmount = pa[4];
	} else if (level >= 10 && level < 15) {
		wrongAmount = pa[9];
	}
	// For level 15+ wrongAmount stays 0 (final question drops to zero)
	let lostAmount = pa[level - 1] - wrongAmount;
	$('.questionsLeftP').html(window.GameVariables.QuestionsLeftPrefixText + new Intl.NumberFormat('en', { numberingSystem: window.GameVariables.TreeNumberingSystem }).format(15 - window.GameVariables.QuestionLevel) + window.GameVariables.QuestionsLeftSuffixText);
	if (window.GameVariables.UseTopPrizeText == true) {
		if (window.GameVariables.QuestionLevel >= window.GameVariables.TopPrizeQuestionNumber) {
			$('.winningsP').html(window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel - 1]);
			$('.moneyrightP').html(window.GameVariables.RightAnswerPrizePrefixText + window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel]);
			$('.moneywalkawayP').html(window.GameVariables.WalkAwayPrizePrefixText + window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel - 1]);
			$('.moneylostP').html(window.GameVariables.PrizeAmountWrongPrefixText + window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel - 1]);
			$('.moneywrongP').html(window.GameVariables.PrizeAfterWrongPrefixText + window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel - 1]);
			$('.totalPrizeMoneyWonDiv').html(window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel - 1]);
			$('.totalPrizeMoneyWon1Div').html(window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel - 1]);
		} else {
			$('.winningsP').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.moneyrightP').html(window.GameVariables.RightAnswerPrizePrefixText + window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.moneywalkawayP').html(window.GameVariables.WalkAwayPrizePrefixText + window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.moneylostP').html(window.GameVariables.PrizeAmountWrongPrefixText + window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(lostAmount).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.moneywrongP').html(window.GameVariables.PrizeAfterWrongPrefixText + window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(wrongAmount).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.totalPrizeMoneyWonDiv').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.totalPrizeMoneyWon1Div').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		}
	} else {
		$('.winningsP').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		$('.moneyrightP').html(window.GameVariables.RightAnswerPrizePrefixText + window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		$('.moneywalkawayP').html(window.GameVariables.WalkAwayPrizePrefixText + window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		$('.moneylostP').html(window.GameVariables.PrizeAmountWrongPrefixText + window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(lostAmount).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		$('.moneywrongP').html(window.GameVariables.PrizeAfterWrongPrefixText + window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(wrongAmount).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		$('.totalPrizeMoneyWonDiv').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		$('.totalPrizeMoneyWon1Div').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
	}
}

function getPrizeAmountSafe(index) {
    let pa = window.GameVariables.PrizeAmounts;
    return (index >= 0 && index < pa.length) ? pa[index] : 0;
}

function renderBarInfoText(){
	let level = window.GameVariables.QuestionLevel;
    let pa = window.GameVariables.PrizeAmounts;

    let wrongAmount = 0;
    if (level >= 5 && level < 10) {
        wrongAmount = pa[4];
    } else if (level >= 10 && level <= 15) {
        wrongAmount = pa[9];
    }

    let lostAmount = getPrizeAmountSafe(level - 2) - wrongAmount;
	$('.questionsLeftP').html(window.GameVariables.QuestionsLeftPrefixText + new Intl.NumberFormat('en', { numberingSystem: window.GameVariables.TreeNumberingSystem }).format(16 - window.GameVariables.QuestionLevel) + window.GameVariables.QuestionsLeftSuffixText);
	$('.moneyrightP').html(window.GameVariables.RightAnswerPrizePrefixText + window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
    $('.moneywalkawayP').html(window.GameVariables.WalkAwayPrizePrefixText + window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 2] ?? 0).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
    $('.moneylostP').html(window.GameVariables.PrizeAmountWrongPrefixText + window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(lostAmount).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
    $('.moneywrongP').html(window.GameVariables.PrizeAfterWrongPrefixText + window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(wrongAmount).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
}

function hideAmountWon(){
	$('.winStrapDiv').css('opacity', 0);
}

function reduceAmountWon(){
	if(window.GameVariables.QuestionLevel < 6){
		if(window.GameVariables.UseZeronaireText == true){
			$('.totalPrizeMoneyWonDiv').html(window.GameVariables.ZeronaireText);
			$('.totalPrizeMoneyWon1Div').html(window.GameVariables.ZeronaireText);
		}
		else{
			$('.totalPrizeMoneyWonDiv').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(0).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.totalPrizeMoneyWon1Div').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(0).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		}
	}
	else if(window.GameVariables.QuestionLevel < 11){
		if(window.GameVariables.UseTopPrizeText == true){
			if(window.GameVariables.TopPrizeQuestionNumber > 5){
				$('.totalPrizeMoneyWonDiv').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[4]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
				$('.totalPrizeMoneyWon1Div').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[4]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			}
			else{
				$('.totalPrizeMoneyWonDiv').html(window.GameVariables.TopPrizeText[4]);
				$('.totalPrizeMoneyWon1Div').html(window.GameVariables.TopPrizeText[4]);
			}
		}
		else{
			$('.totalPrizeMoneyWonDiv').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[4]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.totalPrizeMoneyWon1Div').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[4]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		}
	}
	else {
		if(window.GameVariables.UseTopPrizeText == true){
			if(window.GameVariables.TopPrizeQuestionNumber > 10){
				$('.totalPrizeMoneyWonDiv').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[9]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
				$('.totalPrizeMoneyWon1Div').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[9]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			}
			else{
				$('.totalPrizeMoneyWonDiv').html(window.GameVariables.TopPrizeText[9]);
				$('.totalPrizeMoneyWon1Div').html(window.GameVariables.TopPrizeText[9]);
			}
		}
		else{
			$('.totalPrizeMoneyWonDiv').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[9]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			$('.totalPrizeMoneyWon1Div').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[9]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
		}
	}
}

function showMillionaireTitleStrap(){
	$('.millionaireWinnerTitleDiv').transition({perspective:0, 'bottom':'0px'}, 500, 'ease-out');
}

function hideMillionaireTitleStrap(){
	$('.millionaireWinnerTitleDiv').transition({perspective:0, 'bottom':'-300px'}, 500, 'ease-in');
}

function showTotalPrizeMoneyStrap(){
	$('.totalPrizeMoneyDiv').transition({perspective:0, 'bottom':'0px'}, 500, 'ease-out');
}

function hideTotalPrizeMoneyStrap(){
	$('.totalPrizeMoneyDiv').transition({perspective:0, 'bottom':'-300px'}, 500, 'ease-in');
}

function showMillionaireTitleStrap1(){
	$('.millionaireWinnerTitle1Div').css('opacity', 1);
}

function hideMillionaireTitleStrap1(){
	$('.millionaireWinnerTitle1Div').css('opacity', 0);
}

function showTotalPrizeMoneyStrap1(){
	$('.totalPrizeMoney1Div').css('opacity', 1);
	 // 🌀 Trigger logo flip across windows
localStorage.setItem("logoFlipTrigger", JSON.stringify({
  time: Date.now()
}));
}

function hideTotalPrizeMoneyStrap1(){
	$('.totalPrizeMoney1Div').css('opacity', 0);
	// 🌀 Trigger logo flip across windows
localStorage.setItem("logoFlipTrigger", JSON.stringify({
  time: Date.now()
}));
}