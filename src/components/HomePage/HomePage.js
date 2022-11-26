import { NavLink } from "react-router-dom";
function HomePage() {
	return (
		<section class="welcome">
			<div class="welcome__container">
				<h2 class="welcome__title">Welcome to the interactive dictionary
				</h2>
				<div class="welcome__content">
					<p class="welcome__text">You need to register to continue</p>
					<NavLink to="/registration" type="submit" class="welcome__button button">Registration</NavLink>
				</div>
			</div>
		</section>
	)
}
export default HomePage