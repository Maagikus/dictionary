function Registration() {
	return (
		<section class="registration">
			<div class="registration__container">
				<div class="registration__wrapper">
					<form action="#" class="registration__form form-main">
						<div class="form-main__wrapper">
							<div class="form-main__item">
								<label class="form-main__lable">Full name</label>
								<input autocomplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="" class="form-main__input input" />
							</div>
							<div class="form-main__item">
								<label class="form-main__lable">E-mail</label>
								<input autocomplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="" class="form-main__input input" />
							</div>
							<div class="form-main__item">
								<label class="form-main__lable">Password</label>
								<input autocomplete="off" type="password" name="form[]" data-error="Ошибка" placeholder="" class="form-main__input input" />
							</div>
							<div class="form-main__item">
								<label class="form-main__password">Password</label>
								<input autocomplete="off" type="password" name="form[]" data-error="Ошибка" placeholder="" class="form-main__input input" />
							</div>
						</div>
						<button class="form-main__button button">Let`s start to learn</button>
					</form>
				</div>
			</div>
		</section>
	)
}
export default Registration