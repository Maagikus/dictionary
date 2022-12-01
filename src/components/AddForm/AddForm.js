import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUserDictionary } from "../../store/dictionarySlice"
function AddForm({ setActive }) {
	const dispatch = useDispatch()
	const [word, setWord] = useState('')
	const [translation, setTranslation] = useState('')
	const [formErrorMassage, setFormErrorMassage] = useState('')
	const [formError, setFormError] = useState(false)
	const onSubmit = async (e) => {
		e.preventDefault()
		if (word.length > 1 && translation.length > 1) {
			const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
			if (response.status === 200) {
				const data = await response.json()
				const { text, audio } = data[0].phonetics[1]
				const dictionaryData = {
					word: word,
					transcription: text ? text : '',
					translation: translation,
					audio: audio
				}
				dispatch(addUserDictionary(dictionaryData))
				setWord('')
				setTranslation('')
				setActive(false)
				setFormError(false)
			}
			if (response.status === 404) {
				setFormError(true)
				setFormErrorMassage('something was wrong, pleace check your word')
			}
		}
	}
	return (
		<form onSubmit={e => onSubmit(e)} action="#" className="dictionary__form form-dictionary">
			<div className="form-dictionary__wrapper">
				<div className="form-dictionary__item">
					<label className="form-dictionary__lable">Word</label>
					<input value={word} onChange={e => {
						setWord(e.target.value)
						setFormError(false)
					}} autoComplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="" className="form-dictionary__input input" />
				</div>
				<div className="form-dictionary__item">
					<label className="form-dictionary__lable">Translation</label>
					<input value={translation} onChange={(e) => setTranslation(e.target.value)} autoComplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="" className="form-dictionary__input input" />
				</div>
			</div>
			<button className="form-dictionary__button button">Add</button>
			{formError ? <div>{formErrorMassage}</div> : null}
		</form>
	)
}
export default AddForm
