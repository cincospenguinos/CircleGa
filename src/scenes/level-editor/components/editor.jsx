import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

function Editor({
	visible,
}) {
	const className = visible ? styles.shown : styles.hidden;

	return (
		<div id="editor" className={className}>
		</div>
	);
}

const mapStateToProps = (state, _) => {
	return {
		visible: state.editorShown,
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);