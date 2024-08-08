import React from 'react'

function Button({option, handleOption, handleButtonClick, showQuote, SausageSizzle, items}) {
    return (
        <div>
            <select
                value={option}
                onChange={handleOption}
            >
                <option value="">Choose Menu </option>
                <option value="SausageSizzle">SausageSizzle</option>
                <option value="MeatOnly">Meat Only</option>
                <option value="TwoCourse">2 Course</option>
                <option value="ThreeCourse">3 Course</option>
                <option value="DeluxeCatering">Deluxe Catering</option>
            </select>

            <button onClick={handleButtonClick}>Create Quote</button>
            {showQuote && <SausageSizzle items={items} />}

        </div>
    )
}

export default Button
