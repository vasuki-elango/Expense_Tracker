export const Input = ({ label, type, placeholder, name, value, onChange }) => {
    return (
        <div className=''>
            <label htmlFor={name}>{label}</label>

            <input
                type={type}
                name={name}
                value={value}
                className='w-full bg-transparent outline-none input-box '
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
}

