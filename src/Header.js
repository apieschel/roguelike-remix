import React from "react";

// Header component which displays messages throughout the game:
class Header extends React.Component {
	render() {
		var headerText = this.props.header;
		return (
			<div className = "header" id = "headerBar">
			</div>
		);
	}
};

export default Header;