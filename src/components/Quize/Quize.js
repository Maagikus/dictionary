import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useApiDictionaryService from "../../services/api.dictionary.service";
import QuizeForm from "./QuizeForm";

function Quize() {

	const [condition, setCondition] = useState('Choose quize');
	const [choosenElement, setChoosenElement] = useState(false);
	const [isCorrect, setIsCorrect] = useState(true);
	const [description, setDescription] = useState('');
	const [ansver, setAnsver] = useState('');
	const [error, setError] = useState('');
	const [correctWord, setCorrectWord] = useState('');
	const [typeOfQuize, setTypeOfQuize] = useState('');
	const [unnknown, setUnnknown] = useState([]);
	const [popupVisible, setPopupVisible] = useState(false)
	const data = useSelector(state => state.dictionary.dictionary);
	const { getDefinitionAndExample } = useApiDictionaryService()


	const renderChooseElement = (e) => {
		e.preventDefault()
		switch (e.target.textContent) {
			case 'Listening':
				setChoosenElement(true)
				setTypeOfQuize('Listening')
				setCondition('Enter a word from the audio')

				break;
			case 'Vocabulary':
				setChoosenElement(true)
				setTypeOfQuize('Vocabulary')
				setCondition('Enter the word that matches the description')
				break;
		}
	}
	const viewDescr = async (word) => {
		getDefinitionAndExample(word)
			.then(({ definition, example }) => {
				setDescription(definition)
			})
	}
	const onStart = (e) => {
		e.preventDefault()
		setAnsver('')
		setIsCorrect(true)
		if (typeOfQuize === 'Listening') {
			const filteredData = data.filter((item) => item.audio !== '')
			const random = Math.floor(Math.random() * filteredData.length)
			const { word, audio } = filteredData[random]
			new Audio(audio).play()
			setCorrectWord(word)
			viewDescr(word)
		} else {
			const filteredData = data.filter((item) => item.transcription !== '')
			const random = Math.floor(Math.random() * filteredData.length)
			const { word } = filteredData[random]
			setCorrectWord(word)
			viewDescr(word)

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
	}
	const onSkip = (e) => {
		e.preventDefault()
		setUnnknown([...unnknown, correctWord])
		onStart(e)
	}
	const onStop = (e) => {
		e.preventDefault()
		setPopupVisible(true)
	}
	// if (popupVisible) {
	// 	document.body.style.overflow = "hidden"
	// }
	const renderUnnknownWords = (arr) => {

		return (
			<div className="unnknown-popup">
				<div onClick={() => setPopupVisible(false)} className="unnknown-popup__close">x</div>
				{arr.length != 0
					?
					<ul
						className="unnknown-popup__list">
						{arr.map((item, index) => {
							return (
								<>
									<li key={index} className="unnknown-popup__item">{item}</li>
								</>
							)
						})}
					</ul>
					:
					<div>You are smarty student</div>
				}
			</div>
		)


	}
	const element = renderUnnknownWords(unnknown)

	return (
		<section className="quize">

			<div className="quize__container">
				{popupVisible ? element : null}
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
						{choosenElement
							?
							<>
								<QuizeForm
									condition={condition}
									onStart={onStart}
									setUnnknown={setUnnknown}
									onStop={onStop}
									typeOfQuize={typeOfQuize}
									description={description}
									isCorrect={isCorrect}
									error={error}
									correctWord={correctWord}
									ansver={ansver}
									setAnsver={setAnsver}
									onCheck={onCheck}
									onSkip={onSkip}
								/>
							</>

							:
							<div>Let`s choose quize</div>
						}

					</div>
				</div>
			</div >
		</section >
	)
}
export default Quize