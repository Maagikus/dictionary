import { useState } from "react"
import { useSelector } from "react-redux"
import { getData } from "../../services/data.service"
function Results() {
	const wordsList = useSelector(state => state.dictionary.dictionary)
	const currentDate = getData()
	const filteredWordsList = wordsList.filter(item => {
		return item.createdAt.slice(0, 10).replace(/-/g, '') >= currentDate
	})
	return (
		<section className="result">
			<div className="result__container">
				<div className="result__body">
					<div className="result__title">Results</div>
					<div className="result__content">
						<div className="result__learned">You learned {filteredWordsList.length} new words this week</div>
						<div className="result__vocab">Your vocabulary contains {wordsList.length} words</div>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Results