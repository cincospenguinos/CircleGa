import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../state/actions/levelEditorActions.js';
import * as selectors from '../../../state/selectors/levelEditorSelectors.js';
import styles from './styles.css';

function StarButton({ text, onClick, selected, color }) {
	const colorClass = styles[`button-${color}`];
	const className = selected ? `${styles[`${color}-selected`]} ${colorClass}` : colorClass;

	return (<button className={className} onClick={() => onClick(color)}>{text}</button>);
}

function Editor({
	visible,
	duration,
	amount,
	delay,
	onSelectionMade,
	onTweenConfigChange,
	toggleStarLines,
}) {
	const [currentItem, setCurrentItem] = useState(undefined);
	const className = visible ? styles.shown : styles.hidden;

	const setTweenConfig = (newVal) => {
		onTweenConfigChange({
			delay,
			amount,
			duration,
			...newVal,
		});
	};

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
					selected={currentItem === 'red'}
					text="Red Star"
					color="red"
					onClick={onStarClick}
				/>
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
				<div>
					<button onClick={() => toggleStarLines()}>Toggle Star Lines</button>
				</div>
				<div>
					<label htmlFor="duration">Duration:
						<input
							name="duration"
							type="number"
							className={styles.input}
							defaultValue={duration}
							onChange={(e) => onTweenConfigChange({ duration: parseInt(e.target.value) })}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="duration">Amount:
						<input
							name="amount"
							type="number"
							className={styles.input}
							defaultValue={amount}
							onChange={(e) => onTweenConfigChange({ amount: parseInt(e.target.value) })}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="delay">Delay:
						<input
							name="delay"
							type="number"
							className={styles.input}
							defaultValue={delay}
							onChange={(e) => onTweenConfigChange({ delay: parseInt(e.target.value) })}
						/>
					</label>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state, _) => {
	return {
		visible: selectors.isEditorVisible(state),
		duration: selectors.getTweenConfig(state).duration,
		amount: selectors.getTweenConfig(state).amount,
		delay: selectors.getTweenConfig(state).delay,
	};
};

const mapDispatchToProps = (dispatch, _) => {
	return {
		onSelectionMade: (item) => dispatch(actions.selectionMade(item)),
		onTweenConfigChange: (config) => dispatch(actions.updateTweenConfig(config)),
		toggleStarLines: () => dispatch(actions.toggleStarLines()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);