import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../state/actions/actions.js';
import styles from './styles.css';

function StarButton({ text, onClick, selected, color }) {
	const colorClass = styles[`button-${color}`];
	const className = selected ? `${styles[`${color}-selected`]} ${colorClass}` : colorClass;

	return (<button className={className} onClick={() => onClick(color)}>{text}</button>);
}

function Editor({
	visible,
	onSelectionMade,
}) {
	const [currentItem, setCurrentItem] = useState(undefined);
	const className = visible ? styles.shown : styles.hidden;

	const setItem = (item) => {
		setCurrentItem(item);
		onSelectionMade(item);
	};

	const onStarClick = (color) => {
		if (currentItem === color) {
			setItem(undefined);
			return;
		}

		setItem(color);
	};

	return (
		<div className={className}>
			<div className={styles.items}>
				<StarButton
					selected={currentItem === 'blue'}
					text="Blue Star"
					color="blue"
					onClick={onStarClick}
				/>
				<StarButton
					selected={currentItem === 'yellow'}
					text="Yellow Star"
					color="yellow"
					onClick={onStarClick}
				/>
			</div>
			<div className={styles.items}>
			</div>
		</div>
	);
}

const mapStateToProps = (state, _) => {
	return {
		visible: state.editorVisible,
	};
};

const mapDispatchToProps = (dispatch, _) => {
	return {
		onSelectionMade: (item) => dispatch(actions.selectionMade(item)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);