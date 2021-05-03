import React from "react";
import { Loading } from "carbon-components-react";
import PropTypes from "prop-types";

const LoadingIndicator = props => {
    return (
        <Loading
            active={props.active}
            description="Active Loading Indicator"
            small={false}
            withOverlay
        />
    );
};

LoadingIndicator.propTypes = {
    active: PropTypes.bool
};

export default LoadingIndicator;