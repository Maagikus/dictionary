import { useState } from "react";
import { useSelector } from "react-redux";

function Quize() {
	const [condition, setCondition] = useState('Choose quize')
	const [isCorrect, setIsCorrect] = useState(true)
	const [description, setDescription] = useState('')
	const [ansver, setAnsver] = useState('')
	const [error, setError] = useState('')
	const [correctWord, setCorrectWord] = useState('')
	const [typeOfQuize, setTypeOfQuize] = useState('')
	const data = useSelector(state => state.dictionary.dictionary)
	const renderChooseElement = (e) => {
		e.preventDefault()
		switch (e.target.textContent) {
			case 'Listening':
				setTypeOfQuize('Listening')
				setCondition('Enter a word from the audio')

				break;
			case 'Vocabulary':
				setTypeOfQuize('Vocabulary')
				setCondition('Enter the word that matches the description')
				break;
		}
	}
	const viewDescr = async (word) => {
		const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
		const data = await response.json()
		const { definition, example } = data[0].meanings[0].definitions[0]
		setDescription(definition)

	}
	const onStart = (e) => {
		e.preventDefault()
		setAnsver('')
		setIsCorrect(true)
		const random = Math.floor(Math.random() * data.length)
		switch (typeOfQuize) {
			case 'Listening':


				break;
			case 'Vocabulary':
				const word = data[random].word
				setCorrectWord(word)
				viewDescr(word)
				break;
		}
	}
	const onCheck = (e) => {
		e.preventDefault()
		if (ansver === correctWord) {
			setIsCorrect(true)
			onStart(e)
		} else {
			setIsCorrect(false)
			setError('incorrect word')
		}
		console.log(isCorrect, ansver, correctWord);
	}

	return (
		<section className="quize">
			<div className="quize__container">
				<div className="quize__body">
					<div className="quize__title">Quize</div>
					<div className="quize__content">
						<div className="quize__choose choose">
							<div className="choose__title">Сhoose the ability to train:</div>
							<div className="choose__items">
								<button onClick={(e) => renderChooseElement(e)} type="submit" className={typeOfQuize === 'Listening' ? "choose__button button _active" : "choose__button button"}>Listening</button>
								{/* <button onClick={(e) => renderChooseElement(e)} type="submit" className="choose__button button">Speaking</button> */}
								<button onClick={(e) => renderChooseElement(e)} type="submit" className={typeOfQuize === 'Vocabulary' ? "choose__button button _active" : "choose__button button"}>Vocabulary</button>
							</div>
						</div>
						<form action="#" onSubmit={e => onCheck(e)} className="quize__wrapper body-quize">
							<div className="body-quize__intro">{condition}</div>
							<div className="body-quize__control">
								<button onClick={(e) => onStart(e)} type="submit" className="body-quize__button button">Start</button>
								<button type="submit" className="body-quize__button button">Stop</button>
							</div>
							<div class="body-quize__descr">{description}</div>
							{!isCorrect ? <div className="body-quize__error">{error}</div> : null}
							<input value={ansver} onChange={e => setAnsver(e.target.value)} autoComplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="" className="body-quize__input input" />
							<div className="body-quize__control">
								<button type="submit" className="body-quize__button button">Check</button>
								<button type="submit" className="body-quize__button button">Skip</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Quize