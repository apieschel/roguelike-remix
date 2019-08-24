import React from "react";

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

// Sidebar component which display player stats; i.e. Level, Exp, HP, Attack, Certifications, and Skills; these are updated conditionally as the player progresses in the game:
class SideBar extends React.Component {
	render() {
		var lifeStyle = {
			'color': mint
		};
		if (this.props.life < 2000) {
			lifeStyle = { 'color': alarm }
		};
		if (this.props.life >= 2000 && this.props.life <= 4500) {
			lifeStyle = { 'color': gold }
		};
		if (this.props.life > 10000) {
			lifeStyle = { 'color': brightBlue }
		};
		var statStyle = {
			'color': gray
		};
		var skillStyle = {
				background: 'none',
		};
		var certStyle = {
			background: 'none'
		};
		var certTitleStyle = statStyle;
		var skillTitleStyle = statStyle;
    
    var pauseRender;
    if(this.props.paused) {
      pauseRender = function() {
          return (
            <div>The game is paused.</div>
          );  
      }();
    }
    
		var skillsRender = this.props.skillItems.map( (skill) => {
			return (
				<div key = {skill} style = {skillStyle}>
					<img src = {skill} alt="Skill Item" style = {{"width": "45px", "height": "45px"}} className="skillItem" />
				</div>
				);
		});
		if (this.props.certifications.length === 3) {
			certTitleStyle = {
				'color': mint
			};
			certStyle = {
				'background': pink,
				'border': '1px solid' + gold
			};
		}
		if (this.props.skillItems.length === 25) {
			skillTitleStyle = {
				'color': mint
			};
			skillStyle = {
				background: blue
			};
		};
		if (this.props.skillItems.length === 25 && this.props.certifications.length === 3) {
			statStyle = {
				color: gold
			};
		};
		var certRender = this.props.certifications.map( (cert, i) => {
			var image = <img src = {cert} style = {{ 'width': '75px', 'height': '55px'}} className = "certDiv" />
			return (
				<div className = "certContainer" key = {i}>
					{image}
				</div>
			);
		});
		var soundStyle = {
			'background': dark,
			'color': brightBlue
		};
		var sound = "Sound On";
		if (this.props.sound === false) { sound = "Sound Off"; soundStyle = { 'background': 'rgb(20,20,20)', 'color': 'rgb(150,150,150)' } }
		return (
			<div className = "sideBar">
				<div className = "container">
					<p style = {statStyle} className = "title">Player Stats</p>
					<p style = {statStyle} className = "stat">Level: {this.props.level}</p>
					<p style = {statStyle} className = "stat">HP: <span style = {lifeStyle}>{this.props.life}</span></p>
					<p style = {statStyle} className = "stat">Experience: {this.props.experience}</p>
					<p style = {statStyle} className = "stat">Attack: {this.props.attack}</p>
					<p style = {certTitleStyle} className = "stat certTitle">Artifacts: {this.props.certifications.length}/3</p>
					<div className="certFlex">
						<div style = {certStyle} className = "certList">
							{certRender}
						</div>
					</div>
					<p style = {skillTitleStyle} className = "stat skillsTitle">Friends: {this.props.skillItems.length}/25</p>
					<div className="skillsFlex">
						<div className = "skillsList" style = {skillStyle} >
							{skillsRender}
						</div>
					</div>
          <div className="skillsFlex">
						<div className = "skillsList" style = {{"color": gray}} >
							{pauseRender}
						</div>
					</div>
          <div className="skillsFlex">
						<div className = "skillsList" style = {{"color": gray}} >
							Game Speed: {this.props.speed}
						</div>
					</div>
					<div className="soundContainer">
						<div className = "soundControl" onClick = {this.props.handleSound} style = {soundStyle}>
							<p>{sound}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default SideBar;