import React from 'react';
import styles from './styles.css';

export default function Editor({
	visible,
}) {
	const className = visible ? styles.shown : styles.hidden;
	console.log(`Visible is ${visible}`);

	return (
		<div id="editor" className={className}>
		</div>
	);
}
