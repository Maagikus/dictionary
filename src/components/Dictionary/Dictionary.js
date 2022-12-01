import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserDictionary } from "../../store/dictionarySlice"
import AddForm from "../AddForm/AddForm"
import usePagination from '../../hooks/usePaginnation.hook'

function Dictionary() {
	const id = useSelector(state => state.user.data._id)
	const data = useSelector(state => state.dictionary.dictionary)
	const dispatch = useDispatch()
	const [defifnition, setDefinition] = useState('')
	const [example, setExample] = useState('')

	useEffect(() => {
		dispatch(fetchUserDictionary(id))

	}, [data])
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
		const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${someWord}`)
		const data = await response.json()
		const { definition, example } = data[0].meanings[0].definitions[0]
		setDefinition(definition)
		setExample(example)


	}
	const renderDictionary = (arr) => {
		if (arr) {
			const element = arr.slice(firstContentIndex, lastContentIndex).map(({ word, translation, transcription }, index) => {
				return (
					<li key={index} className="left-content__item item-content">
						<ul onClick={() => viewDescr(word)} className="item-content__list">
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

	const element = renderDictionary(data)

	return (
		<section className="dictionary">
			<div className="dictionary__container">
				{/* <!-- <aside className="dictionary__menu menu-main">
					<ul className="menu-main__list">
						<li className="menu-main__item _active"><a href="#">Dictionary</a></li>
						<li className="menu-main__item"><a href="#">Quize</a></li>
						<li className="menu-main__item"><a href="#">Results</a></li>
					</ul>
				</aside> --> */}
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
							<form className="top-dictionary__serch" action="#">
								<input type="text" name="form[]" data-error="Error" placeholder="Search word" className="top-dictionary__input input" />
							</form>
						</div>
						<div className="body-dictionary__bottom">
							<div className="body-dictionary__left left-content">
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
							</div>
							{/* <!-- _right-open --> */}
							<div className="body-dictionary__right right-content">
								<div className="right-content__close"></div>
								<h2 className="right-content__title">Description and usage guide</h2>
								<div className="right-content__body definition">
									<h2 className="definition__title">Definition:</h2>
									<p className="definition__content">{defifnition}</p>
								</div>
								<div className="right-content__body usage">
									<h2 className="usage__title">Example:</h2>
									<p className="usage__content">{!example ? 'we dont have example' : example}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="body-dictionary__add">+</div>
				</div>
				<div className="dictionary__new new">
					<div className="new__title">New word</div>
					<AddForm />
				</div>
			</div>
		</section>
	)
}
export default Dictionary