const Search = ({ searchTerm, setSearchTerm }) => {
	const changeSearchTerm = event => {
		console.log(`Value of search term input changed. Original value ${searchTerm}, new value ${event.target.value}`)

		console.log(`Updating search term variable value to ${event.target.value}`)

		setSearchTerm(event.target.value)
	}

	return (
		<div>
			<input value={searchTerm} onChange={changeSearchTerm} />
		</div>
	)
}

export default Search