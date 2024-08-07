import React, { useState } from 'react';
import '../components/QuotingSheet.css';
import SausageSizzle from './Menu/SausageSizzle';

export default function QuotingSheet() {
    const [inputType, setInputType] = useState('text');
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);

    const handleTypeChange = (e) => {
        setInputType(e.target.value);
        setInputValue('');
    };

    const handleValueChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputValue) {
            alert('Please enter a value');
            return;
        }

        let newItem;

        switch (inputType) {
            case "text":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "name"
                };
                break;
            case "number":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "number"
                };
                break;
            case "email":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "email"
                };
                break;
            case "date":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "date"
                };
                break;
            case "time":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "time"
                };
                break;
            case "bread":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "bread"
                };
                break;
            case "pumpkin":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "pumpkin"
                };
                break;
            case "appetiser":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "appetiser"
                };
                break;
            case "salad":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "salad"
                };
                break;
            case "meat":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "meat"
                };
                break;

            default:
                return;
        }

        setItems([...items, newItem]);
        setInputValue('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Select input type:
                    <select value={inputType} onChange={handleTypeChange}>
                        <option value="text">Customer Name</option>
                        <option value="number">Customer Number</option>
                        <option value="email">Customer Email</option>
                        <option value="date">Date of Function</option>
                        <option value="time">Time of Function</option>
                        <option value="bread">Bread</option>
                        <option value="pumpkin">Pumpkin</option>
                        <option value="sidings">Sidings</option>
                        <option value="meat">Meats</option>
                        <option value="salad">Salad</option>
                        <option value="appetiser">Appetiser</option>
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

            <div>
                <h3>Submitted Items:</h3>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            {item.category}: {item.input}
                        </li>
                    ))}
                </ul>
            </div>

            <SausageSizzle items={items} />
        </div>
    );
}
