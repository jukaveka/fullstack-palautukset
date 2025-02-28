const Search = ({ search, onChange }) => {
    return (
        <div>
            <form>
            <p>
              <label htmlFor="search"> Search with name </label>
            </p>
            <p>
              <input id="search" name="search" value={search} onChange={onChange} />
            </p>
            </form>
        </div>
    )
}

export default Search