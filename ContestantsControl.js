function getContestantsForGame(){
	for(var i = 0; i < 10; i++){
		if(i == 0)
		{
			var contestant = new Contestant("Contestant", "One", "N/A");
			window.GameVariables.FastestFingerContestants.push(contestant);
			
			var targetId = '#fastestContestant' + (i + 1);
			$(targetId + ' .fastestContestantNameP').html(window.GameVariables.FastestFingerContestants[i].FirstName + ' ' + window.GameVariables.FastestFingerContestants[i].LastName)
		}
		if(i == 1)
		{
			var contestant = new Contestant("Contestant", "Two", "N/A");
			window.GameVariables.FastestFingerContestants.push(contestant);
			
			var targetId = '#fastestContestant' + (i + 1);
			$(targetId + ' .fastestContestantNameP').html(window.GameVariables.FastestFingerContestants[i].FirstName + ' ' + window.GameVariables.FastestFingerContestants[i].LastName)
		}
		if(i == 2)
		{
			var contestant = new Contestant("Contestant", "Three", "N/A");
			window.GameVariables.FastestFingerContestants.push(contestant);
			
			var targetId = '#fastestContestant' + (i + 1);
			$(targetId + ' .fastestContestantNameP').html(window.GameVariables.FastestFingerContestants[i].FirstName + ' ' + window.GameVariables.FastestFingerContestants[i].LastName)
		}
		if(i == 3)
		{
			var contestant = new Contestant("Contestant", "Four", "N/A");
			window.GameVariables.FastestFingerContestants.push(contestant);
			
			var targetId = '#fastestContestant' + (i + 1);
			$(targetId + ' .fastestContestantNameP').html(window.GameVariables.FastestFingerContestants[i].FirstName + ' ' + window.GameVariables.FastestFingerContestants[i].LastName)
		}
		if(i == 4)
		{
			var contestant = new Contestant("Contestant", "Five", "N/A");
			window.GameVariables.FastestFingerContestants.push(contestant);
			
			var targetId = '#fastestContestant' + (i + 1);
			$(targetId + ' .fastestContestantNameP').html(window.GameVariables.FastestFingerContestants[i].FirstName + ' ' + window.GameVariables.FastestFingerContestants[i].LastName)
		}
		if(i == 5)
		{
			var contestant = new Contestant("Contestant", "Six", "N/A");
			window.GameVariables.FastestFingerContestants.push(contestant);
			
			var targetId = '#fastestContestant' + (i + 1);
			$(targetId + ' .fastestContestantNameP').html(window.GameVariables.FastestFingerContestants[i].FirstName + ' ' + window.GameVariables.FastestFingerContestants[i].LastName)
		}
		if(i == 6)
		{
			var contestant = new Contestant("Contestant", "Seven", "N/A");
			window.GameVariables.FastestFingerContestants.push(contestant);
			
			var targetId = '#fastestContestant' + (i + 1);
			$(targetId + ' .fastestContestantNameP').html(window.GameVariables.FastestFingerContestants[i].FirstName + ' ' + window.GameVariables.FastestFingerContestants[i].LastName)
		}
		if(i == 7)
		{
			var contestant = new Contestant("Contestant", "Eight", "N/A");
			window.GameVariables.FastestFingerContestants.push(contestant);
			
			var targetId = '#fastestContestant' + (i + 1);
			$(targetId + ' .fastestContestantNameP').html(window.GameVariables.FastestFingerContestants[i].FirstName + ' ' + window.GameVariables.FastestFingerContestants[i].LastName)
		}
		if(i == 8)
		{
			var contestant = new Contestant("Contestant", "Nine", "N/A");
			window.GameVariables.FastestFingerContestants.push(contestant);
			
			var targetId = '#fastestContestant' + (i + 1);
			$(targetId + ' .fastestContestantNameP').html(window.GameVariables.FastestFingerContestants[i].FirstName + ' ' + window.GameVariables.FastestFingerContestants[i].LastName)
		}
		if(i == 9)
		{
			var contestant = new Contestant("Contestant", "Ten", "N/A");
			window.GameVariables.FastestFingerContestants.push(contestant);
			
			var targetId = '#fastestContestant' + (i + 1);
			$(targetId + ' .fastestContestantNameP').html(window.GameVariables.FastestFingerContestants[i].FirstName + ' ' + window.GameVariables.FastestFingerContestants[i].LastName)
		}
	}
}

function Contestant(firstName, lastName, location){
	this.FirstName = firstName;
	this.LastName = lastName;
	this.Location = location;
}

function showNameStrap(){
	$('.contestantNameAndLocationDiv').css('opacity', 1);
}

function hideNameStrap(){
	$('.contestantNameAndLocationDiv').css('opacity', 0);
}

function showNameForStrap(){
	$('.contestantNameForStrapP').css('opacity', 1);
	$('.contestantLocationForStrapP').css('opacity', 1);
}

function hideNameForStrap(){
	$('.contestantNameForStrapP').css('opacity', 0);
	$('.contestantLocationForStrapP').css('opacity', 0);
}