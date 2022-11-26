import { LogIn, LogOut, } from '../../store/userSlice'
import { fetchUserData, selectIsAuth } from '../../store/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
function Login() {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const data = {
		email: email,
		password: password
	}
	const onsubmit = async (e) => {
		e.preventDefault()
		const resp = await dispatch(fetchUserData(data))
		if (resp.payload.token) {
			window.localStorage.setItem('token', resp.payload.token)

		}
		if (!resp.payload) {
			console.log('something was wrong');
		}


	}

	return (
		<section class="login">
			<div class="login__container">
				<div class="login__wrapper">
					<form onSubmit={(e) => onsubmit(e)} action="#" class="login__form form-main">
						<div class="form-main__wrapper">
							<div class="form-main__item">
								<label class="form-main__lable">E-mail</label>
								<input onInput={(e) => { setEmail(e.target.value) }} value={email} autoComplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="" class="form-main__input input" />
							</div>
							<div class="form-main__item">
								<label class="form-main__lable">Password</label>
								<input onInput={(e) => { setPassword(e.target.value) }} value={password} autoComplete="off" type="password" name="form[]" data-error="Ошибка" placeholder="" class="form-main__input input" />
							</div>
						</div>
						<button class="form-main__button button">Let`s start to learn</button>
					</form>
				</div>
			</div>
		</section>
	)
}
export default Login