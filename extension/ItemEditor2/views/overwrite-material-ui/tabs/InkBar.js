import React, {Component} from 'react';
import PropTypes from 'prop-types';
import transitions from 'material-ui/styles/transitions';

function getStyles(props, context) {
	const {inkBar, isRtl} = context.muiTheme;

	return {
		root: {
			left: props.left,
			width: props.width,
			bottom: 0,
			display: 'block',
			backgroundColor: 'rgba(255, 255, 255, 0.2)',
			height: 48,
			marginTop: -48,
			position: 'relative',
			transition: transitions.easeOut('0.5s', isRtl ? 'right' : 'left'),
		},
	};
}

class InkBar extends Component {
	static propTypes = {
		color: PropTypes.string,
		left: PropTypes.string.isRequired,
		/**
		 * Override the inline-styles of the root element.
		 */
		style: PropTypes.object,
		width: PropTypes.string.isRequired,
	};

	static contextTypes = {
		muiTheme: PropTypes.object.isRequired,
	};

	render() {
		const {style} = this.props;
		const {prepareStyles} = this.context.muiTheme;
		const styles = getStyles(this.props, this.context);

		return (
			<div style={prepareStyles(Object.assign(styles.root, style))} />
		);
	}
}

export default InkBar;