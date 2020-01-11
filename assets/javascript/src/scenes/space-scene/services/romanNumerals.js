const numerals = {
	1: 'I',
	4: 'IV',
	5: 'V',
	9: 'IX',
	10: 'X',
	40: 'XL',
	50: 'L',
};

export const toRomanNumerals = (decimalNumber) => {
	if (decimalNumber <= 0) {
		return '';	
	}

	let number = decimalNumber;
	let string = '';

	const numbers = Object.keys(numerals)
		.map(s => parseInt(s))
		.sort((num1, num2) => num2 - num1)
		.forEach((value) => {
			while (number >= value) {
				const numeral = numerals[value];
				string = `${string}${numeral}`;
				number -= value;
			}
		});

	return string;
}