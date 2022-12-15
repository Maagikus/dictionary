const QuizeForm = ({ condition, onStop, typeOfQuize, isCorrect, error, description, ansver, setAnsver, correctWord, onCheck, onSkip, setUnnknown, onStart }) => {
	return (
		<form action="#" className="quize__wrapper body-quize">
			<div className="body-quize__intro">{condition}</div>
			<div className="body-quize__control">
				<button onClick={(e) => {
					onStart(e)
					setUnnknown([])
				}} type="submit" className="body-quize__button button">Start</button>
				<button type="submit" onClick={e => onStop(e)} className="body-quize__button button">Stop</button>
			</div>
			{typeOfQuize === 'Vocabulary' ? <div className="body-quize__descr">{description}</div> : null}
			{!isCorrect ? <div className="body-quize__error">{error}</div> : null}
			{/* {correctWord} */}
			<input value={ansver} onChange={e => setAnsver(e.target.value)} autoComplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="" className="body-quize__input input" />
			<div className="body-quize__control">
				<button type="submit" onClick={e => onCheck(e)} className="body-quize__button button">Check</button>
				<button type="submit" onClick={e => onSkip(e)} className="body-quize__button button">Skip</button>
			</div>
		</form>
	)
}
export default QuizeForm