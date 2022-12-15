import {
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";
import { useSelector, } from 'react-redux'
import { privateRoutes, publicRoutes } from '../../router/routes'
import { selectIsAuth } from '../../store/userSlice'
const AppRouter = () => {
	const isAuth = useSelector(selectIsAuth)
	console.log();
	return isAuth
		?
		(
			<Switch>
				<>
					{
						privateRoutes.map(({ path, Component }, index) => (
							<Route key={index} path={path} component={Component} />
						))
					}
					<Redirect to='/dictionary' />

				</>

			</Switch>
		)
		:
		(
			<Switch>
				<>
					{
						publicRoutes.map(({ path, Component }, index) => (
							<Route key={index} path={path} component={Component} />
						)
						)
					}
					<Redirect to='/Home' />
				</>
			</Switch>
		)
}
export default AppRouter