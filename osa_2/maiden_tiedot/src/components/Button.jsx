const Button = ({ onChange, text }) => {
    return (
        <>
            <button onChange={onChange}> 
                {text} 
            </button>
        </>
    )
}

export default Button