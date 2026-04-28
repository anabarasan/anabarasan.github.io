var categoryList,
    categories,
    category,
    categoryDisplay,
    word,
	letters,
	score,
	canvas,
	context,
	play,
	clear,
    wordCategory,
	wordToGuess,
	wordLength,
	spaces,
	badGuesses,
	correctGuesses,
	gameOver;
	
categoryList = ["Animals", "Countries", "Fruits", "Vegetables"];
categories = {
    "Animals"    : ["alligator","ant","bear","bee","bird","camel","cat","cheetah","chicken","chimpanzee","cow","crocodile","deer","dog","dolphin","duck","eagle","elephant","fish","fly","fox","frog","giraffe","goat","goldfish","hamster","hippopotamus","horse","kangaroo","kitten","lion","lobster","monkey","octopus","owl","panda","pig","puppy","rabbit","rat","scorpion","seal","shark","sheep","snail","snake","spider","squirrel","tiger","turtle","wolf","zebra"],
    "Countries"    : ["Abkhazia", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos Islands", "Colombia", "Comoros", "Cook Islands", "Costa Rica", "Cote d Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Federated States of Micronesia", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Nagorno Karabakh", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Korea", "Northern Cyprus", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian National Authority", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of the Congo", "Reunion", "Romania", "Russia", "Rwanda", "Sahrawi Arab Democratic Republic", "Saint Barthelemy", "Saint Helena Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Príncipe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "Somaliland", "South Africa", "South Korea", "South Ossetia", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "The Bahamas", "The Gambia", "Togo", "Tokelau", "Tonga", "Transnistria", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Virgin Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Wallis and Futuna", "Yemen", "Zambia", "Zimbabwe"],
    "Fruits"     : ["apple","banana","cherry","grapefruit","grapes","lemon","lime","melon","orange","peach","pear","persimmon","pineapple","plum","strawberry","tangerine","watermelon"],
    "Vegetables" : ["asparagus","beans","broccoli","cabbage","carrot","celery","corn","cucumber","eggplant","green pepper","lettuce","onion","peas","potato","pumpkin","radish","spinach","sweet potato","tomato","turnip"]
};

function getCategory () {
    return categoryList[parseInt(Math.random() * categoryList.length)];    
}

function getWord(category) {
    var wordlist = categories[category];
    return wordlist[parseInt(Math.random() * wordlist.length)]
}

function init() {
	if (localStorage.getItem('hangmanWin') == null) {
		localStorage.setItem('hangmanWin', '0');
	} 
	if (localStorage.getItem('hangmanLose') == null) {
		localStorage.setItem('hangmanLose', '0');
	}
	w = screen.availWidth <= 800 ? screen.availWidth : 800;
	play = document.getElementById("play");
	play.addEventListener('click', newGame, false);
	play.style.display='inline-block';
	clear = document.getElementById("clear");
	clear.addEventListener('click', resetScore, false);
	clear.style.display='inline-block';
	categoryDisplay = document.getElementById("category");
	showScore();
}

function newGame() {
	var placeholders = '',
	frag = document.createDocumentFragment(),
	abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
		   'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
   
	badGuesses = 0;
	correctGuesses = 0;
	spaces = 0;
    wordCategory = getCategory();
	wordToGuess = getWord(wordCategory).toLowerCase();
	wordLength = wordToGuess.length;
	
	// create row of underscores the same length as letters to guess
	for (var i = 0; i < wordLength; i++) {
		if (wordToGuess[i] === ' ') {
			placeholders += ' ';
			spaces += 1;
		} else {
			placeholders += '_';
		}
	}
	word.innerHTML = placeholders;
	correctGuesses = spaces;
	
	// create an alphabet pad to select letters
	letters.innerHTML = '';
	for (i = 0; i < 26; i++) {
		var div = document.createElement('div');
		div.style.cursor = 'pointer';
		div.innerHTML = abc[i];
		div.onclick = getLetter;
		frag.appendChild(div);
	}
	letters.appendChild(frag);
	
	gameOver = false;
	
	canvas.width = canvas.width;
    categoryDisplay.innerHTML = wordCategory;
	console.log(wordCategory, wordToGuess);
}

function resetScore() {
	localStorage.setItem('hangmanWin', '0');
	localStorage.setItem('hangmanLose', '0');
	showScore();
}

function getLetter() {
	if (!gameOver) {
		checkLetter(this.innerHTML);
		this.innerHTML = '&nbsp;';
		this.style.cursor = 'default';
		this.onclick = null;
	}
}

function checkLetter(letter) {
	var wrongGuess = true,
		placeholders = word.innerHTML.split('');
	letter = letter.toLowerCase();
	for (i = 0; i < wordLength; i++) {
		if (wordToGuess[i] === letter) {
			placeholders[i] = letter.toUpperCase();
			correctGuesses += 1;
			if (correctGuesses == wordLength) {
				localStorage.setItem('hangmanWin', parseInt(localStorage.getItem('hangmanWin')) + 1);
				gameOver = true;
				setTimeout(showScore, 1000);
                alert("Good Job");
			}
			wrongGuess = false;
		}
	}
	word.innerHTML = placeholders.join('');
	if (wrongGuess) {
		badGuesses += 1;
		drawImage(badGuesses);
		if (gameOver) {
			localStorage.setItem('hangmanLose', parseInt(localStorage.getItem('hangmanLose')) + 1);
			showResult();
			setTimeout(showScore, 1000);
            alert("You Lose.  Try again");
		}
	}
}

function showResult() {
	var placeholders = word.innerHTML;
	placeholders = placeholders.split('');
	for (i = 0; i < wordLength; i++) {
		if (placeholders[i] == '_') {
		placeholders[i] = '<span style="color:red">' + wordToGuess.charAt(i).toUpperCase() + '</span>';
		}
	}
	word.innerHTML = placeholders.join('');
}

function showScore() {
	var won = localStorage.getItem('hangmanWin'),
		lost = localStorage.getItem('hangmanLose')
		
	score.innerHTML = 'Won: ' + won + ' Lost: ' + lost;
}

function drawImage (wrongGuesses) {
	var cHeight = canvas.height,
		cWidth = canvas.width;
	switch (wrongGuesses) {
		case 1:
			context.fillStyle = "green";
			context.fillRect(0, cHeight - 20, cWidth, 20);
			break;
		case 2:
			context.fillStyle = "brown";
			context.fillRect(20, 0, 20, cHeight - 20);
			context.fillRect(40, 0, 150, 20);
			break;
		case 3:
			context.strokeStyle = "#000";
			context.moveTo(150, 20);
			context.lineTo(150, 50);
			break;
		case 4:
			context.arc(150, 80, 30, 0, Math.PI*2, false);
			break;
		case 5:
			context.moveTo(150, 110);
			context.lineTo(150, 200);
			break;
		case 6:
			context.moveTo(150, 140);
			context.lineTo(120, 160);
			context.moveTo(150, 140);
			context.lineTo(180, 160);
			break;
		case 7:
			context.moveTo(150, 200);
			context.lineTo(120, 220);
			context.moveTo(150, 200);
			context.lineTo(180, 220);
			gameOver = true;
			break;
	}
	context.stroke();
}

$(document).ready( function () {
	word = document.getElementById("word");
	letters = document.getElementById("letters");
	score = document.getElementById("score");
	canvas = document.getElementById('stage');
	context = canvas.getContext('2d');
	init();
});