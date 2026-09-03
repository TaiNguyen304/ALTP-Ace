function renderMoneyTreeTable(){
	var htmlTableString = "";
	
	for (var i = 14; i >= 0; i--){
		htmlTableString += "<tr id='moneyTreeTr" + (i+1) + "'>";
		
		if((i+1)%5 === 0){
			htmlTableString += "<td class='moneyTreeLevelWhiteTd'>";
		}
		else{
			htmlTableString += "<td class='moneyTreeLevelTd'>";
		}
		
		htmlTableString += "<span class='moneyTreePulseInner'>";
		htmlTableString += (new Intl.NumberFormat('en', { numberingSystem: window.GameVariables.LevelNumberingSystem }).format(i + 1));
		htmlTableString += "</span>";
		htmlTableString += "</td>"
		htmlTableString += "<td class='moneyTreeDiagonalTd'></td>"
		
		if((i+1)%5 === 0){
			htmlTableString += "<td class='moneyTreeAmountWhiteTd'>"
		}
		else{
			htmlTableString += "<td class='moneyTreeAmountTd'>"
		}
		
		htmlTableString += "<span class='moneyTreePulseInner'>";
		
		if(i >= window.GameVariables.TopPrizeQuestionNumber - 1 && window.GameVariables.UseTopPrizeText == true){
			htmlTableString += window.GameVariables.TopPrizeText[i];
		}
		else{
			htmlTableString += window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[i]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix;
		}

		htmlTableString += "</span>";
		htmlTableString += "</td>"
		htmlTableString += "</tr>"
	}
	
	$('.moneyTreeTable').html(htmlTableString);
}

function renderMoneyTree1Table(){
	var htmlTableString = "";
	
	for (var i = 14; i >= 0; i--){
		htmlTableString += "<tr id='moneyTreeTr" + (i+1) + "'>";
		
		if((i+1)%5 === 0){
			htmlTableString += "<td class='moneyTreeLevelWhite1Td'>";
		}
		else{
			htmlTableString += "<td class='moneyTreeLevel1Td'>";
		}
		
		htmlTableString += (new Intl.NumberFormat('en', { numberingSystem: window.GameVariables.LevelNumberingSystem }).format(i + 1));
		htmlTableString += "</td>"
		htmlTableString += "<td class='moneyTreeDiagonal1Td'></td>"
		
		if((i+1)%5 === 0){
			htmlTableString += "<td class='moneyTreeAmountWhite1Td'>"
		}
		else{
			htmlTableString += "<td class='moneyTreeAmount1Td'>"
		}
		
		if(i >= window.GameVariables.TopPrizeQuestionNumber - 1)
		{
			if(window.GameVariables.UseTopPrizeText == true){
				htmlTableString += window.GameVariables.TopPrizeText[i];
			}
			else{
				htmlTableString += window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[i]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix;
			}
		}
		else
		{
			htmlTableString += window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[i]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix;
		}

		
		htmlTableString += "</td>"
		htmlTableString += "</tr>"
	}
	
	$('.moneyTree1Table').html(htmlTableString);
}

function slideInMoneyTree(){
	$('.moneyTreeDiv').transition({perspective:0, 'right': '-58px'}, 850, 'cubic-bezier(0.375,0,0.625,1)');
}

function slideOutMoneyTree(){
	$('.moneyTreeDiv').transition({perspective:0, 'right': '-760px'}, 850, 'cubic-bezier(0.375,0,0.625,1)');
}

function showNextLevelOnMoneyTree(level){
	var targetId = '#moneyTreeTr' + level;

	$(targetId).transition(
		{ scale: [1.075] }, 500, 'cubic-bezier(0.375,0,0.625,1)',
		function(){
			$(targetId).transition({ scale: [1] }, 500, 'cubic-bezier(0.375,0,0.625,1)');
		}
	);

	setTimeout(function(){
		showNextLevelOnMoneyTree(window.GameVariables.QuestionLevel);
	}, 1025);
}

function showSafetyNetOnMoneyTree(level){
	var targetId = '#moneyTreeTr' + level;

	$(targetId).transition(
		{ scale: [1.075] }, 500, 'cubic-bezier(0.375,0,0.625,1)',
		function(){
			$(targetId).transition({ scale: [1] }, 500, 'cubic-bezier(0.375,0,0.625,1)');
		}
	);
}

function setLevelOnMoneyTree(level){
	$('.moneyTreeLevelWhiteTd').css('color','#FFFFFF');
	$('.moneyTreeLevelWhiteTd').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeAmountWhiteTd').css('color','#FFFFFF');
	$('.moneyTreeAmountWhiteTd').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeLevelTd').css('color','#FEAD13');
	$('.moneyTreeLevelTd').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeAmountTd').css('color','#FEAD13');
	$('.moneyTreeAmountTd').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeAmountWhiteTd').css('background-image','none');
	$('.moneyTreeAmountTd').css('background-image','none');
	$('.moneyTreeLevelWhiteTd').css('background-image','none');
	$('.moneyTreeLevelTd').css('background-image','none');
	$('.moneyTreeLevelWhite1Td').css('color','#FFFFFF');
	$('.moneyTreeLevelWhite1Td').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeAmountWhite1Td').css('color','#FFFFFF');
	$('.moneyTreeAmountWhite1Td').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeLevel1Td').css('color','#FEAD13');
	$('.moneyTreeLevel1Td').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeAmount1Td').css('color','#FEAD13');
	$('.moneyTreeAmount1Td').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeAmountWhite1Td').css('background-image','none');
	$('.moneyTreeAmount1Td').css('background-image','none');
	$('.moneyTreeLevelWhite1Td').css('background-image','none');
	$('.moneyTreeLevel1Td').css('background-image','none');
	$('.moneyTreeDiagonalTd').css('background-image','none');
	$('.moneyTreeDiagonalTd, .moneyTreeDiagonalWhiteTd').css('background-image','none');
	$('.moneyTreeDiagonal1Td').css('background-image','none');
	$('.moneyTreeDiagonal1Td, .moneyTreeDiagonalWhiteTd').css('background-image','none');

	for(var i = 1; i < level; i++){
		var targetId = '#moneyTreeTr' + i;
		$(targetId + ' .moneyTreeDiagonalTd').css('background-image','url(' + 'Images/white_diagonal_money_tree.png' +')');
		$(targetId + ' .moneyTreeDiagonal1Td').css('background-image','url(' + 'Images/white_diagonal_money_tree.png' +')');
		
		if((i + 1) == level){
			$(targetId + ' td').css('background-image','url(' + 'Images/follower.png' +')');
			$(targetId + ' .moneyTreeLevelTd').css('color','#000000');
			$(targetId + ' .moneyTreeLevelTd').css('text-shadow','0px 0px transparent');
			$(targetId + ' .moneyTreeLevelWhiteTd').css('color','#FFFFFF');
			$(targetId + ' .moneyTreeAmountTd').css('color','#000000');
			$(targetId + ' .moneyTreeAmountTd').css('text-shadow','0px 0px transparent');
			$(targetId + ' .moneyTreeAmountWhiteTd').css('color','#FFFFFF');
			$(targetId + ' .moneyTreeLevel1Td').css('color','#000000');
			$(targetId + ' .moneyTreeLevel1Td').css('text-shadow','0px 0px transparent');
			$(targetId + ' .moneyTreeLevelWhite1Td').css('color','#FFFFFF');
			$(targetId + ' .moneyTreeAmount1Td').css('color','#000000');
			$(targetId + ' .moneyTreeAmount1Td').css('text-shadow','0px 0px transparent');
			$(targetId + ' .moneyTreeAmountWhite1Td').css('color','#FFFFFF');
			$(targetId + ' .moneyTreeDiagonalTd').css('background-image','url(' + 'Images/white_diagonal_money_tree_highlight.png' +')');
			$(targetId + ' .moneyTreeDiagonal1Td').css('background-image','url(' + 'Images/white_diagonal_money_tree_highlight.png' +')');

		}
	}
}

function scaleTreeLevels(level){
	var targetId = '#moneyTreeTr' + level;
	
	var previousTargetId = '#moneyTreeTr' + (level - 1);
	
	$(targetId + ' td').css('background-image','url(' + 'Images/follower.png' +')');
	$(targetId + ' .moneyTreeLevelTd').css('color','#000000');
	$(targetId + ' .moneyTreeLevelTd').css('text-shadow','0px 0px transparent');
	$(targetId + ' .moneyTreeLevelWhiteTd').css('color','#FFFFFF');
	$(targetId + ' .moneyTreeAmountTd').css('color','#000000');
	$(targetId + ' .moneyTreeAmountTd').css('text-shadow','0px 0px transparent');
	$(targetId + ' .moneyTreeAmountWhiteTd').css('color','#FFFFFF');
	$(targetId + ' .moneyTreeLevel1Td').css('color','#000000');
	$(targetId + ' .moneyTreeLevel1Td').css('text-shadow','0px 0px transparent');
	$(targetId + ' .moneyTreeLevelWhite1Td').css('color','#FFFFFF');
	$(targetId + ' .moneyTreeAmount1Td').css('color','#000000');
	$(targetId + ' .moneyTreeAmount1Td').css('text-shadow','0px 0px transparent');
	$(targetId + ' .moneyTreeAmountWhite1Td').css('color','#FFFFFF');
	$(targetId + ' .moneyTreeDiagonalTd').css('background-image','url(' + 'Images/white_diagonal_money_tree_highlight.png' +')');
	$(targetId + ' .moneyTreeDiagonal1Td').css('background-image','url(' + 'Images/white_diagonal_money_tree_highlight.png' +')');
	
	if((level - 1) % 5 === 0){
		$(previousTargetId + ' td').css('background-image','none');
		$(previousTargetId + ' .moneyTreeLevelWhiteTd').css('color','#FFFFFF');
		$(previousTargetId + ' .moneyTreeLevelWhiteTd').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
		$(previousTargetId + ' .moneyTreeAmountWhiteTd').css('color','#FFFFFF');
		$(previousTargetId + ' .moneyTreeAmountWhiteTd').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
		$(previousTargetId + ' .moneyTreeLevelWhite1Td').css('color','#FFFFFF');
		$(previousTargetId + ' .moneyTreeLevelWhite1Td').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
		$(previousTargetId + ' .moneyTreeAmountWhite1Td').css('color','#FFFFFF');
		$(previousTargetId + ' .moneyTreeAmountWhite1Td').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
		$(previousTargetId + ' .moneyTreeDiagonalTd').css('background-image','url(' + 'Images/white_diagonal_money_tree.png' +')');
		$(previousTargetId + ' .moneyTreeDiagonal1Td').css('background-image','url(' + 'Images/white_diagonal_money_tree.png' +')');

	}
	else{
		$(previousTargetId + ' td').css('background-image','none');
		$(previousTargetId + ' .moneyTreeLevelTd').css('color','#FEAD13');
		$(previousTargetId + ' .moneyTreeLevelTd').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
		$(previousTargetId + ' .moneyTreeAmountTd').css('color','#FEAD13');
		$(previousTargetId + ' .moneyTreeAmountTd').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
		$(previousTargetId + ' .moneyTreeLevel1Td').css('color','#FEAD13');
		$(previousTargetId + ' .moneyTreeLevel1Td').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
		$(previousTargetId + ' .moneyTreeAmount1Td').css('color','#FEAD13');
		$(previousTargetId + ' .moneyTreeAmount1Td').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
		$(previousTargetId + ' .moneyTreeDiagonalTd').css('background-image','url(' + 'Images/white_diagonal_money_tree.png' +')');
		$(previousTargetId + ' .moneyTreeDiagonal1Td').css('background-image','url(' + 'Images/white_diagonal_money_tree.png' +')');
	}
	
	if(level < 15){
		window.GameVariables.ScaleTreeTimeout = setTimeout(function(){
			scaleTreeLevels(level + 1);
		}, 150);
	}
}

function unscaleTreeLevels(level){
	clearTimeout(window.GameVariables.ScaleTreeTimeout);
	$('.moneyTreeLevelWhiteTd').css('color','#FFFFFF');
	$('.moneyTreeLevelWhiteTd').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeAmountWhiteTd').css('color','#FFFFFF');
	$('.moneyTreeAmountWhiteTd').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeLevelTd').css('color','#FEAD13');
	$('.moneyTreeLevelTd').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeAmountTd').css('color','#FEAD13');
	$('.moneyTreeAmountTd').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeAmountWhiteTd').css('background-image','none');
	$('.moneyTreeAmountTd').css('background-image','none');
	$('.moneyTreeLevelWhiteTd').css('background-image','none');
	$('.moneyTreeLevelTd').css('background-image','none');
	$('.moneyTreeLevelWhite1Td').css('color','#FFFFFF');
	$('.moneyTreeLevelWhite1Td').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeAmountWhite1Td').css('color','#FFFFFF');
	$('.moneyTreeAmountWhite1Td').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeLevel1Td').css('color','#FEAD13');
	$('.moneyTreeLevel1Td').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeAmount1Td').css('color','#FEAD13');
	$('.moneyTreeAmount1Td').css('text-shadow','2px 2px 5px black, -1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black');
	$('.moneyTreeAmountWhite1Td').css('background-image','none');
	$('.moneyTreeAmount1Td').css('background-image','none');
	$('.moneyTreeLevelWhite1Td').css('background-image','none');
	$('.moneyTreeLevel1Td').css('background-image','none');
	$('.moneyTreeDiagonalTd').css('background-image','none');
	$('.moneyTreeDiagonalTd, .moneyTreeDiagonalWhiteTd').css('background-image','none');
	$('.moneyTreeDiagonal1Td').css('background-image','none');
	$('.moneyTreeDiagonal1Td, .moneyTreeDiagonalWhiteTd').css('background-image','none');
	setLevelOnMoneyTree(window.GameVariables.QuestionLevel);
}

function showMoneyTree(){
	$('.moneyTreeDiv').css('opacity', 1);
}

function hideMoneyTree(){
	$('.moneyTreeDiv').css('opacity', 0);
}

function hideLevelStrap(){
	$('.currentLevelStrapDiv').transition({perspective:0, 'left':'-504px'}, 375, 'ease-in');
	$('.currentLevelStrap1Div').transition({perspective:0, 'left':'-504px'}, 375, 'ease-in');
}

function showLevelStrap(){
	if(window.GameVariables.UseTopPrizeLevelStrapText == true){
		if(window.GameVariables.QuestionLevel >= window.GameVariables.TopPrizeLevelStrapQuestionNumber){
			$('.currentLevelStrapAmountDiv').html(window.GameVariables.TopPrizeLevelStrapText[window.GameVariables.QuestionLevel - 1]);
		}
		else{
			if(window.GameVariables.UseTopPrizeText == true){
				if(window.GameVariables.QuestionLevel >= window.GameVariables.TopPrizeQuestionNumber){
					$('.currentLevelStrapAmountDiv').html(window.GameVariables.TopPrizeText[window.GameVariables.QuestionLevel - 1]);
				}
				else{
					$('.currentLevelStrapAmountDiv').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
				}
			}
			else{
				$('.currentLevelStrapAmountDiv').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
			}
		}
	}
	else{
		$('.currentLevelStrapAmountDiv').html(window.GameVariables.NumberPrefix + new Intl.NumberFormat(window.GameVariables.LocaleCode, window.GameVariables.FormatOptions).format(window.GameVariables.PrizeAmounts[window.GameVariables.QuestionLevel - 1]).replace(window.GameVariables.ReplaceCharacterBefore, window.GameVariables.ReplaceCharacterAfter).trim() + window.GameVariables.NumberSuffix);
	}
	if(window.GameVariables.QuestionLevel >= 15){
		$('.sideStrapGoldImg').css('opacity', 1);
	}
	$('.currentLevelStrapDiv').transition({perspective:0, 'left':'0px'}, 375, 'ease-out');
	$('.currentLevelStrap1Div').transition({perspective:0, 'left':'-100px'}, 375, 'ease-in');
}

function animateLevelStrapGlow(){
	
}







