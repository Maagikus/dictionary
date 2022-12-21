import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUserDictionary } from "../../store/dictionarySlice"
import useApiDictionaryService from "../../services/api.dictionary.service";
function AddForm({ setActive }) {
	const dispatch = useDispatch()
	const [word, setWord] = useState('')
	const [translation, setTranslation] = useState('')
	const [formErrorMassage, setFormErrorMassage] = useState('')
	const [transcription, setTranscription] = useState('')
	const [audio, setAudio] = useState('')
	const [formError, setFormError] = useState(false)
	const { loading, error, getTranscriptionAndAudio } = useApiDictionaryService()
	const onSubmit = async (e) => {

		e.preventDefault()
		if (word.length > 1 && translation.length > 1) {
			getTranscriptionAndAudio(word.replace(/ /g, '%20'))
				.then(({ transcription, audio }) => {
					setTranscription(transcription)
					setAudio(audio)
					const dictionaryData = {
						word: word,
						transcription: transcription,
						translation: translation,
						audio: audio
					}

					dispatch(addUserDictionary(dictionaryData))
				})
				.catch((e) => {
					setFormError(true)
					setFormErrorMassage('The entered word is incorrect or does not exist')
					const dictionaryData = {
						word: word,
						transcription: '',
						translation: translation,
						audio: audio
					}
					dispatch(addUserDictionary(dictionaryData))

				})

			setWord('')
			setTranslation('')
			setActive(false)
			setFormError(false)
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
			{formError ? <div className="error">{formErrorMassage}</div> : null
			}
		</form >
	)
}
export default AddForm
