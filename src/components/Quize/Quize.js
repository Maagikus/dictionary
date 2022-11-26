function Quize() {
	return (
		<section class="quize">
			<div class="quize__container">
				<div class="quize__body">
					<div class="quize__title">Quize</div>
					<div class="quize__content">
						<div class="quize__choose choose">
							<div class="choose__title">Сhoose the ability to train:</div>
							<div class="choose__items">
								<button type="submit" class="choose__button button">Listening</button>
								<button type="submit" class="choose__button button">Speaking</button>
								<button type="submit" class="choose__button button">Vocabulary</button>
							</div>
						</div>
						<div class="quize__wrapper body-quize">
							<div class="body-quize__intro">Enter the missing word</div>
							<div class="body-quize__control">
								<button type="submit" class="body-quize__button button">Start</button>
								<button type="submit" class="body-quize__button button">Stop</button>
							</div>
							<ul class="body-quize__list">
								<li class="body-quize__item"></li>
							</ul>
							<input autocomplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="" class="body-quize__input input" />
							<div class="body-quize__control">
								<button type="submit" class="body-quize__button button">Check</button>
								<button type="submit" class="body-quize__button button">Skip</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Quize