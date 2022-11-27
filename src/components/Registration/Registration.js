import { fetchUserData, selectIsAuth, addUserData } from '../../store/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
function Registration() {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [emailError, setEmailError] = useState('Email can not be empty')
	const [passwordError, setPasswordError] = useState('Password can not be empty')
	const [emailDirty, setEmailDirty] = useState(false)
	const [passwordDirty, setPasswordDirty] = useState(false)
	const [loginError, setLoginError] = useState('')
	const [formValid, setFormValid] = useState(false)
	useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [emailError, passwordError])
	const data = {
		email: email,
		password: password,
		fullName: name,
	}
	const isEmailValid = (e) => {
		setEmail(e.target.value)
		const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
		if (!EMAIL_REGEXP.test(e.target.value)) {
			setEmailError('Please write correct email')
		} else {
			setEmailError('')
		}
	}
	const isPasswordlValid = (e) => {
		setPassword(e.target.value)
		if (e.target.value.length < 5) {
			setPasswordError('Password should be biggest than 5')
			if (!e.target.value) {
				setPasswordError('Password can not be empty')
			}
		} else {
			setPasswordError('')
		}
	}
	const onBlure = (e) => {
		switch (e.target.name) {
			case 'email':
				setEmailDirty(true)
				break;
			case 'password':
				setPasswordDirty(true)
				break;
		}
	}
	const onSubmit = async (e) => {
		e.preventDefault()
		const resp = await dispatch(addUserData(data))
		if (!resp.payload) {
			setLoginError('can`t find user')
		}
		if (resp.payload.token) {
			window.localStorage.setItem('token', resp.payload.token)
		}
	}
	return (
		<section className="registration">
			<div className="registration__container">
				<div className="registration__wrapper">
					<form onSubmit={e => onSubmit(e)} action="#" className="registration__form form-main">
						<div className="form-main__wrapper">
							<div className="form-main__item">
								<label className="form-main__lable">Full name</label>
								<input value={name} onChange={e => setName(e.target.value)} autoComplete='off' type="text" name="form[]" data-error="Ошибка" placeholder="" className="form-main__input input" />
							</div>
							<div className="form-main__item">
								<label className="form-main__lable">E-mail</label>
								<input
									onBlur={e => onBlure(e)}
									onChange={e => isEmailValid(e)}
									value={email} autoComplete='off' type="text" name="email" data-error="Ошибка" placeholder="" className="form-main__input input" />
								{(emailDirty && emailError) && <div className="invalid">{emailError}</div>}
							</div>
							<div className="form-main__item">
								<label className="form-main__lable">Password</label>
								<input
									onBlur={e => onBlure(e)}
									onChange={e => isPasswordlValid(e)}
									value={password} autoComplete='off' type="password" name="password" data-error="Ошибка" placeholder="" className="form-main__input input" />
								{(passwordDirty && passwordDirty) && <div className="invalid">{passwordError}</div>}
							</div>
						</div>
						<button className="form-main__button button">Let`s start to learn</button>
					</form>
				</div>
			</div>
		</section>
	)
}
export default Registration