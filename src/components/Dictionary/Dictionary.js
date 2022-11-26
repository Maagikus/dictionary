import AddForm from "../AddForm/AddForm"

function Dictionary() {
	return (
		<section class="dictionary">
			<div class="dictionary__container">
				{/* <!-- <aside class="dictionary__menu menu-main">
					<ul class="menu-main__list">
						<li class="menu-main__item _active"><a href="#">Dictionary</a></li>
						<li class="menu-main__item"><a href="#">Quize</a></li>
						<li class="menu-main__item"><a href="#">Results</a></li>
					</ul>
				</aside> --> */}
				<div class="dictionary__body body-dictionary">
					<div class="body-dictionary__header header-main">
						<ul class="header-main__list">
							<li class="header-main__item">Main Dictionary</li>
							<li class="header-main__item">Irregular verbs</li>
						</ul>
					</div>
					<div class="body-dictionary__content">
						<div class="body-dictionary__top top-dictionary">
							<ul class="top-dictionary__list">
								<li class="top-dictionary__item">word</li>
								<li class="top-dictionary__item">transcription</li>
								<li class="top-dictionary__item">Translation</li>
							</ul>
							<form class="top-dictionary__serch" action="#">
								<input type="text" name="form[]" data-error="Error" placeholder="Search word" class="top-dictionary__input input" />

							</form>
						</div>
						<div class="body-dictionary__bottom">
							<div class="body-dictionary__left left-content">
								<ul class="left-content__list">
									<li class="left-content__item item-content">
										<ul class="item-content__list">
											<li class="item-content__item">Hello</li>
											<li class="item-content__item">Hello</li>
											<li class="item-content__item">Hello</li>
										</ul>
									</li>
									<li class="left-content__item item-content">
										<ul class="item-content__list">
											<li class="item-content__item">Hello</li>
											<li class="item-content__item">Hello</li>
											<li class="item-content__item">Hello</li>
										</ul>
									</li>
									<li class="left-content__item item-content">
										<ul class="item-content__list">
											<li class="item-content__item">Hello</li>
											<li class="item-content__item">Hello</li>
											<li class="item-content__item">Hello</li>
										</ul>
									</li>
								</ul>
							</div>
							{/* <!-- _right-open --> */}
							<div class="body-dictionary__right right-content">
								<div class="right-content__close"></div>
								<h2 class="right-content__title">Description and usage guide</h2>
								<div class="right-content__body definition">
									<h2 class="definition__title">Definition:</h2>
									<p class="definition__content">DefinitiDefinition Definition Definition Definition Definition on</p>
								</div>
								<div class="right-content__body usage">
									<h2 class="usage__title">Definition:</h2>
									<p class="usage__content">DefinitiDefinition
										Definition Definition Definit
										ion Definition on </p>
								</div>
							</div>
						</div>
					</div>
					<div class="body-dictionary__add">+</div>
				</div>
				<div class="dictionary__new new">
					<div class="new__title">New word</div>
					<AddForm />
				</div>
			</div>
		</section>
	)
}
export default Dictionary