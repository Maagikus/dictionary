import { BrowserRouter as Router } from "react-router-dom";
import HomePage from '../HomePage/HomePage';
import Header from '../Header/Header'
import AppRouter from '../AppRouter/AppRouter'
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "../../store/userSlice";
import { useEffect } from "react";
function App() {
	const token = localStorage.getItem('token')
	const dispatch = useDispatch()
	useEffect(() => {
		if (!!token) {
			dispatch(fetchAuthMe(token))
		}
	}, [])
	return (
		<Router>
			<>
				<Header />
				<AppRouter />
			</>
		</Router>

	)
}

export default App;
