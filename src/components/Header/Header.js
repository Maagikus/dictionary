import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { LogOut } from '../../store/userSlice'
import { selectIsAuth } from '../../store/userSlice'
function Header() {
	const isAuth = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	const [menuOpen, setMenuOpen] = useState(false)
	const onLogout = () => {
		dispatch(LogOut())
		window.localStorage.setItem('token', '')
	}

	if (menuOpen) {
		document.getElementsByTagName('html')[0].setAttribute('class', 'menu-open')
	} else {
		document.getElementsByTagName('html')[0].removeAttribute('class', 'menu-open')
	}


	const menuToggle = () => {
		setMenuOpen(!menuOpen)
	}
	console.log(menuOpen);
	return (
		<header className="header">
			<div className="header__container">
				<NavLink to={isAuth ? '/dictionary' : '/Home'} className="header__logo">Interective Dictionary</NavLink>
				<div className="header__menu menu">
					<button onClick={menuToggle} type="button" className="menu__icon icon-menu"><span></span></button>
					<nav className="menu__body">
						<ul className="menu__list">
							{isAuth ?
								<>
									<li className="menu__item _active"><NavLink onClick={() => setMenuOpen(false)} to="/dictionary">Dictionary</NavLink></li>
									<li className="menu__item"><NavLink onClick={() => setMenuOpen(false)} to="/quize">Quize</NavLink></li>
									<li className="menu__item"><NavLink onClick={() => setMenuOpen(false)} to="/results">Results</NavLink></li>
								</>
								: null
							}
							{isAuth ?
								<><li className="header__login"><NavLink onClick={() => {
									onLogout()
									setMenuOpen(false)
								}
								} to="/Home" className="button">Log out</NavLink></li></>
								: <>
									<li className="header__login"><NavLink onClick={() => setMenuOpen(false)} to="/login" className="button">Login In</NavLink></li>
									<li className="header__registration"><NavLink onClick={() => setMenuOpen(false)} to="/registration" className="button">Registration</NavLink></li>
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