import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserDictionary } from "../../store/dictionarySlice"
import AddForm from "../AddForm/AddForm"
import usePagination from '../../hooks/usePaginnation.hook'
import Loader from '../Loader/Loader'
import useApiDictionaryService from "../../services/api.dictionary.service";
function Dictionary() {
	const id = useSelector(state => state.user.data._id)
	const data = useSelector(state => state.dictionary.dictionary)
	const status = useSelector(state => state.dictionary.status)
	const { loading, error, getDefinitionAndExample } = useApiDictionaryService()
	const dispatch = useDispatch()
	const [defifnition, setDefinition] = useState('')
	const [example, setExample] = useState('')
	const [openDefinition, setOpenDefinition] = useState(false)
	const [formOpen, setFormOpen] = useState(false)
	const [filter, setFilter] = useState('')
	const [foundWord, setFoundWord] = useState([])
	const [popupVisible, setPopupVisible] = useState(false)
	const [descriptionStatus, setDescriptionStatus] = useState('idle')
	useEffect(() => {
		dispatch(fetchUserDictionary(id))
	}, [])
	const {
		firstContentIndex,
		lastContentIndex,
		nextPage,
		prevPage,
		page,
		setPage,
		totalPages,
	} = usePagination({
		contentPerPage: 10,
		count: data.length,
	});
	const viewDescr = async (someWord) => {
		setDescriptionStatus('loading')
		getDefinitionAndExample(someWord)
			.then(({ definition, example }) => {
				setDescriptionStatus('loaded')
				setDefinition(definition)
				setExample(example)
			})

		// const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${someWord}`)
		// if (response.ok) {
		// 	setDescriptionStatus('loaded')
		// 	const data = await response.json()
		// 	const { definition, example } = data[0].meanings[0].definitions[0]
		// 	setDefinition(definition)
		// 	setExample(example)
		// }
	}
	const renderDictionary = (arr) => {
		if (arr) {
			const element = arr.slice(firstContentIndex, lastContentIndex).map(({ word, translation, transcription }, index) => {
				return (
					<li key={index} className="left-content__item item-content">
						<ul onTouchStart={() => {
							setOpenDefinition(true)
							viewDescr(word)
						}
						} onClick={() => viewDescr(word)} className="item-content__list">
							<li className="item-content__item">{word}</li>
							<li className="item-content__item">{transcription}</li>
							<li className="item-content__item">{translation}</li>
						</ul>
					</li>
				)
			})
			return element
		}
	}
	const filteredDictionary = (e, word) => {
		e.preventDefault()
		const filteredList = data.filter(item => item.word === word)
		if (filteredList.length > 0) {
			viewDescr(word)
			setFoundWord(filteredList)
			setPopupVisible(true)
		}
	}
	const renderFoundedWord = (arr) => {
		return (
			<div className="find-popup">
				<div onClick={() => setPopupVisible(false)} class="find-popup__close">x</div>
				<div class="find-popup__descr">{defifnition}</div>
				<ul
					className="find-popup__list">
					{arr.map(({ word, transcription, translation }) => {
						return (
							<>
								<li className="find-popup__item">{word}</li>
								<li className="find-popup__item">{transcription}</li>
								<li className="find-popup__item">{translation}</li>
							</>
						)
					})}
				</ul>
			</div>
		)
	}
	const foundElement = renderFoundedWord(foundWord)
	const element = renderDictionary(data)
	if (popupVisible) {
		document.body.style.overflow = "hidden"
	}
	return (
		<section onClick={(e) => {
			setFormOpen(false)
			e.stopPropagation()
		}} className="dictionary">

			{popupVisible ? foundElement : null}
			<div className="dictionary__container">
				<div className="dictionary__body body-dictionary">
					<div className="body-dictionary__header header-main">
						<ul className="header-main__list">
							<li className="header-main__item">Main Dictionary</li>
							{/* <li className="header-main__item">Irregular verbs</li> */}
						</ul>
					</div>
					<div className="body-dictionary__content">
						<div className="body-dictionary__top top-dictionary">
							<ul className="top-dictionary__list">
								<li className="top-dictionary__item">word</li>
								<li className="top-dictionary__item">transcription</li>
								<li className="top-dictionary__item">Translation</li>
							</ul>
							<form onSubmit={(e) => filteredDictionary(e, filter)} className="top-dictionary__serch" action="#">
								<input value={filter} onChange={(e) => {
									setFilter(e.target.value)
								}} type="text" name="form[]" data-error="Error" placeholder="Search word" className="top-dictionary__input input" />
								<button className="top-dictionary__icon"><img src="search.png" alt="search" /></button>
							</form>
						</div>
						<div className="body-dictionary__bottom">
							<div className="body-dictionary__left left-content">
								{status === 'loading'
									?
									<Loader />
									:
									<>
										<ul className="left-content__list">
											{element}
										</ul>
										<div className="pagination">
											<button onClick={prevPage} className="page-arrow">
												&larr;
											</button>
											{[...Array(totalPages).keys()].map((el) => (
												<button
													onClick={() => setPage(el + 1)}
													key={el}
													className={`page ${page === el + 1 ? "active" : ""}`}
												>
													{el + 1}
												</button>
											))}
											<button onClick={nextPage} className="page-arrow">
												&rarr;
											</button>
										</div>
									</>
								}
							</div>
							<div className={openDefinition ? "body-dictionary__right right-content _right-open" : "body-dictionary__right right-content"} >
								<div onClick={() => setOpenDefinition(false)} className="right-content__close"></div>
								<h2 className="right-content__title">Description and usage guide</h2>
								{descriptionStatus === 'loading'
									?
									<Loader />
									:
									<>
										<div className="right-content__body definition">
											<h2 className="definition__title">Definition:</h2>
											<p className="definition__content">{defifnition}</p>
										</div>
										<div className="right-content__body usage">
											<h2 className="usage__title">Example:</h2>
											<p className="usage__content">{!example ? 'we dont have example' : example}</p>
										</div>
									</>
								}
							</div>
						</div>
					</div>
					<div onClick={(e) => {
						setFormOpen(true)
						e.stopPropagation()
					}} className="body-dictionary__add">+</div>
				</div>
				<div onClick={e => e.stopPropagation()} className={formOpen ? "dictionary__new new _formOpen" : "dictionary__new new"}>
					<div className="new__title">New word</div>
					<AddForm setActive={setFormOpen} />
				</div>
			</div>
		</section >
	)
}
export default Dictionary