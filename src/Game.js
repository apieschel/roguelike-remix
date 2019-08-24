import React from "react";

// Define colors:
var dark = '#0084ff';
var empty = '#196111';
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

export default Game;