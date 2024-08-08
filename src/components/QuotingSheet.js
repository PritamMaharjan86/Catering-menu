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
                    category: "Name"
                };
                break;
            case "number":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "Number"
                };
                break;
            case "email":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "Email"
                };
                break;
            case "date":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "Date"
                };
                break;
            case "time":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "Time"
                };
                break;
            case "address":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "Address"
                };
                break;
            case "noofpeople":
                newItem = {
                    inputType: inputType,
                    input: inputValue,
                    category: "No. of people"
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
                <p style={{ color: 'green', fontWeight: 'bold' }}>CUSTOMER DETAIL</p>

                {items
                    .filter(item => item.category === 'Name' || item.category === 'Number' || item.category === "Email")
                    .map((item, index) => (
                        <p key={index} style={{ alignContent: 'left' }}>
                            {item.category}: {item.input}
                        </p>
                    ))}

                <p style={{ color: 'green', fontWeight: 'bold' }}>FUNCTION DETAIL</p>

                {items
                    .filter(item => item.category === 'Date' || item.category === 'Time' || item.category === "No. of people" || item.category === "Address")
                    .map((item, index) => (
                        <p key={index} style={{ alignContent: 'left' }}>
                            {item.category}: {item.input}
                        </p>
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
