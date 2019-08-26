import React from "react";

// Header component which displays messages throughout the game:
const Header = ({header}) => 
	(
    <div className="header" id="headerBar">
      {header}
    </div>
	);

export default Header;