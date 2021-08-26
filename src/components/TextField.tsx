import React from "react";

interface Props {
    text: any,
    input: string,
    handleChange: (e: any) => any
}

const TextField: React.FC<Props> = ({ text, input, handleChange }) => {
    return (
        <>
            <div className="form-floating mb-3" style={{ width: "300px" }}>
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={input} onChange={handleChange} />
                <label htmlFor="floatingInput">{text}</label>
            </div>
        </>
    )
}

export default TextField;