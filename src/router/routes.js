import Home from '../components/HomePage/HomePage'
import Registration from '../components/Registration/Registration'
import Login from '../components/Login/Login'
import Dictionary from '../components/Dictionary/Dictionary'
import Results from '../components/Results/Results'
import Quize from '../components/Quize/Quize'
export const publicRoutes = [
	{
		path: '/registration',
		Component: Registration,

	},
	{
		path: '/login',
		Component: Login,

	},
	{
		path: '/Home',
		Component: Home,

	}
]
export const privateRoutes = [
	{
		path: '/dictionary',
		Component: Dictionary
	},
	{
		path: '/results',
		Component: Results
	},
	{
		path: '/quize',
		Component: Quize
	},




]

