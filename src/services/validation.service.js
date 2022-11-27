export function isEmailValid(value, massage) {
	const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
	if (EMAIL_REGEXP.test(value)) {
		massage('')

	} else {
		massage('Please write correct email')

	}
}
export function isPasswordlValid(value, massage) {
	if (value.length < 5) {
		massage('Password should be biggest than 5')
		if (!value) {
			massage('Password should be biggest than 5')

		}

	} else {

		massage('')
	}
}
