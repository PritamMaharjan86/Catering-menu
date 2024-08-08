import React from 'react'

function Input({handleSubmit, inputType, inputValue, handleTypeChange, handleValueChange}) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Input Type:
                    <select value={inputType} onChange={handleTypeChange}>
                        <option value="text">Customer Name</option>
                        <option value="number">Customer Number</option>
                        <option value="email">Customer Email</option>
                        <option value="date">Date of Function</option>
                        <option value="time">Time of Function</option>
                        <option value="address">Address</option>
                        <option value="noofpeople">Number of people</option>
                        <option value="bread">Bread</option>
                        <option value="pumpkin">Pumpkin</option>
                        <option value="sidings">Sidings</option>
                        <option value="meat">Meats</option>
                        <option value="salad">Salad</option>
                        <option value="appetiser">Appetiser</option>
                        <option value="cost">Cost</option>
                    </select>
                </label>
                <br />
                <label>
                    Enter value:
                    <input
                        type={inputType}
                        value={inputValue}
                        onChange={handleValueChange}
                    />
                    {inputType === 'bread' && (
                        <select
                            value={inputValue}
                            onChange={handleValueChange}
                        >
                            <option value="">Select an option</option>
                            <option value="banana bread">bread 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    )}

                </label>
                <br />
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default Input
