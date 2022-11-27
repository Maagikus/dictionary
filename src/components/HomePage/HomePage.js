import { NavLink } from "react-router-dom";
function HomePage() {
	return (
		<section className="welcome">
			<div className="welcome__container">
				<h2 className="welcome__title">Welcome to the interactive dictionary
				</h2>
				<div className="welcome__content">
					<p className="welcome__text">You need to register to continue</p>
					<NavLink to="/registration" type="submit" className="welcome__button button">Registration</NavLink>
				</div>
			</div>
		</section>
	)
}
export default HomePage