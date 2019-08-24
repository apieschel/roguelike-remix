// SOURCE: https://codepen.io/freeCodeCamp/pen/apLXEJ

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Define sound effects:
var challengeSound = new Audio('http://soundbible.com/mp3/Computer_Magic-Microsift-1901299923.mp3');
var hitSound = new Audio('http://soundbible.com/mp3/Jab-SoundBible.com-1806727891.mp3');
var newItemSound = new Audio('http://soundbible.com/mp3/Ting-Popup_Pixels-349896185.mp3');
var bonusSound = new Audio('http://soundbible.com/mp3/Music_Box-Big_Daddy-1389738694.mp3');
var deathSound = new Audio('http://soundbible.com/mp3/Grenade-SoundBible.com-1777900486.mp3');
var winner = new Audio('http://soundbible.com/mp3/Triangle Dinner Bell-SoundBible.com-220988408.mp3');

// Define colors:
var dark = '#0084ff';
var empty = '#196111';
var user = '#ffc952';
var blue = '#5677FF';
var itemBonus = '#FFCF5F';
var gray = 'rgb(180,180,180)';
var mint = '#67D5B5';
var gold = '#ffc952';
var brightBlue = '#00dffc';
var pink = '#ff7473';
var barrierColor = '#FFD740';
var headerBackground = '#19281E';
var alarm = '#F8002C';
var red = '#FF0000';

// Define Skill Items:
var skills = {
	'Bootstrap': ['https://robohash.org/one', 'You mastered responsive web design with Bootstrap!'],
	'Bower': ['https://robohash.org/two', 'Your workflow skills improve with Bower!'],
	'CamperBot': ['https://robohash.org/three', 'You completed a 100 day streak at freeCodeCamp! CamperBot joined your team!'],
	'Codepen': ['https://robohash.org/four', 'Your project made the front page of Codepen! Respect!'],
	'CSS3': ['https://robohash.org/five', 'You gained valuable style skills, you can now vertically center text!'],
	'D3': ['https://robohash.org/six', 'You mastered D3 and now can transform arbitrary data into beautiful charts!'],
	'ES6': ['https://robohash.org/seven', 'You learned ES6! Your attack improves with fat arrow function skills!'],
	'Git': ['https://robohash.org/eight', 'You mastered git, your workflow continues to improve!'],
	'Github': ['https://robohash.org/nine', 'You contributed to Open Source! Octocat joined your team!'],
	'Gitter': ['https://robohash.org/ten', 'Campers gave you brownie points in Gitter Chat!'],
	'Grunt': ['https://robohash.org/eleven', 'Your workflow is totally automated!'],
	'Heroku': ['https://robohash.org/twelve', 'You\'re deploying apps from Heroku!'],
	'HTML5': ['https://robohash.org/thirteen', 'You\'ve become a master of HTML5!'],
	'jQuery': ['https://robohash.org/fourteen', 'You mastered jQuery! DOM selection is a piece of cake for you!'],
	'Javascript': ['https://robohash.org/fifteen', 'You learned about hoisting and callbacks in Javascript!'],
	'MongoDB': ['https://robohash.org/sixteen', 'You became a database champ with MongoDB!'],
	'NodeJS': ['https://robohash.org/seventeen', 'You started coding Javascript on the back end! You gained isomorphic attack power!'],
	'React': ['https://robohash.org/eighteen', 'You gained powerful Virtual DOM abilities! JSX has been added to your weapons list!'],
	'Redux': ['https://robohash.org/nineteen', 'You obtained Redux Superpowers! All of your items are now immutable!'],
	'Sass': ['https://robohash.org/twenty', 'Your CSS has become Sassy!'],
	'StackOverflow': ['https://robohash.org/twentyone', 'You can finally vote on StackOverflow answers!'],
	'Sublime': ['https://robohash.org/twentytwo', 'Your code editing skills are leveled up with Sublime Text!'],
	'Terminal': ['https://robohash.org/twentythree', 'You\'ve become a master of the command line!'],
	'Twitter': ['https://robohash.org/twentyfour', 'Developers are following you on Twitter!'],
	'Webpack': ['https://robohash.org/twentyfive', 'Your build skills are unmatched with Webpack! Gained Hot Reload as a Summon!']
}

// Define Challenges:
var challenges = {
	'front-end-1': [ 150, 'You built a tribute page, congratulations!'],
	'front-end-2': [ 250, 'You completed the Wikipedia Viewer project!'],
	'front-end-3': [ 350, 'You finished the Pomodoro Clock! Your productivity rises by 3000 points!'],
	'front-end-4': [ 450, 'You built a Tic Tac Toe Game! And wrote an unbeatable algorithm! Great work!'],
	'front-end-5': [ 550, 'You built a Simon Game! Your skills are really looking good!'],
	'data-viz-1':  [ 550, 'You built a Markdown Previewer using React and Sass, impressive!'],
	'data-viz-2':  [ 700, 'You built a Recipe Box App! Your friends are getting jealous!'],
	'data-viz-3':  [ 850, 'You created stunning bar graphs, scatterplots, heatmaps, and force directed layouts with D3!'],
	'data-viz-4':  [ 900, 'You completed a Javascript version of Conway\'s Game of Life, mesmerizing!'],
	'data-viz-5':  [ 1050, 'You built a Roguelike Dungeon Crawler! Unbelievable!!!'],
	'back-end-1':  [ 1200, 'You created a File Metadata Microservice! Your friends are really jealous now!'],
	'back-end-2':  [ 1400, 'You created a Voting App, awesome!'],
	'back-end-3':  [ 1650, 'You built a Nightlife Coordination App! Party on!'],
	'back-end-4':  [ 1800, 'You created a Book Trading Club App! Your parents\' friends thank you!'],
	'back-end-5':  [ 2000, 'You built a Pinterest Clone! Bring on the Non-Profit Projects!']
};

// Define boss HP:
var bossHP = 1000000;

// Image URLs for certification img tags:
var certificationsList = {
	'Front': 'http://i1361.photobucket.com/albums/r662/bonham000/Roguelike/frontend-cert_zpsq7qjoxm8.png',
	'Viz': 'http://i1361.photobucket.com/albums/r662/bonham000/Roguelike/dataviz-cert_zpshjjcrndr.png',
	'Back': 'http://i1361.photobucket.com/albums/r662/bonham000/Roguelike/backend-cert_zpsnmwzk83w.png'
};

// Root Component:
class App extends React.Component {
	constructor() {
		super();
		this.state = {
      intervalID: 0,
      speed: 100,
      paused: false,
			sound: true,
			about: false,
			replay: false,
			playing: true,
			game: 'alive',
			userLocation: '',
			offset: 130,
			map: [],
			renderMap: [],
			frontEndChallenges: [],
			dataVizChallenges: [],
			backEndChallenges: [],
			skillItems: [],
			life: 5000,
			attackPower: 50,
			experience: 0,
			certifications: [],
			level: 1,
			header: 'Welcome to the freeCodeCamp Dungeon Crawler Game'
		};

		this.startGame = this.startGame.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.generateMap = this.generateMap.bind(this);
		this.updateMap = this.updateMap.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleAI = this.handleAI.bind(this);
		this.handleBattle = this.handleBattle.bind(this);
		this.handleDeath = this.handleDeath.bind(this);
		this.handleSound = this.handleSound.bind(this);
    this.manualMove = this.manualMove.bind(this);
	}
	// Allow the user to mute the sound:
	handleSound() {
		if (this.state.sound) {
			this.setState({
				sound: false
			});
		}
		else {
			this.setState({
				sound: true
			});
		};
	};
	startGame() {
		if (this.state.sound) { bonusSound.play(); }
		this.setState({
			about: false
		});
	}
	resetGame() {
		// location.reload();
		document.getElementById('headerBar').style.background = headerBackground;

		this.setState({
			about: false,
			replay: false,
			playing: true,
			game: 'alive',
			userLocation: '',
			offset: 130,
			frontEndChallenges: [],
			dataVizChallenges: [],
			backEndChallenges: [],
			skillItems: [],
			life: 5000,
			attackPower: 50,
			experience: 0,
			certifications: [],
			level: 1,
			header: 'Welcome to the freeCodeCamp Dungeon Crawler Game'
		});
		
		this.generateMap();

		challenges['front-end-1'][0] = 150;
		challenges['front-end-2'][0] = 250;
		challenges['front-end-3'][0] = 350;
		challenges['front-end-4'][0] = 450;
		challenges['front-end-5'][0] = 550;
		challenges['data-viz-1'][0]  = 550;
		challenges['data-viz-2'][0]  = 700;
		challenges['data-viz-3'][0]  = 850;
		challenges['data-viz-4'][0]  = 900;
		challenges['data-viz-5'][0]  = 105;
		challenges['back-end-1'][0]  = 1200;
		challenges['back-end-2'][0]  = 1400;
		challenges['back-end-3'][0]  = 1650;
		challenges['back-end-4'][0]  = 1800;
		challenges['back-end-5'][0]  = 2000;

	}
	// Function to generate map data on initial render of page:
	generateMap() {
		var w = 1000;
		var h = 5000;
		var gridWidth = 50;
		var gridHeight = gridWidth;
		var numRows = h / gridWidth;
		var arr = [];

		var userIndex;
		var initMap = [];

		// Render an array of 2000 items based on specified dimensions:
		for (var a = 0; a < (w / gridWidth) * numRows; a++) {

			// Generate a random number to determine if cells will be filled or not
			var rand = Math.round(Math.random() * 5);
			// 1 represents solid cells; 0 represents empty cells — random number is not 1, make it 0:
			if (rand !== 1) { rand = 0; }

			var user = 0;

			// Boss and User positions are hard-coded; all other cells are distributed randomly:

			// Set boss position at top of map:
			if (a === 47 || a === 48 || a === 49 || a === 50 || a === 67 || a === 70 || a === 87 || a === 90 || a === 107 || a === 108 || a === 109 || a === 110) { rand = 'barrier'; }
			else if (a === 68 || a === 69 || a === 88 || a === 89) { rand = 'boss' }
			// Set user position:
			else if (a === 1890) { rand = 0; user = 1; userIndex = a;}

			arr[a] = {
				cellSize: gridWidth,
				cellType: rand,
				user: user
			};

		}

		// Randomly place challenges on map:

		var rand;
		var challengeLimit = 15;

		var b = 0;
		while (b < challengeLimit) {    
    	rand = 100 + 1800 - Math.round(Math.random() * 1800);
    	// Do not place a challenge on the user:
    	if (rand !== 1890) {
    		// Only use empty cells:
		    if (arr[rand].cellType === 0) {
		    	// Avoid 'boss' and 'barrier' cells:
		    	if (typeof arr[rand - 1].cellType !== 'string' && typeof arr[rand + 1].cellType !== 'string' && typeof arr[rand - 20].cellType !== 'string' && typeof arr[rand + 20].cellType !== 'string' ) {
		    		// Avoid inaccessible cells:
			    	if (arr[rand - 1].cellType === 0 && arr[rand + 1].cellType === 0 && arr[rand - 20].cellType === 0 && arr[rand + 20].cellType === 0 ) {
					    // Fifteen challenges are distributed, 5 for each certification:
					    if (b < 5) {
				        arr[rand].cellType = "front";
				        b++;
					    }
					    else if (b < 10) {
				        arr[rand].cellType = "viz";
				        b++;
					    }
					    else {
				        arr[rand].cellType = "back";
				        b++;
					    }
					  }
				  }
		    }
		  }
		  // If the above conditions are not satisfied for the given random number, return and try again:
	    else {
	      continue;
	    }
		}

		// Randomly place skills on map:

		// Get the names of all the skill items from the skills object:
		var skillsArray = [];
		for (var key in skills) {
			skillsArray.push(key);
		}

		var c = 0;
		while (c < skillsArray.length) {
			rand = 100 + 1800 - Math.round(Math.random() * 1800);
			// Do not place a challenge on the user:
			if (rand !== 1890) {
				// Cell must be empty and not contain a challenge
				if (arr[rand].cellType === 0 && (typeof arr[rand].cellType !== 'string') ) {
					// Avoid 'boss' and 'barrier' cells:
					if (typeof arr[rand - 1].cellType !== 'string' && typeof arr[rand + 1].cellType !== 'string' && typeof arr[rand - 20].cellType !== 'string' && typeof arr[rand + 20].cellType !== 'string' ) {
						// Avoid inaccessible cells:
						if (arr[rand - 1].cellType === 0 && arr[rand + 1].cellType === 0 && arr[rand - 20].cellType === 0 && arr[rand + 20].cellType === 0 ) {
							arr[rand].cellType = skillsArray[c];
							c++;
						}
					}
				}
			}
			// If the above conditiosn are not satisfied for the given random number, return and try again:
			else {
				continue;
			}
		}

		// A slice of the map data is made for the viewing window:
		initMap = arr.slice(userIndex - 130, arr.length);

		this.setState({
			userLocation: userIndex,
			map: arr,
			renderMap: initMap
		});

	}
  
  
	// Take in new map data and user location to render a new map to the page upon user movement:
	updateMap(data, newLocation, offset) {

		var gameMap = this.state.map;
		var newMap = gameMap.slice(newLocation - offset, newLocation + (240 - offset));

		this.setState({
			userLocation: newLocation,
			offset: offset,
			renderMap: newMap
		});
	}
  
  
	// If player is defeated, alert Gameover and display the replay screen:
	handleDeath() {
			console.log('Player died!');
			if (this.state.sound) { deathSound.play(); }
			this.setState({
				playing: false,
				header: 'You were defeated! Don\'t forget to level up your skills before trying the advanced challenges!'
			});

			document.getElementById('headerBar').style.backgroundColor = red;

			setTimeout(function() {
				this.setState({
					replay: true
				});
			}.bind(this), 3000);
			
	}
  
  
	// Take battle parameters and render outcome of any battle:
	handleBattle(challengeID, damage, userHP, attack) {

		if (this.state.sound) { hitSound.play() }

		var level = this.state.level;
		var experience = this.state.experience;
		var attackLevel = this.state.attackPower;
		var challenge;
		var challengeHP;

		// Code to keep track of which challenge the user is attempting to persist damage on that challenge if user leaves without defeating it:
		// Values are based on the challenge global object:
		if ( challengeID === 0 ) { challenge = 'front-end-1'; challengeHP = challenges['front-end-1'][0]; }
		else if (challengeID === 1) { challenge = 'front-end-2'; challengeHP = challenges['front-end-2'][0]; }
		else if (challengeID === 2) { challenge = 'front-end-3'; challengeHP = challenges['front-end-3'][0]; }
		else if (challengeID === 3) { challenge = 'front-end-4'; challengeHP = challenges['front-end-4'][0]; }
		else if (challengeID === 4) { challenge = 'front-end-5'; challengeHP = challenges['front-end-5'][0]; }

		else if (challengeID === 10) { challenge = 'data-viz-1'; challengeHP = challenges['data-viz-1'][0]; }
		else if (challengeID === 11) { challenge = 'data-viz-2'; challengeHP = challenges['data-viz-2'][0]; }
		else if (challengeID === 12) { challenge = 'data-viz-3'; challengeHP = challenges['data-viz-3'][0]; }
		else if (challengeID === 13) { challenge = 'data-viz-4'; challengeHP = challenges['data-viz-4'][0]; }
		else if (challengeID === 14) { challenge = 'data-viz-5'; challengeHP = challenges['data-viz-5'][0]; }

		else if (challengeID === 100) { challenge = 'back-end-1'; challengeHP = challenges['back-end-1'][0]; }
		else if (challengeID === 101) { challenge = 'back-end-2'; challengeHP = challenges['back-end-2'][0]; }
		else if (challengeID === 102) { challenge = 'back-end-3'; challengeHP = challenges['back-end-3'][0]; }
		else if (challengeID === 103) { challenge = 'back-end-4'; challengeHP = challenges['back-end-4'][0]; }
		else if (challengeID === 104) { challenge = 'back-end-5'; challengeHP = challenges['back-end-5'][0]; }

		else if (challengeID === 'boss') { challenge = 'boss'; }

		// Compute damage and HP based on challenge parameters:
		var challengeNewHP = challengeHP - attack;
		var health = userHP - damage;

		if (challengeID !== 'boss') {
			challenges[challenge][0] = challengeNewHP;
		}
		else if (challengeID === 'boss') {
			bossHP = bossHP - attack;
			challengeNewHP = bossHP;
		}

		this.setState({
			life: health
		});

		// Computer outcome if user is either killed first or defeats the challenge first:
		if (health > 0 && challengeNewHP <= 0) {
			if (challengeID !== 'boss') {
					this.setState({
						level: level + 1,
						life: health + 250,
						attackPower: (attackLevel + 50),
						experience: (+experience + Math.round(Math.random() * 11750)),
						header: challenges[challenge][1]
					});
				}
			if (challenge !== 'front-end-5' && challenge !== 'data-viz-5' && challenge !== 'back-end-5' && challenge !== 'boss') {
				if (this.state.sound) { challengeSound.play(); }
			}
			// Account for the different certifications to trigger state changes when the player completes all the challenges for a given certification:
			var certs = this.state.certifications.slice();
			if (challenge === 'front-end-5') {
				certs[certs.length] = certificationsList['Front'];

				setTimeout(function() {
					if (this.state.sound) { bonusSound.play(); }
					this.setState({
						life: health + 5000,
						attackPower: attackLevel + 500,
						experience: +experience + 2500,
						header: 'You earned the Front End Development Certification!',
						certifications: certs
					});
				}.bind(this), 250);

			}
			else if (challenge === 'data-viz-5') {
				certs[certs.length] = certificationsList['Viz'];

				setTimeout(function() {
					if (this.state.sound) { bonusSound.play(); }
					this.setState({
						life: health + 10000,
						attackPower: attackLevel + 500,
						experience: +experience + 2500,
						header: 'You earned the Data Visualization Certification!',
						certifications: certs
					});
				}.bind(this), 250);

			}
			else if (challenge === 'back-end-5') {
				certs[certs.length] = certificationsList['Back'];

				setTimeout(function() {
					if (this.state.sound) { bonusSound.play(); }
					this.setState({
						life: health + 15000,
						attackPower: attackLevel + 500,
						experience: +experience + 2500,
						header: 'You earned the Back End Development Certification!',
						certifications: certs
					});
				}.bind(this), 250);				

			}
			else if (challenge === 'boss') {
				
				if (this.state.sound) { winner.play(); }

				// Remove the boss from the map and re-render: 
				var finalMap = this.state.map.slice();
				finalMap[68].cellType = 0;
				finalMap[69].cellType = 0;
				finalMap[88].cellType = 0;
				finalMap[89].cellType = 0;

				this.setState({
					header: 'You defeated the boss and earned the Full Stack Javascript Certification! Way to go!!!',
					map: finalMap
				});
				// Winning animatin:
				document.getElementById('headerBar').style.backgroundColor = brightBlue;
				document.getElementById('headerTitle').style.color = dark;
				return true;
			}
			// When user completes all three certifications, remove the barrier around the boss and re-render the map:
			if (certs.length === 3) {
				setTimeout(function() {

					var currentGameMap = this.state.map.slice();
					currentGameMap[47].cellType = 0;
					currentGameMap[48].cellType = 0;
					currentGameMap[49].cellType = 0;
					currentGameMap[50].cellType = 0;
					currentGameMap[67].cellType = 0;
					currentGameMap[70].cellType = 0;
					currentGameMap[87].cellType = 0;
					currentGameMap[90].cellType = 0;
					currentGameMap[107].cellType = 0;
					currentGameMap[108].cellType = 0;
					currentGameMap[109].cellType = 0;
					currentGameMap[110].cellType = 0;

					var attackLevel = this.state.attackPower;
					var exp = this.state.experience;
					var lifeHP = this.state.life;
					var level = this.state.level;

					this.setState({
						attackPower: attackLevel + 145000,
						experience: exp + 1000000,
						life: lifeHP + 500000,
						level: level + 250,
						map: currentGameMap,
						header: 'You\'ve acquired all the certifications, remarkable! The final boss is now unlocked!'
					});

					if (this.state.sound) { bonusSound.play(); }

				}.bind(this), 2500);
			}
			return true;
		}
		else if (health <= 0) {
			this.handleDeath();
			return false;
		}

	}
  
  
  handleKeyPress(event) {
    console.log(event);
    let speed = this.state.speed;
    let paused = this.state.paused;
    
    // spacebar pauses and unpauses time
    if (event.keyCode === 32) {  
      if (paused) {
        paused = false;
        this.setState({speed: speed});
        const intervalID = setInterval(this.handleAI, speed);
        this.setState({intervalID: intervalID, paused: paused});
      } else {
        paused = true;
        clearInterval(this.state.intervalID); 
        this.setState({paused: paused});
      }
    }
    
    // left arrow slows down time
    if (event.keyCode === 37) {  
      if (speed < 1000) {
        speed = speed + 100;  
        this.setState({speed: speed});
        clearInterval(this.state.intervalID);
        const intervalID = setInterval(this.handleAI, speed);
        this.setState({intervalID: intervalID});
      }        
      console.log(this.state.speed);
    }
    
    // right arrow speeds up time
    else if (event.keyCode === 39) { 
      if (speed > 100) {
        speed = speed - 100;
        this.setState({speed: speed});
        clearInterval(this.state.intervalID)
        const intervalID = setInterval(this.handleAI, speed);
        this.setState({intervalID: intervalID});
      }
      console.log(this.state.speed);
    }
  }
  
	// Function to handle user movement based on arrow key input:
	manualMove(event) {

		// Check target location to see if there is an item there, if so, handle the challenge:
		var checkLocationForItem = function(locationObj) {
			var a = [];
			for (var key in skills) {
				a.push(key);
			}
			// Add attack  and exp points if user picks up an item based on current attack and exp points:
			var raiseAttack = function() {
					var currentAttack = this.state.attackPower;
					var newAttack;
					var currentHP = this.state.life;
					var newHP;
					if (currentAttack < 100) { newAttack = currentAttack + 15; newHP = currentHP + (150 - Math.round(Math.random() * 50)); }
					else if (currentAttack < 250) { newAttack = currentAttack + 25; newHP = currentHP + (300 - Math.round(Math.random() * 150)); }
					else if (currentAttack < 500) { newAttack = currentAttack + 75; newHP = currentHP + (500 - Math.round(Math.random() * 200)); }
					else if (currentAttack < 1000) { newAttack = currentAttack + 125; newHP = currentHP + (600 - Math.round(Math.random() * 500)); }
					else if (currentAttack >= 1000) { newAttack = currentAttack + 150; newHP = currentHP + (800 - Math.round(Math.random() * 600)); }
					var experience = this.state.experience;
					var newExp = +experience + ( 5000 - Math.round(Math.random() * 2500) );
					this.setState({
						attackPower: newAttack,
						experience: newExp,
						life: newHP
					});
			}.bind(this);
			for (var i = 0; i < a.length; i++) {
				if (a[i] === locationObj.cellType) {
					raiseAttack();
					if (this.state.skillItems.length <= 23) {
						if (this.state.sound) { newItemSound.play(); }
					}
					return true; }
			}
			return false;
		}.bind(this);

		// Check target location to see if there is a challenge there, if so, handle the challenge:
		function checkLocationForChallenge(locationObj) {
			var cell = locationObj.cellType;
			if (cell === 'front' || cell === 'viz' || cell === 'back'){
				return true;
			}
			else if (cell === 'boss') {
				return true;
			}
			else return false;
		}

		// Calculate parameters for battle function if player encounters a challenge:
		var attemptChallenge = function(locationObj, newLocation) {

			var challenge = locationObj.cellType;
			var attack = this.state.attackPower;
			var userHealth = this.state.life;
			var damage, challengeHP, challengeID;

			if (challenge === 'front') {

				var currentChallenges = this.state.frontEndChallenges.slice();
				var check = 0;

				for (var a = 0; a < currentChallenges.length; a++) {
					if (currentChallenges[a] === newLocation) {
						challengeID = a * 1;
						check = 1;
						break;
					}
					else {
						check = 0;
					}
				}

				if (check === 0) {
					currentChallenges[currentChallenges.length] = newLocation;
					challengeID = (currentChallenges.length - 1) * 1;
				}

				this.setState({
					frontEndChallenges: currentChallenges
				});

				damage = 600 - Math.round(Math.random() * 200); // Damage for front end challenge
				if (this.handleBattle(challengeID, damage, userHealth, attack)) {
					return true;
				}
			}

			else if (challenge === 'viz') {
				var currentChallenges = this.state.dataVizChallenges.slice();
				var check = 0;

				for (var a = 0; a < currentChallenges.length; a++) {
					if (currentChallenges[a] === newLocation) {
						challengeID = a + 10;
						check = 1;
						break;
					}
					else {
						check = 0;
					}
				}

				if (check === 0) {
					currentChallenges[currentChallenges.length] = newLocation;
					challengeID = (currentChallenges.length - 1) + 10;
				}

				this.setState({
					dataVizChallenges: currentChallenges
				});
				damage = 2500 - Math.round(Math.random() * 1000); // Damage for data viz challenge
				if (this.handleBattle(challengeID, damage, userHealth, attack)) {
					return true;
				}

			}
			else if (challenge === 'back') {
				var currentChallenges = this.state.backEndChallenges.slice();
				var check = 0;

				for (var a = 0; a < currentChallenges.length; a++) {
					if (currentChallenges[a] === newLocation) {
						challengeID = a + 100;
						check = 1;
						break;
					}
					else {
						check = 0;
					}
				}

				if (check === 0) {
					currentChallenges[currentChallenges.length] = newLocation;
					challengeID = (currentChallenges.length - 1) + 100;
				}

				this.setState({
					backEndChallenges: currentChallenges
				});
				damage = 7500 - Math.round(Math.random() * 3000); // Damage for back end challenge
				if (this.handleBattle(challengeID, damage, userHealth, attack)) {
					return true;
				}

			}
			else if (challenge === 'boss') {
				challengeID = 'boss';
				damage = 100000 - Math.round(Math.random() * 50000); // Damage for boss
				if (this.handleBattle(challengeID, damage, userHealth, attack)) {
					console.log('The player wins!');
				}

			}
		}.bind(this);

		var currentMap = this.state.map.slice();
		var offset = this.state.offset;
		var userLocation = this.state.userLocation;
    var arrow;
    
    if (event === 37) { arrow = 37 }
    else if (event === 38) { arrow = 38 }
    else if (event === 39) { arrow = 39 }
    else if (event === 40) { arrow = 40 }

    else { arrow = event.keyCode; event.preventDefault(); }

		// Functions to handle movement; there are four functions which are basically identical:

		// Move Left:
		if (arrow === 37) {

			// Prevent arrow key from scrolling the page:
			

			// If player dies, prevent further movement:
			if (this.state.playing) {

			var newLocation = userLocation - 1;

			// Calculate new location for player if the cell is empty:
			if (currentMap[newLocation].cellType === 0) {
				currentMap[userLocation].user = 0;
				currentMap[newLocation].user = 1;
				offset = offset - 1;
				this.updateMap(currentMap, newLocation, offset);
			}

			// If the cells is not empty, check is there is an item there, if there is, acquire the item and add it to the items array; then update the map:
			else if (checkLocationForItem(currentMap[newLocation])) {
				var currentSkills = this.state.skillItems.slice();
				currentSkills[currentSkills.length] = skills[currentMap[newLocation].cellType][0];
				
				this.setState({
					header: skills[currentMap[newLocation].cellType][1],
					skillItems: currentSkills
				});

				if (this.state.skillItems.length === 25) {
					setTimeout(function() {
						var attackLevel = this.state.attackPower;
						var exp = this.state.experience;
						var lifeHP = this.state.life;
						var level = this.state.level;
						if (this.state.sound) { bonusSound.play(); }
						this.setState({
							header: 'You\'ve mastered all the skills! Your coding abilities are now overpowered!',
							attackPower: attackLevel + 2500,
							experience: exp + 15000,
							life: lifeHP + 15000,
							level: level + 50
						});
					}.bind(this), 250);
				};

				currentMap[userLocation].user = 0;
				currentMap[newLocation].user = 1;
				currentMap[newLocation].cellType = 0;
				offset = offset - 1;
				this.updateMap(currentMap, newLocation, offset);

			}

			// If it is not an item, there should be a challenge; handle the challenge:
			else if (checkLocationForChallenge(currentMap[newLocation])) {

				if (attemptChallenge(currentMap[newLocation], newLocation)) {
					currentMap[userLocation].user = 0;
					currentMap[newLocation].user = 1;
					currentMap[newLocation].cellType = 0;
					offset = offset - 1;
					this.updateMap(currentMap, newLocation, offset);

				}
			}
		}

		}
		// Move Up:
		else if (arrow === 38) {

			if (this.state.playing) {

			var newLocation = userLocation - 20;

			if (newLocation >= 0) {

				if (currentMap[newLocation].cellType === 0) {

					if (offset > 120) {
						offset = offset - 20;
					}
					else if (newLocation <= 130) {
						offset = newLocation;
					}

					currentMap[userLocation].user = 0;
					currentMap[newLocation].user = 1;
					
					this.updateMap(currentMap, newLocation, offset);

				}
				
				else if (checkLocationForItem(currentMap[newLocation])) {
					var currentSkills = this.state.skillItems.slice();
					currentSkills[currentSkills.length] = skills[currentMap[newLocation].cellType][0];
					
					this.setState({
						header: skills[currentMap[newLocation].cellType][1],
						skillItems: currentSkills
					});

					if (this.state.skillItems.length === 25) {
						setTimeout(function() {
							var attackLevel = this.state.attackPower;
							var exp = this.state.experience;
							var lifeHP = this.state.life;
							var level = this.state.level;	
							if (this.state.sound) { bonusSound.play(); }
							this.setState({
								header: 'You\'ve mastered all the skills! Your coding abilities are now overpowered!',
								attackPower: attackLevel + 50000,
								experience: exp + 15000,
								life: lifeHP + 100000,
								level: level + 50
							});
						}.bind(this), 250);
					};

					if (offset > 120) {
						offset = offset - 20;
					}
					else if (newLocation <= 130) {
						offset = newLocation;
					}

					currentMap[userLocation].user = 0;
					currentMap[newLocation].user = 1;
					currentMap[newLocation].cellType = 0;
					
					this.updateMap(currentMap, newLocation, offset);
				}

				else if (checkLocationForChallenge(currentMap[newLocation])) {

					if (attemptChallenge(currentMap[newLocation], newLocation)) {
						currentMap[userLocation].user = 0;
						currentMap[newLocation].user = 1;
						currentMap[newLocation].cellType = 0;

						this.updateMap(currentMap, newLocation, offset);

					}

				}

			}

		}

		}
		// Move Right
		else if (arrow === 39) {

			if (this.state.playing) {

			var newLocation = userLocation + 1;

			if (currentMap[newLocation].cellType === 0) {

				currentMap[userLocation].user = 0;
				currentMap[newLocation].user = 1;
				currentMap[newLocation].cellType = 0;

				offset = offset + 1;

				this.updateMap(currentMap, newLocation, offset);

			}
			
			else if (checkLocationForItem(currentMap[newLocation])) {
				var currentSkills = this.state.skillItems.slice();
				currentSkills[currentSkills.length] = skills[currentMap[newLocation].cellType][0];
				
				this.setState({
					header: skills[currentMap[newLocation].cellType][1],
					skillItems: currentSkills
				});

				if (this.state.skillItems.length === 25) {
					setTimeout(function() {
						var attackLevel = this.state.attackPower;
						var exp = this.state.experience;
						var lifeHP = this.state.life;
						var level = this.state.level;
						if (this.state.sound) { bonusSound.play(); }
						this.setState({
							header: 'You\'ve mastered all the skills! Your coding abilities are now overpowered!',
							attackPower: attackLevel + 50000,
							experience: exp + 15000,
							life: lifeHP + 100000,
							level: level + 50
						});
					}.bind(this), 250);
				};

				currentMap[userLocation].user = 0;
				currentMap[newLocation].user = 1;
				currentMap[newLocation].cellType = 0;

				offset = offset + 1;

				this.updateMap(currentMap, newLocation, offset);
			}

			else if (checkLocationForChallenge(currentMap[newLocation])) {

				if (attemptChallenge(currentMap[newLocation], newLocation)) {
					currentMap[userLocation].user = 0;
					currentMap[newLocation].user = 1;
					currentMap[newLocation].cellType = 0;

					offset = offset + 1;

					this.updateMap(currentMap, newLocation, offset);

				}

			}

		}


		}
		// Move Down:
		else if (arrow === 40) {

			if (this.state.playing) {

			var newLocation = userLocation + 20;

			if (newLocation <= 2000) {

				if (currentMap[newLocation].cellType === 0) {
					
					if (offset < 120) {
						offset = offset + 20;
					}
					else if (newLocation >= 1870) {
						offset = 240 - (2000 - newLocation);
					}

					currentMap[userLocation].user = 0;
					currentMap[newLocation].user = 1;
					currentMap[newLocation].cellType = 0;

					this.updateMap(currentMap, newLocation, offset);

				}
				
				else if (checkLocationForItem(currentMap[newLocation])) {
					var currentSkills = this.state.skillItems.slice();
					currentSkills[currentSkills.length] = skills[currentMap[newLocation].cellType][0];
					
					this.setState({
						header: skills[currentMap[newLocation].cellType][1],
						skillItems: currentSkills
					});

					if (this.state.skillItems.length === 25) {
						setTimeout(function() {
							var attackLevel = this.state.attackPower;
							var exp = this.state.experience;
							var lifeHP = this.state.life;
							var level = this.state.level;
							if (this.state.sound) { bonusSound.play(); }
							this.setState({
								header: 'You\'ve mastered all the skills! Your coding abilities are now overpowered!',
								attackPower: attackLevel + 50000,
								experience: exp + 15000,
								life: lifeHP + 100000,
								level: level + 50
							});
						}.bind(this), 250);
					};

					if (offset < 120) {
						offset = offset + 20;
					}
					else if (newLocation >= 1870) {
						offset = 240 - (2000 - newLocation);
					}

					currentMap[userLocation].user = 0;
					currentMap[newLocation].user = 1;
					currentMap[newLocation].cellType = 0;

					this.updateMap(currentMap, newLocation, offset);
				}

				else if (checkLocationForChallenge(currentMap[newLocation])) {

					if (attemptChallenge(currentMap[newLocation], newLocation)) {
						currentMap[userLocation].user = 0;
						currentMap[newLocation].user = 1;
						currentMap[newLocation].cellType = 0;

						this.updateMap(currentMap, newLocation, offset);

					}

				}

			}

		}

	}

	}
  
  
  
  
  
  
  // Function to handle AI:
	handleAI(event) {

		// Check target location to see if there is an item there, if so, handle the challenge:
		var checkLocationForItem = function(locationObj) {
			var a = [];
			for (var key in skills) {
				a.push(key);
			}
			// Add attack  and exp points if user picks up an item based on current attack and exp points:
			var raiseAttack = function() {
					var currentAttack = this.state.attackPower;
					var newAttack;
					var currentHP = this.state.life;
					var newHP;
					if (currentAttack < 100) { newAttack = currentAttack + 15; newHP = currentHP + (150 - Math.round(Math.random() * 50)); }
					else if (currentAttack < 250) { newAttack = currentAttack + 25; newHP = currentHP + (300 - Math.round(Math.random() * 150)); }
					else if (currentAttack < 500) { newAttack = currentAttack + 75; newHP = currentHP + (500 - Math.round(Math.random() * 200)); }
					else if (currentAttack < 1000) { newAttack = currentAttack + 125; newHP = currentHP + (600 - Math.round(Math.random() * 500)); }
					else if (currentAttack >= 1000) { newAttack = currentAttack + 150; newHP = currentHP + (800 - Math.round(Math.random() * 600)); }
					var experience = this.state.experience;
					var newExp = +experience + ( 5000 - Math.round(Math.random() * 2500) );
					this.setState({
						attackPower: newAttack,
						experience: newExp,
						life: newHP
					});
			}.bind(this);
			for (var i = 0; i < a.length; i++) {
				if (a[i] === locationObj.cellType) {
					raiseAttack();
					if (this.state.skillItems.length <= 23) {
						if (this.state.sound) { newItemSound.play(); }
					}
					return true; }
			}
			return false;
		}.bind(this);

		// Check target location to see if there is a challenge there, if so, handle the challenge:
		function checkLocationForChallenge(locationObj) {
			var cell = locationObj.cellType;
			if (cell === 'front' || cell === 'viz' || cell === 'back'){
				return true;
			}
			else if (cell === 'boss') {
				return true;
			}
			else return false;
		}

		// Calculate parameters for battle function if player encounters a challenge:
		var attemptChallenge = function(locationObj, newLocation) {

			var challenge = locationObj.cellType;
			var attack = this.state.attackPower;
			var userHealth = this.state.life;
			var damage, challengeHP, challengeID;

			if (challenge === 'front') {

				var currentChallenges = this.state.frontEndChallenges.slice();
				var check = 0;

				for (var a = 0; a < currentChallenges.length; a++) {
					if (currentChallenges[a] === newLocation) {
						challengeID = a * 1;
						check = 1;
						break;
					}
					else {
						check = 0;
					}
				}

				if (check === 0) {
					currentChallenges[currentChallenges.length] = newLocation;
					challengeID = (currentChallenges.length - 1) * 1;
				}

				this.setState({
					frontEndChallenges: currentChallenges
				});

				damage = 600 - Math.round(Math.random() * 200); // Damage for front end challenge
				if (this.handleBattle(challengeID, damage, userHealth, attack)) {
					return true;
				}
			}

			else if (challenge === 'viz') {
				var currentChallenges = this.state.dataVizChallenges.slice();
				var check = 0;

				for (var a = 0; a < currentChallenges.length; a++) {
					if (currentChallenges[a] === newLocation) {
						challengeID = a + 10;
						check = 1;
						break;
					}
					else {
						check = 0;
					}
				}

				if (check === 0) {
					currentChallenges[currentChallenges.length] = newLocation;
					challengeID = (currentChallenges.length - 1) + 10;
				}

				this.setState({
					dataVizChallenges: currentChallenges
				});
				damage = 2500 - Math.round(Math.random() * 1000); // Damage for data viz challenge
				if (this.handleBattle(challengeID, damage, userHealth, attack)) {
					return true;
				}

			}
			else if (challenge === 'back') {
				var currentChallenges = this.state.backEndChallenges.slice();
				var check = 0;

				for (var a = 0; a < currentChallenges.length; a++) {
					if (currentChallenges[a] === newLocation) {
						challengeID = a + 100;
						check = 1;
						break;
					}
					else {
						check = 0;
					}
				}

				if (check === 0) {
					currentChallenges[currentChallenges.length] = newLocation;
					challengeID = (currentChallenges.length - 1) + 100;
				}

				this.setState({
					backEndChallenges: currentChallenges
				});
				damage = 7500 - Math.round(Math.random() * 3000); // Damage for back end challenge
				if (this.handleBattle(challengeID, damage, userHealth, attack)) {
					return true;
				}

			}
			else if (challenge === 'boss') {
				challengeID = 'boss';
				damage = 100000 - Math.round(Math.random() * 50000); // Damage for boss
				if (this.handleBattle(challengeID, damage, userHealth, attack)) {
					console.log('The player wins!');
				}

			}
		}.bind(this);

		var currentMap = this.state.map.slice();
		var offset = this.state.offset;
		var userLocation = this.state.userLocation;
    var arrow;
    var max = 5;
    var min = 1;
    
    var randNum = Math.floor(Math.random() * (max - min) + min); 
    
    if (randNum === 1) { arrow = 37 }
    else if (randNum === 2) { arrow = 38 }
    else if (randNum === 3) { arrow = 39 }
    else if (randNum === 4) { arrow = 40 }

    else { arrow = 37 }

		// Functions to handle movement; there are four functions which are basically identical:

		// Move Left:
		if (arrow === 37) {

			// Prevent arrow key from scrolling the page:
			

			// If player dies, prevent further movement:
			if (this.state.playing) {

			var newLocation = userLocation - 1;

			// Calculate new location for player if the cell is empty:
			if (currentMap[newLocation].cellType === 0) {
				currentMap[userLocation].user = 0;
				currentMap[newLocation].user = 1;
				offset = offset - 1;
				this.updateMap(currentMap, newLocation, offset);
			}

			// If the cells is not empty, check is there is an item there, if there is, acquire the item and add it to the items array; then update the map:
			else if (checkLocationForItem(currentMap[newLocation])) {
				var currentSkills = this.state.skillItems.slice();
				currentSkills[currentSkills.length] = skills[currentMap[newLocation].cellType][0];
				
				this.setState({
					header: skills[currentMap[newLocation].cellType][1],
					skillItems: currentSkills
				});

				if (this.state.skillItems.length === 25) {
					setTimeout(function() {
						var attackLevel = this.state.attackPower;
						var exp = this.state.experience;
						var lifeHP = this.state.life;
						var level = this.state.level;
						if (this.state.sound) { bonusSound.play(); }
						this.setState({
							header: 'You\'ve mastered all the skills! Your coding abilities are now overpowered!',
							attackPower: attackLevel + 2500,
							experience: exp + 15000,
							life: lifeHP + 15000,
							level: level + 50
						});
					}.bind(this), 250);
				};

				currentMap[userLocation].user = 0;
				currentMap[newLocation].user = 1;
				currentMap[newLocation].cellType = 0;
				offset = offset - 1;
				this.updateMap(currentMap, newLocation, offset);

			}

			// If it is not an item, there should be a challenge; handle the challenge:
			else if (checkLocationForChallenge(currentMap[newLocation])) {

				if (attemptChallenge(currentMap[newLocation], newLocation)) {
					currentMap[userLocation].user = 0;
					currentMap[newLocation].user = 1;
					currentMap[newLocation].cellType = 0;
					offset = offset - 1;
					this.updateMap(currentMap, newLocation, offset);

				}
			}
		}

		}
		// Move Up:
		else if (arrow === 38) {

			if (this.state.playing) {

			var newLocation = userLocation - 20;

			if (newLocation >= 0) {

				if (currentMap[newLocation].cellType === 0) {

					if (offset > 120) {
						offset = offset - 20;
					}
					else if (newLocation <= 130) {
						offset = newLocation;
					}

					currentMap[userLocation].user = 0;
					currentMap[newLocation].user = 1;
					
					this.updateMap(currentMap, newLocation, offset);

				}
				
				else if (checkLocationForItem(currentMap[newLocation])) {
					var currentSkills = this.state.skillItems.slice();
					currentSkills[currentSkills.length] = skills[currentMap[newLocation].cellType][0];
					
					this.setState({
						header: skills[currentMap[newLocation].cellType][1],
						skillItems: currentSkills
					});

					if (this.state.skillItems.length === 25) {
						setTimeout(function() {
							var attackLevel = this.state.attackPower;
							var exp = this.state.experience;
							var lifeHP = this.state.life;
							var level = this.state.level;	
							if (this.state.sound) { bonusSound.play(); }
							this.setState({
								header: 'You\'ve mastered all the skills! Your coding abilities are now overpowered!',
								attackPower: attackLevel + 50000,
								experience: exp + 15000,
								life: lifeHP + 100000,
								level: level + 50
							});
						}.bind(this), 250);
					};

					if (offset > 120) {
						offset = offset - 20;
					}
					else if (newLocation <= 130) {
						offset = newLocation;
					}

					currentMap[userLocation].user = 0;
					currentMap[newLocation].user = 1;
					currentMap[newLocation].cellType = 0;
					
					this.updateMap(currentMap, newLocation, offset);
				}

				else if (checkLocationForChallenge(currentMap[newLocation])) {

					if (attemptChallenge(currentMap[newLocation], newLocation)) {
						currentMap[userLocation].user = 0;
						currentMap[newLocation].user = 1;
						currentMap[newLocation].cellType = 0;

						this.updateMap(currentMap, newLocation, offset);

					}

				}

			}

		}

		}
		// Move Right
		else if (arrow === 39) {

			if (this.state.playing) {

			var newLocation = userLocation + 1;

			if (currentMap[newLocation].cellType === 0) {

				currentMap[userLocation].user = 0;
				currentMap[newLocation].user = 1;
				currentMap[newLocation].cellType = 0;

				offset = offset + 1;

				this.updateMap(currentMap, newLocation, offset);

			}
			
			else if (checkLocationForItem(currentMap[newLocation])) {
				var currentSkills = this.state.skillItems.slice();
				currentSkills[currentSkills.length] = skills[currentMap[newLocation].cellType][0];
				
				this.setState({
					header: skills[currentMap[newLocation].cellType][1],
					skillItems: currentSkills
				});

				if (this.state.skillItems.length === 25) {
					setTimeout(function() {
						var attackLevel = this.state.attackPower;
						var exp = this.state.experience;
						var lifeHP = this.state.life;
						var level = this.state.level;
						if (this.state.sound) { bonusSound.play(); }
						this.setState({
							header: 'You\'ve mastered all the skills! Your coding abilities are now overpowered!',
							attackPower: attackLevel + 50000,
							experience: exp + 15000,
							life: lifeHP + 100000,
							level: level + 50
						});
					}.bind(this), 250);
				};

				currentMap[userLocation].user = 0;
				currentMap[newLocation].user = 1;
				currentMap[newLocation].cellType = 0;

				offset = offset + 1;

				this.updateMap(currentMap, newLocation, offset);
			}

			else if (checkLocationForChallenge(currentMap[newLocation])) {

				if (attemptChallenge(currentMap[newLocation], newLocation)) {
					currentMap[userLocation].user = 0;
					currentMap[newLocation].user = 1;
					currentMap[newLocation].cellType = 0;

					offset = offset + 1;

					this.updateMap(currentMap, newLocation, offset);

				}

			}

		}


		}
		// Move Down:
		else if (arrow === 40) {

			if (this.state.playing) {

			var newLocation = userLocation + 20;

			if (newLocation <= 2000) {

				if (currentMap[newLocation].cellType === 0) {
					
					if (offset < 120) {
						offset = offset + 20;
					}
					else if (newLocation >= 1870) {
						offset = 240 - (2000 - newLocation);
					}

					currentMap[userLocation].user = 0;
					currentMap[newLocation].user = 1;
					currentMap[newLocation].cellType = 0;

					this.updateMap(currentMap, newLocation, offset);

				}
				
				else if (checkLocationForItem(currentMap[newLocation])) {
					var currentSkills = this.state.skillItems.slice();
					currentSkills[currentSkills.length] = skills[currentMap[newLocation].cellType][0];
					
					this.setState({
						header: skills[currentMap[newLocation].cellType][1],
						skillItems: currentSkills
					});

					if (this.state.skillItems.length === 25) {
						setTimeout(function() {
							var attackLevel = this.state.attackPower;
							var exp = this.state.experience;
							var lifeHP = this.state.life;
							var level = this.state.level;
							if (this.state.sound) { bonusSound.play(); }
							this.setState({
								header: 'You\'ve mastered all the skills! Your coding abilities are now overpowered!',
								attackPower: attackLevel + 50000,
								experience: exp + 15000,
								life: lifeHP + 100000,
								level: level + 50
							});
						}.bind(this), 250);
					};

					if (offset < 120) {
						offset = offset + 20;
					}
					else if (newLocation >= 1870) {
						offset = 240 - (2000 - newLocation);
					}

					currentMap[userLocation].user = 0;
					currentMap[newLocation].user = 1;
					currentMap[newLocation].cellType = 0;

					this.updateMap(currentMap, newLocation, offset);
				}

				else if (checkLocationForChallenge(currentMap[newLocation])) {

					if (attemptChallenge(currentMap[newLocation], newLocation)) {
						currentMap[userLocation].user = 0;
						currentMap[newLocation].user = 1;
						currentMap[newLocation].cellType = 0;

						this.updateMap(currentMap, newLocation, offset);

					}

				}

			}

		}

	}

	}
  
  
  
  
  
  
  
  
	// Generate the map data on component initial render:
	componentWillMount() {
		this.generateMap();
	}
  
  
	// Add event listeners to detect user movement:
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyPress);
    
    const intervalID = setInterval(this.handleAI, this.state.speed);
    this.setState({intervalID: intervalID});
	}
  
  
	// Main render function of root component:
	render() {
		return (
			<div className = "pageWrapper">
				<Header
					header = {this.state.header}/>
				<div className = "gameWrapper">
					<SideBar
						sound = {this.state.sound}
						handleSound = {this.handleSound}
						level = {this.state.level}
						life = {this.state.life}
						attack = {this.state.attackPower}
						skillItems = {this.state.skillItems}
						experience = {this.state.experience}
						certifications = {this.state.certifications}
            speed = {this.state.speed}
            paused = {this.state.paused} />
					<Game
						gameMap = {this.state.renderMap} 
            clickMove = {this.handleKeyPress} />
				</div>
			</div>
		);
	}
};

// Main game board component, lots of conditional stlying going on here:
// Sliced game data array is mapped through and all the cell items are given a background based on their contents, e.g. empty, solid, player, challenge, item, boss, barrier.
class Game extends React.Component {
	render() {
		var gridStyle, gridColor;
		var mapData = this.props.gameMap;

		var renderMap = mapData.map( (grid, i) => {

			gridStyle = { width: grid.cellSize, height: grid.cellSize }; // Set cell sizes based on the pre-set dimensions

			// Set grid color for all empty grids, this is so that the gradient which is applied to the outer div is visible. Better aesthetics.
			gridColor = { background: empty };

			// Fill grids that are non-playable:
			if (grid.cellType === 1) { gridColor = { background: dark } }

			// Set images for challenges:
			else if (grid.cellType === 'front') { gridColor = { background: "url('https://robohash.org/one?set=set2')", backgroundSize: 'cover' } }
			else if (grid.cellType === 'viz') { gridColor = { background: "url('https://robohash.org/two?set=set2')", backgroundSize: 'cover' } }
			else if (grid.cellType === 'back') { gridColor = { background: "url('https://robohash.org/three?set=set2')", backgroundSize: 'cover' } }

			// Set cells for barrier and boss:
			else if (grid.cellType === 'barrier') { gridColor = { background: barrierColor } }
			else if (grid.cellType === 'boss') { gridColor = { background: "url('http://i1361.photobucket.com/albums/r662/bonham000/Roguelike/g4371_zpsizzy7el0.png')", backgroundSize: 'cover' } }

			// Set images for skill items:
			else if (grid.cellType === 'Bootstrap') { gridColor = { background: "url(" + skills.Bootstrap[0] + ")", backgroundSize: 'cover' } }
			else if (grid.cellType === 'Bower') { gridColor = { background: "url(" + skills.Bower[0] + ")", backgroundSize: 'cover' } }
			else if (grid.cellType === 'CamperBot') { gridColor = { background: "url(" + skills.CamperBot[0] + ")", backgroundSize: 'cover' } }								
			else if (grid.cellType === 'Codepen') { gridColor = { background: "url(" + skills.Codepen[0] + ")", backgroundSize: 'cover' } }				
			else if (grid.cellType === 'CSS3') { gridColor = { background: "url(" + skills.CSS3[0] + ")", backgroundSize: 'cover' } }
			else if (grid.cellType === 'D3') { gridColor = { background: "url(" + skills.D3[0] + ")", backgroundSize: 'cover' } }
			else if (grid.cellType === 'ES6') { gridColor = { background: "url(" + skills.ES6[0] + ")", backgroundSize: 'cover' } }
			else if (grid.cellType === 'Git') { gridColor = { background: "url(" + skills.Git[0] + ")", backgroundSize: 'cover' } }				
			else if (grid.cellType === 'Github') { gridColor = { background: "url(" + skills.Github[0] + ")", backgroundSize: 'cover' } }	
			else if (grid.cellType === 'Gitter') { gridColor = { background: "url(" + skills.Gitter[0] + ")", backgroundSize: 'cover' } }
			else if (grid.cellType === 'Grunt') { gridColor = { background: "url(" + skills.Grunt[0] + ")", backgroundSize: 'cover' } }
			else if (grid.cellType === 'Heroku') { gridColor = { background: "url(" + skills.Heroku[0] + ")", backgroundSize: 'cover' } }				
			else if (grid.cellType === 'HTML5') { gridColor = { background: "url(" + skills.HTML5[0] + ")", backgroundSize: 'cover' } }	
			else if (grid.cellType === 'jQuery') { gridColor = { background: "url(" + skills.jQuery[0] + ")", backgroundSize: 'cover' } }
			else if (grid.cellType === 'Javascript') { gridColor = { background: "url(" + skills.Javascript[0] + ")", backgroundSize: 'cover' } }
			else if (grid.cellType === 'MongoDB') { gridColor = { background: "url(" + skills.MongoDB[0] + ")", backgroundSize: 'cover' } }				
			else if (grid.cellType === 'NodeJS') { gridColor = { background: "url(" + skills.NodeJS[0] + ")", backgroundSize: 'cover' } }	
			else if (grid.cellType === 'React') { gridColor = { background: "url(" + skills.React[0] + ")", backgroundSize: 'cover' } }				
			else if (grid.cellType === 'Redux') { gridColor = { background: "url(" + skills.Redux[0] + ")", backgroundSize: 'cover' } }	
			else if (grid.cellType === 'Sass') { gridColor = { background: "url(" + skills.Sass[0] + ")", backgroundSize: 'cover' } }
			else if (grid.cellType === 'StackOverflow') { gridColor = { background: "url(" + skills.StackOverflow[0] + ")", backgroundSize: 'cover' } }
			else if (grid.cellType === 'Sublime') { gridColor = { background: "url(" + skills.Sublime[0] + ")", backgroundSize: 'cover' } }				
			else if (grid.cellType === 'Terminal') { gridColor = { background: "url(" + skills.Terminal[0] + ")", backgroundSize: 'cover' } }	
			else if (grid.cellType === 'Twitter') { gridColor = { background: "url(" + skills.Twitter[0] + ")", backgroundSize: 'cover' } }				
			else if (grid.cellType === 'Webpack') { gridColor = { background: "url(" + skills.Webpack[0] + ")", backgroundSize: 'cover' } }

			// Add user to user grid:
			if (grid.user === 1) { gridColor = { background: "url('https://robohash.org/alex')", backgroundSize: '51px 51px' } }
			
      if ((i >= 6 && i <= 14) || (i >= 26 && i <= 34) || (i >= 46 && i <= 54) || (i >= 66 && i <= 74) || (i >= 86 && i <= 94) || (i >= 106 && i <= 114)) {
        return (
          <div
            key = {i}
            onClick = {this.props.clickMove.bind(this, 38)}
            className = "gridItem"
            style = {Object.assign({}, gridStyle, gridColor)}>
          </div>
			  );
      }
      else if ((i >= 40 && i <= 45) || (i >= 60 && i <= 65) || (i >= 80 && i <= 85) || (i >= 100 && i <= 105) || (i >= 120 && i <= 125) || (i >= 140 && i <= 145) || (i >= 160 && i <= 165) || (i >= 180 && i <= 185)) {
        return (
          <div
            key = {i}
            onClick = {this.props.clickMove.bind(this, 37)}
            className = "gridItem"
            style = {Object.assign({}, gridStyle, gridColor)}>
          </div>
			  );
      }
      else if ((i >= 55 && i <= 59) || (i >= 75 && i <= 79) || (i >= 95 && i <= 99) || (i >= 115 && i <= 119) || (i >= 135 && i <= 139) || (i >= 155 && i <= 159) || (i >= 175 && i <= 179) || (i >= 195 && i <= 199)) {
        return (
          <div
            key = {i}
            onClick = {this.props.clickMove.bind(this, 39)}
            className = "gridItem"
            style = {Object.assign({}, gridStyle, gridColor)}>
          </div>
			  );
      }
      else if ((i >= 146 && i <= 154) || (i >= 166 && i <= 174) || (i >= 186 && i <= 194) || (i >= 206 && i <= 214) || (i >= 226 && i <= 234)) {
        return (
          <div
            key = {i}
            onClick = {this.props.clickMove.bind(this, 40)}
            className = "gridItem"
            style = {Object.assign({}, gridStyle, gridColor)}>
          </div>
			  );
      }
      else {
        return (
          <div
            key = {i}
            className = "gridItem"
            style = {Object.assign({}, gridStyle, gridColor)}>
          </div>
			  );
      }      

		});
		return (
			<div className = "game" id = "gameBoard">
				<div className = "map" id = "gameSpace">
					{renderMap}
				</div>
			</div>
		);
	}
};

export default App;