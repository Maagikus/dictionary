function AddForm() {
	return (
		<form action="#" className="dictionary__form form-dictionary">
			<div className="form-dictionary__wrapper">
				<div className="form-dictionary__item">
					<label className="form-dictionary__lable">Word</label>
					<input autocomplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="" className="form-dictionary__input input" />
				</div>
				<div className="form-dictionary__item">
					<label className="form-dictionary__lable">Translation</label>
					<input autocomplete="off" type="text" name="form[]" data-error="Ошибка" placeholder="" className="form-dictionary__input input" />
				</div>
			</div>
			<button className="form-dictionary__button button">Add</button>
		</form>
	)
}
export default AddForm
