import React from "react";

// Header component which displays messages throughout the game:
class Header extends React.Component {
	render() {
		return (
			<div className="header" id="headerBar">
        {this.props.header}
			</div>
		);
	}
};

export default Header;