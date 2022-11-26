function AddForm() {
	return (
		<form action="#" class="dictionary__form form-dictionary">
			<div class="form-dictionary__wrapper">
				<div class="form-dictionary__item">
					<label class="form-dictionary__lable">Word</label>
					<input autocomplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="" class="form-dictionary__input input" />
				</div>
				<div class="form-dictionary__item">
					<label class="form-dictionary__lable">Translation</label>
					<input autocomplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="" class="form-dictionary__input input" />
				</div>
			</div>
			<button class="form-dictionary__button button">Add</button>
		</form>
	)
}
export default AddForm
