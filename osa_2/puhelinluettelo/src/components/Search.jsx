const Search = ({ search, setSearch, setShowAll }) => {
  const changeSearchInput = (event) => {
    console.log("Input changed for phone input element. Original value", search, ", new value", event.target.value)

    setSearch(event.target.value)

    event.target.value != ""
      ? setShowAll(false)
      : setShowAll(true)
  }

    return (
        <div>
            <form>
            <p>
              <label htmlFor="search"> Search with name </label>
            </p>
            <p>
              <input id="search" name="search" value={search} onChange={changeSearchInput} />
            </p>
            </form>
        </div>
    )
}

export default Search