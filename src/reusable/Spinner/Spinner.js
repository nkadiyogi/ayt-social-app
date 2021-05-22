import React from "react";

const Spinner = (props) => {
	return (
		
			<span
				className={`${props.margin} spinner-border spinner-border-${props.size}`}
			></span>
	);
};
export default Spinner;
