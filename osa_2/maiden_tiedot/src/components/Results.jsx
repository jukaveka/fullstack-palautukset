const Results = ({ countries }) => {
    if (countries.length > 10) {
        return (
            <div>
                <p> There's more than 10 countries with matching search term. </p>
            </div>
        )
    }
    return (
        <div>
            {countries.map(country => 
                <p key={country.cca2}> {country.name.common} </p>
            )}
        </div>
    )
}

export default Results