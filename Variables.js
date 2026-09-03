(function(gameVariables) {
	/* Initialization Variables */
	gameVariables.IsPAFLifeLineUsed = false;
	gameVariables.IsFFLifeLineUsed = false;
	gameVariables.IsATALifeLineUsed = false;
	gameVariables.IsSTQLifeLineUsed = false;
	gameVariables.IsSTQLifeLineActiveAtStart = false;
	gameVariables.StartingQuestionLevel = 8;
	
	gameVariables.TotalPrizeText = "THẮNG CUỘC";
	gameVariables.MillionaireText = "TRIỆU PHÚ";
	
	gameVariables.ContestantFirstName = "Nguyễn";
	gameVariables.ContestantLastName = "Văn A";
	gameVariables.ContestantLocation = "Việt Nam";

	gameVariables.BreakText = "NGHI GIAI LAO";
	gameVariables.RightAnswerPrizePrefixText = "CORRECT: ";
	gameVariables.WalkAwayPrizePrefixText = "WALKAWAY: ";
	gameVariables.PrizeAmountWrongPrefixText = "PRIZEAMOUNTWRONG: ";
	gameVariables.PrizeAfterWrongPrefixText = "PRIZEAFTERWRONG: ";
	gameVariables.QuestionsLeftPrefixText = "QLEFT: ";
	gameVariables.RightAnswerPrizeSuffixText = "";
	gameVariables.WalkAwayPrizeSuffixText = "";
	gameVariables.PrizeAmountWrongSuffixText = "";
	gameVariables.PrizeAfterWrongSuffixText = "";
	gameVariables.QuestionsLeftSuffixText = "";
	
	/* Number Format Settings */
	gameVariables.LocaleCode = "vi-VN";				/* Uses the country's locale code to determine the numbering system that the country uses. See the "List of Locales.txt" file for a list of locale codes. */
	gameVariables.FormatOptions = {
		style: "decimal",							/* The formatting style to use. Use code "decimal" for plain number formatting and "currency" for currency formatting. */
		currency: "USD",							/* The ISO currency code that is used to identify the currency. If a currency is not in the list of ISO 4217 currency codes, it will not display the symbol of said currency. See the "List of Current Currencies (List One).xml" and "List of Past Currencies (List Three).xml" files for a list of currencies (Look for the three-lettered code between <Ccy> & </Ccy>). */
		currencyDisplay: "symbol",					/* Use code "symbol" to use a localized currency symbol (A.K.A. the default option), "narrowSymbol" to use a narrow format symbol ("$100" rather than "US$100"), "code" to use the ISO currency code and "name" to use a localized currency name instead of a symbol. */
		numberingSystem: "latn",					/* The numbering system to be used for the amounts. Possible values include: "adlm", "ahom", "arab", "arabext", "bali", "beng", "bhks", "brah", "cakm", "cham", "deva", "diak", "fullwide", "gong", "gonm", "gujr", "guru", "hanidec", "hmng", "hmnp", "java", "kali", "khmr", "knda", "lana", "lanatham", "laoo", "latn"(Default), "lepc", "limb", "mathbold", "mathdbl", "mathmono", "mathsanb", "mathsans", "mlym", "modi", "mong", "mroo", "mtei", "mymr", "mymrshan", "mymrtlng", "newa", "nkoo", "olck", "orya", "osma", "rohg", "saur", "segment", "shrd", "sind", "sinh", "sora", "sund", "takr", "talu", "tamldec", "telu", "thai", "tibt", "tirh", "vaii", "wara", "wcho". */
		minimumFractionDigits: 0,					/* Displays the number of Fraction Digits at the end of the amount. */
	};
	gameVariables.ReplaceCharacterBefore = "";		/* Targets the exact character that you want to replace. */
	gameVariables.ReplaceCharacterAfter = "";		/* Replaces the targeted character with a different one. */
	gameVariables.NumberPrefix = "";				/* The text that displays before the amount. */
	gameVariables.NumberSuffix = "";				/* The text that displays after the amount. */
	gameVariables.LevelNumberingSystem = "latn";	/* The numbering system to be used for the question levels. Uses the same numbering system for the amounts. */
	gameVariables.PaFNumberingSystem = "latn";		/* The numbering system to be used for the Phone a Friend timer. Uses the same numbering system for the amounts. */
	gameVariables.AtANumberingSystem = "latn";		/* The numbering system to be used for the Ask the Audience percentages. Uses the same numbering system for the amounts. */
	
	gameVariables.UseTopPrizeText = false;			/* If set to true, the top prize amount(s) will be displayed in text instead of a number. */
	gameVariables.TopPrizeQuestionNumber = 15;		/* The value where the top prize text(s) are displayed above the level set by this value. */
	gameVariables.TopPrizeText = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","$1 MILLION"];
	gameVariables.UseTopPrizeLevelStrapText = false;	/* If set to true, the top prize amount shown in the Level Strap will be displayed in text instead of a number. */
	gameVariables.TopPrizeLevelStrapQuestionNumber = 15;	/* The value where the top prize text in the Level Strap is displayed above the level set by this value. */
	gameVariables.TopPrizeLevelStrapText = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","$1 MILLION"];
	gameVariables.UseZeronaireText = false;			/* If set to true, when a contestant walks away with nothing, the Zeronaire text is displayed instead of just 0 and a currency. */
	gameVariables.ZeronaireText = "Nothing";		/* The text that displays when a contestant walks away with nothing. */
	
	gameVariables.TreeScale = 100;					/* DEFAULT: 100%; The percentage of scale on the X axis (left and right) for the money tree. */
	gameVariables.TreeBackgroundPosition = -680;	/* DEFAULT: -870; The position of the background on the X axis (left and right) in pixels that is displayed when the amount from the money tree is highlighted. The maximum position is -692px. */
	gameVariables.WinTextScale = 100;				/* DEFAULT: 100%; The percentage of scale on the X axis (left and right) for the text that shows the amount that the contestant has won. */
	gameVariables.TPMTextScale = 100;				/* DEFAULT: 100%; The percentage of scale on the X axis (left and right) for the text that shows the total prize money. */
	
	/* Do not modify the value of this variable, fastest finger is not fully implemented yet... */
	gameVariables.IsPlayingFasestFinger = false;
	/**************/
	
	/* Boolean Variables */
	gameVariables.IsNameStrapShowing = false;
	gameVariables.IsMoneyTreeShowing = false;
	gameVariables.IsLogoShowing = false;
	gameVariables.IsExplainingRules = true;
	gameVariables.IsFirstQuestionOfGame = true;
	gameVariables.IsSTQActive = false;
	gameVariables.IsInCommercial = true;
	gameVariables.IsLevelStrapShowing = false;
	gameVariables.STQSlideIn = false;
	gameVariables.IsLifeLineStrapShowing = false;
	gameVariables.IsTotalPrizeMoneyShowing = false;
	gameVariables.IsWalkingAway = false;
	gameVariables.CannotLockInFinalAnswer = false;
	gameVariables.QuestionInProgress = false;
	gameVariables.ContinuePulsingLifeLineCenter = false;
	gameVariables.AnswerAIsOut = false;
	gameVariables.AnswerBIsOut = false;
	gameVariables.AnswerCIsOut = false;
	gameVariables.AnswerDIsOut = false;
	gameVariables.ShowLifeLineCenteredAnimation = false;
	gameVariables.FirstTierBackgroundSoundPlaying = false;

	/* Number Variables */
	gameVariables.AnswerAPercent = 0;
	gameVariables.AnswerBPercent = 0;
	gameVariables.AnswerCPercent = 0;
	gameVariables.AnswerDPercent = 0;
	gameVariables.QuestionLevel = null;
	gameVariables.RevealAnswerCounter = 0;
	gameVariables.RevealFastestFingerWinnersCounter = 0;
	gameVariables.RevealFastestFingerContestantCounter = 0;
	gameVariables.FastestFingerConstestantWinner = 3;
	gameVariables.FastestFingerRevealAnswerCounter = 0;
	gameVariables.FastestFingerSequenceCounter = 0;
	gameVariables.MoneyTreeSequenceCounter = 0;
	gameVariables.QuestionSequenceCounter = 0;
	gameVariables.pafLifeLineSequenceCounter = 0;
	gameVariables.gameoverSequenceCounter = 0;
	gameVariables.ataLifeLineSequenceCounter = 0;
	gameVariables.stqLifeLineSequenceCounter = 0;
	gameVariables.walkAwaySequenceCounter = 0;
	gameVariables.commericalSequenceCounter = 0;
	gameVariables.ScaleTreeCounter = 0;
	gameVariables.LifeLineAnimationCounter = 0;
	gameVariables.STQUnlockedLevel = 6;
	gameVariables.QuestionsLeft = 15;
		
	/* String and Char Variables */
	gameVariables.CurrentCorrectAnswer = "";
	gameVariables.CurrentTargetAnswer = "";
	
	/* Audio Variables */
	gameVariables.GeneralSound = null;
	gameVariables.LifelineActiveSound = null;
	gameVariables.LifelinePassiveSound = null;
	gameVariables.LongActiveSound = null;
	gameVariables.LongPassiveSound = null;
	gameVariables.ShortActiveSound = null;
	gameVariables.ShortPassiveSound = null;

	/* Array Variables */
	gameVariables.FastestFingerQuestions = [];
	gameVariables.QuestionsAndAnswers = [];
	gameVariables.Info = [];
	gameVariables.SwitchQuestionsAndAnswers = [];
	gameVariables.AskTheAudienceVotingPercents = [];
	gameVariables.PrizeAmounts = [1000000,2000000,3000000,4000000,5000000,6000000,8000000,10000000,14000000,22000000,30000000,60000000,120000000,250000000,500000000,0];
	gameVariables.FastestFingerContestantWinners = [false,false,true,false,false,false,true,false,false,false];
	gameVariables.FastestFingerContestantTimes = [2.541,4.541,5.541,6.541,9.541,13.541,15.541,16.541,7.541,19.541];
	gameVariables.FastestFingerContestants = []
	gameVariables.LightsDownSounds = ["q1_to_q5_lights_down.mp3","q1_to_q5_lights_down.mp3","q1_to_q5_lights_down.mp3","q1_to_q5_lights_down.mp3","q1_to_q5_lights_down.mp3","lights_down_1.mp3","lights_down_2.mp3","lights_down_3.mp3","lights_down_4.mp3","lights_down_5.mp3","lights_down_1.mp3","lights_down_2.mp3","lights_down_3.mp3","lights_down_4.mp3","lights_down_5.mp3"];
	gameVariables.RoundBackgroundSounds = ["q1_to_q5_bed.mp3","q1_to_q5_bed.mp3","q1_to_q5_bed.mp3","q1_to_q5_bed.mp3","q1_to_q5_bed.mp3","q6_bed.mp3","q7_bed.mp3","q8_bed.mp3","q9_bed.mp3","q10_bed.mp3","q11_bed.mp3","q12_bed.mp3","q13_bed.mp3","q14_bed.mp3","q15_bed.mp3"];
	gameVariables.FinalAnswerSounds = ["","","","","","final_answer_1.mp3","final_answer_2.mp3","final_answer_3.mp3","final_answer_4.mp3","final_answer_5.mp3","final_answer_1.mp3","final_answer_2.mp3","final_answer_3.mp3","final_answer_4.mp3","final_answer_5.mp3"];
	gameVariables.CorrectAnswerSounds = ["q1_to_q4_correct.mp3","q1_to_q4_correct.mp3","q1_to_q4_correct.mp3","q1_to_q4_correct.mp3","q5_correct.mp3","q6_correct.mp3","q7_correct.mp3","q8_correct.mp3","q9_correct.mp3","q10_correct.mp3","q11_correct.mp3","q12_correct.mp3","q13_correct.mp3","q14_correct.mp3","q15_correct.mp3"];
	gameVariables.WrongAnswerSounds = ["q1_to_q5_lose.mp3","q1_to_q5_lose.mp3","q1_to_q5_lose.mp3","q1_to_q5_lose.mp3","q1_to_q5_lose.mp3","q6_lose.mp3","q7_lose.mp3","q8_lose.mp3","q9_lose.mp3","q10_lose.mp3","q11_lose.mp3","q12_lose.mp3","q13_lose.mp3","q14_lose.mp3","q15_lose.mp3"];

	/* Interval/Timeout Variables */
	gameVariables.ShowAnswerTimeout = null;
	gameVariables.ShowWinnerTimeout = null;
	gameVariables.GlintTimeout = null;
	gameVariables.ScaleTreeTimeout = null;
	gameVariables.PAFClockTimeout = null;

})(window.GameVariables = window.GameVariables || {});








