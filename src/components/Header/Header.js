import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { LogOut } from '../../store/userSlice'
import { selectIsAuth } from '../../store/userSlice'
function Header() {
	const isAuth = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	const onLogout = () => {
		dispatch(LogOut())
		window.localStorage.setItem('token', '')
	}
	return (
		<header class="header">
			<div class="header__container">
				<a href="" class="header__logo">Interective Dictionary</a>
				<div class="header__menu menu">
					<button type="button" class="menu__icon icon-menu"><span></span></button>
					<nav class="menu__body">
						<ul class="menu__list">
							{isAuth ?
								<>
									<li class="menu__item _active"><NavLink to="/dictionary">Dictionary</NavLink></li>
									<li class="menu__item"><a href="#">Quize</a></li>
									<li class="menu__item"><a href="#">Results</a></li>
								</>
								: null
							}
							{isAuth ?
								<><li class="header__login"><NavLink onClick={onLogout} to="/Home" className="button">Log out</NavLink></li></>
								: <>
									<li class="header__login"><NavLink to="/login" className="button">Login In</NavLink></li>
									<li class="header__registration"><NavLink to="/registration" className="button">Registration</NavLink></li>
								</>
							}
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}
export default Header