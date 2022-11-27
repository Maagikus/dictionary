function Quize() {
	return (
		<section className="quize">
			<div className="quize__container">
				<div className="quize__body">
					<div className="quize__title">Quize</div>
					<div className="quize__content">
						<div className="quize__choose choose">
							<div className="choose__title">Сhoose the ability to train:</div>
							<div className="choose__items">
								<button type="submit" className="choose__button button">Listening</button>
								<button type="submit" className="choose__button button">Speaking</button>
								<button type="submit" className="choose__button button">Vocabulary</button>
							</div>
						</div>
						<div className="quize__wrapper body-quize">
							<div className="body-quize__intro">Enter the missing word</div>
							<div className="body-quize__control">
								<button type="submit" className="body-quize__button button">Start</button>
								<button type="submit" className="body-quize__button button">Stop</button>
							</div>
							<ul className="body-quize__list">
								<li className="body-quize__item"></li>
							</ul>
							<input autocomplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="" className="body-quize__input input" />
							<div className="body-quize__control">
								<button type="submit" className="body-quize__button button">Check</button>
								<button type="submit" className="body-quize__button button">Skip</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Quize