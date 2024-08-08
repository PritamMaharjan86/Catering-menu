import React, { useState } from 'react';
import SausageSizzle from './Menu/SausageSizzle';
import Input from './Input';
import Button from './Button';

export default function QuotingSheet() {
    const [inputType, setInputType] = useState('text');
    const [inputValue, setInputValue] = useState('');
    const [option, setOption] = useState('');
    const [items, setItems] = useState([]);
    const [showQuote, setShowQuote] = useState(false);


    const handleTypeChange = (e) => {
        setInputType(e.target.value);
        setInputValue('');
    };

    const handleValueChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
        if (option === 'SausageSizzle') {
            setShowQuote(true);
        }
    };

    const handleOption = (e) => {
        setOption(e.target.value);
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
            case "cost":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "cost"
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
            <Input
                handleTypeChange={handleTypeChange}
                handleSubmit={handleSubmit}
                handleValueChange={handleValueChange}
                inputType={inputType}
                inputValue={inputValue}

            />

            <div>
                <h3>Submitted Items:</h3>

                {items.map((item, index) => (
                    <li key={index}>
                        {item.category}: {item.input}
                    </li>
                ))}

            </div>

            <Button
                SausageSizzle={SausageSizzle}
                showQuote={showQuote}
                handleButtonClick={handleButtonClick}
                handleOption={handleOption}
                items={items}
                option={option}


            />

        </div>
    );
}
