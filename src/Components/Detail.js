import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../Detail.css';
import SausageSizzle from './SausageSizzle';
import MeatOnly from './MeatOnly';

export default function Detail() {

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    };

    const [input, setInput] = useState({
        // Customer detail
        name: '',
        phNumber: '',
        email: '',
        inquiryForm: '',
        guestNo: '',
        contactDate: getTodayDate(),

        // Function detail
        functionDate: '',
        occasion: '',
        menu: '',
        reference: '',

        // Catering detail
        bread: [''],
        pumpkin: [''],
        sidings: [''],
        meats: [''],
        salad: [''],
        appetiser: [''],
        freebies: [''],

        // Particulars
        cost: '',
        textValue: '',
    });

    const [sausageSizzle, setSausageSizzle] = useState(false);
    const [meatonly, setMeatonly] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);


    const formatPhoneNumber = (number) => {
        const cleaned = number.replace(/\D/g, '');
        const limitedDigits = cleaned.slice(0, 10);
        const formatted = limitedDigits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        return formatted;
    };

    const validateForm = (updatedInput) => {
        const { phNumber, meats, bread, pumpkin, sidings, salad, appetiser } = updatedInput;


        const allFieldsFilled = phNumber &&
            meats.every((item) => item.trim() !== '') &&
            bread.every((item) => item.trim() !== '') &&
            pumpkin.every((item) => item.trim() !== '') &&
            salad.every((item) => item.trim() !== '') &&
            appetiser.every((item) => item.trim() !== '') &&
            sidings.every((item) => item.trim() !== '');

        setIsFormValid(allFieldsFilled);
    };

    const handleChange = (e, index = null, category = null) => {
        const { name, value } = e.target;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

        let updatedInput;

        if (name === 'phNumber') {
            updatedInput = {
                ...input,
                [name]: formatPhoneNumber(value),
            };
        } else if (index !== null && category !== null) {
            const newValues = [...input[category]];
            newValues[index] = capitalizedValue;

            updatedInput = {
                ...input,
                [category]: newValues,
            };
        } else {
            updatedInput = {
                ...input,
                [name]: capitalizedValue,
            };
        }

        setInput(updatedInput);
        validateForm(updatedInput);
    };


    const addOption = (category) => {
        setInput((prevInput) => ({
            ...prevInput,
            [category]: [...prevInput[category], ''],
        }));
    };

    const removeOption = (index, category) => {
        const newValues = input[category].filter((_, i) => i !== index);
        setInput({
            ...input,
            [category]: newValues,
        });
    };

    const handleSave = () => {
        const data = [
            ['Field', 'Value'],
            ...Object.entries(input)
        ];

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'FormDetails.xlsx');
    };

    const handleQuote = () => {
        if (input.menu === 'BBHSausageSizzle') {
            setSausageSizzle(true);
            setMeatonly(false);
        } else if (input.menu === 'BBHMeatOnly') {
            setSausageSizzle(false);
            setMeatonly(true);
        } else {
            setSausageSizzle(false);
            setMeatonly(false);
        }
    };

    return (
        <>
            <div className="form-container">
                <div className="row">
                    <h1>Customer Detail</h1>
                    <div className="column">
                        <input
                            onChange={handleChange}
                            value={input.contactDate}
                            name="contactDate"
                            type="date"
                            placeholder="Enter Contact Date"
                        />
                        <input
                            onChange={handleChange}
                            value={input.name}
                            name="name"
                            type="text"
                            placeholder="Enter User Name"
                        />
                        <input
                            onChange={handleChange}
                            value={input.phNumber}
                            name="phNumber"
                            type="tel"
                            placeholder="Enter User Phone Number"
                            pattern="^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$"
                            title="Phone number should be in the format: +61 4xx xxx xxx or 04xx xxx xxx"
                            required
                        />

                        <input
                            onChange={handleChange}
                            value={input.email}
                            name="email"
                            type="email"
                            placeholder="Enter User Email"
                        />
                        <select
                            onChange={handleChange}
                            value={input.inquiryForm}
                            name="inquiryForm"
                        >
                            <option value="">How did customer contact you?</option>
                            <option value="Phone">Phone</option>
                            <option value="Website">Website</option>
                            <option value="Email">Email</option>
                        </select>
                        <input
                            onChange={handleChange}
                            value={input.guestNo}
                            name="guestNo"
                            type="number"
                            placeholder="Enter Number of Guests"
                        />
                    </div>
                </div>

                <div className="row">
                    <h1>Function Detail</h1>
                    <div className="column">
                        <input
                            onChange={handleChange}
                            value={input.functionDate}
                            name="functionDate"
                            type="date"
                            placeholder="Enter Function Date"
                        />
                        <select
                            onChange={handleChange}
                            value={input.menu}
                            name="menu"
                        >
                            <option value="">Select Menu Type</option>
                            <option value="BBHSausageSizzle">BBH Sausage Sizzle</option>
                            <option value="BBHMeatOnly">BBH Meat Only</option>
                            <option value="BBH2Course">BBH 2 Course</option>
                            <option value="BBH3Course">BBH 3 Course</option>
                        </select>
                        <input
                            onChange={handleChange}
                            value={input.occasion}
                            name="occasion"
                            type="text"
                            placeholder="Occasion"
                        />
                        <input
                            onChange={handleChange}
                            value={input.reference}
                            name="reference"
                            type="text"
                            placeholder="How did customer find you?"
                        />
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>$</span>
                            <input
                                onChange={handleChange}
                                value={input.cost}
                                name="cost"
                                type="number"
                                placeholder="  Enter cost"
                                style={{ paddingLeft: '20px' }} // Adjust padding to make room for the dollar sign
                            />
                        </div>

                    </div>
                </div>

                <div className="row">
                    <h1>Catering Detail</h1>
                    <div className="column">
                        {/* Bread Selection */}
                        {input.bread.map((bread, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <select
                                    onChange={(e) => handleChange(e, index, 'bread')}
                                    value={bread}
                                    className="flex-grow"
                                >
                                    <option value="">Select Bread Type</option>
                                    <option value="Dinner roll">Dinner roll</option>
                                    <option value="Damper roll">Damper roll</option>
                                    <option value="Garlic bread">Garlic bread</option>
                                    <option value="Hotdog roll">Hotdog roll</option>
                                    <option value="Burger buns">Burger buns</option>
                                    <option value="Pita bread">Pita bread</option>
                                    <option value="Sliced bread">Sliced bread</option>
                                </select>

                                {index > 0 && (
                                    <button
                                        className="flex items-center justify-center text-red-500 font-bold text-3xl"
                                        onClick={() => removeOption(index, 'bread')}
                                    >
                                        -
                                    </button>
                                )}

                                {index === input.bread.length - 1 && (
                                    <button
                                        className="flex items-center justify-center text-green-500 font-bold text-3xl"
                                        onClick={() => addOption('bread')}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        ))}




                        {/* Pumpkin Selection */}
                        {input.pumpkin.map((pumpkin, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <select
                                    onChange={(e) => handleChange(e, index, 'pumpkin')}
                                    value={pumpkin}
                                    className="flex-grow p-2 border rounded-md"
                                >
                                    <option value="">Select Pumpkin Size</option>
                                    <option value="1 Pumpkin Large">1 Pumpkin large</option>
                                    <option value="2 Pumpkin Large">2 Pumpkin large</option>
                                    <option value="3 Pumpkin Large">3 Pumpkin large</option>
                                    <option value="4 Pumpkin Large">4 Pumpkin large</option>
                                    <option value="1 Pumpkin Medium">1 Pumpkin medium</option>
                                    <option value="2 Pumpkin Medium">2 Pumpkin medium</option>
                                    <option value="3 Pumpkin Medium">3 Pumpkin medium</option>
                                </select>

                                {index > 0 && (
                                    <button
                                        className="flex items-center justify-center text-red-500 font-bold text-3xl"
                                        onClick={() => removeOption(index, 'pumpkin')}
                                    >
                                        -
                                    </button>
                                )}

                                {index === input.pumpkin.length - 1 && (
                                    <button
                                        className="flex items-center justify-center text-green-500 font-bold text-3xl"
                                        onClick={() => addOption('pumpkin')}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        ))}



                        {/* Sidings Selection */}
                        {input.sidings.map((siding, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <select
                                    onChange={(e) => handleChange(e, index, 'sidings')}
                                    value={siding}
                                    className="flex-grow p-2 border rounded-md"
                                >
                                    <option value="">Select Sidings</option>
                                    <option value="Mashed Potatoes">Mashed Potatoes</option>
                                    <option value="Steamed Veggies">Steamed Veggies</option>
                                    <option value="Grilled Corn">Grilled Corn</option>
                                    <option value="Jacket Potatoes">Jacket Potatoes</option>
                                    <option value="Sliced Onion">Sliced Onion</option>
                                    <option value="Sig Warm Potatoes">Sig Warm Potatoes</option>
                                    <option value="BBQ Baked Potatoes">BBQ Baked Potatoes</option>
                                    <option value="Pea / Carrot / Corn">Pea/Carrot/Corn</option>
                                    <option value="Steamed Potatoes">Steamed Potatoes</option>
                                </select>

                                {index > 0 && (
                                    <button
                                        className="flex items-center justify-center text-red-500 font-bold text-3xl"
                                        onClick={() => removeOption(index, 'sidings')}
                                    >
                                        -
                                    </button>
                                )}

                                {index === input.sidings.length - 1 && (
                                    <button
                                        className="flex items-center justify-center text-green-500 font-bold text-3xl"
                                        onClick={() => addOption('sidings')}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        ))}




                        {/* Meats Selection */}
                        {input.meats.map((meat, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <select
                                    onChange={(e) => handleChange(e, index, 'meats')}
                                    value={meat}
                                    className="flex-grow p-2 border rounded-md"
                                >
                                    <option value="">Select Meat Type</option>
                                    <option value="Beef Steak">Beef Steak</option>
                                    <option value="Lamb Chops">Lamb Chops</option>
                                    <option value="Chicken Thigh">Chicken Thigh</option>
                                    <option value="Pork Sausages">Pork Sausages</option>
                                    <option value="Beef Sausages">Beef Sausages</option>
                                    <option value="BBQ Ribs">BBQ Ribs</option>
                                    <option value="Chicken Wings">Chicken Wings</option>
                                    <option value="Lamb Ribs">Lamb Ribs</option>
                                </select>

                                {index > 0 && (
                                    <button
                                        className="flex items-center justify-center text-red-500 font-bold text-3xl"
                                        onClick={() => removeOption(index, 'meats')}
                                    >
                                        -
                                    </button>
                                )}

                                {index === input.meats.length - 1 && (
                                    <button
                                        className="flex items-center justify-center text-green-500 font-bold text-3xl"
                                        onClick={() => addOption('meats')}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        ))}



                        {/* Salad Selection */}
                        {input.salad.map((salad, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <input
                                    onChange={(e) => handleChange(e, index, 'salad')}
                                    value={salad}
                                    name={`salad-${index}`}
                                    className="flex-grow p-2 border rounded-md"
                                    placeholder="Enter Salad Type"
                                />

                                {index > 0 && (
                                    <button
                                        className="flex items-center justify-center text-red-500 font-bold text-3xl"
                                        onClick={() => removeOption(index, 'salad')}
                                    >
                                        -
                                    </button>
                                )}

                                {index === input.salad.length - 1 && (
                                    <button
                                        className="flex items-center justify-center text-green-500 font-bold text-3xl"
                                        onClick={() => addOption('salad')}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        ))}


                        {/* Appetiser Selection */}
                        {input.appetiser.map((appetiser, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <select
                                    onChange={(e) => handleChange(e, index, 'appetiser')}
                                    value={appetiser}
                                    className="flex-grow p-2 border rounded-md"
                                >
                                    <option value="">Select Appetiser Type</option>
                                    <option value="Cheese Platter">Cheese Platter</option>
                                    <option value="Vegetable Platter">Vegetable Platter</option>
                                    <option value="Fruit Platter">Fruit Platter</option>
                                    <option value="Breadsticks">Breadsticks</option>
                                    <option value="Bruschetta">Bruschetta</option>
                                    <option value="Mini Quiches">Mini Quiches</option>
                                    <option value="Spring Rolls">Spring Rolls</option>
                                    <option value="Stuffed Mushrooms">Stuffed Mushrooms</option>
                                </select>

                                {index > 0 && (
                                    <button
                                        className="flex items-center justify-center text-red-500 font-bold text-3xl"
                                        onClick={() => removeOption(index, 'appetiser')}
                                    >
                                        -
                                    </button>
                                )}

                                {index === input.appetiser.length - 1 && (
                                    <button
                                        className="flex items-center justify-center text-green-500 font-bold text-3xl"
                                        onClick={() => addOption('appetiser')}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        ))}



                        {/* Freebies Selection */}
                        {input.freebies.map((freebie, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <select
                                    onChange={(e) => handleChange(e, index, 'freebies')}
                                    value={freebie}
                                    className="flex-grow p-2 border rounded-md"
                                >
                                    <option value="">Select Freebies</option>
                                    <option value="Water">Water</option>
                                    <option value="Soft Drinks">Soft Drinks</option>
                                    <option value="Napkins">Napkins</option>
                                    <option value="Plastic Cutlery">Plastic Cutlery</option>
                                    <option value="Sauces">Sauces</option>
                                    <option value="Condiments">Condiments</option>
                                </select>

                                {index > 0 && (
                                    <button
                                        className="flex items-center justify-center text-red-500 font-bold text-3xl"
                                        onClick={() => removeOption(index, 'freebies')}
                                    >
                                        -
                                    </button>
                                )}

                                {index === input.freebies.length - 1 && (
                                    <button
                                        className="flex items-center justify-center text-green-500 font-bold text-3xl"
                                        onClick={() => addOption('freebies')}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        ))}


                    </div>
                    <div className='row'>
                        <h1>Additional Notes</h1>
                        <textarea
                            value={input.textValue}
                            name='textValue'
                            onChange={handleChange}
                            placeholder="Enter your text here"
                            rows="4"
                            cols="50"
                        />
                    </div>
                </div>
            </div>

            <button className='border-2 rounded-md p-2 mt-5 bg-green-300 mx-auto block' onClick={handleSave} disabled={!isFormValid}>Download</button>
            <button className='border-2 rounded-md p-2 mt-5 bg-blue-300 mx-auto block mb-10' onClick={handleQuote} disabled={!isFormValid}>Create Quote</button>

            {sausageSizzle && (
                <SausageSizzle
                    name={input.name}
                    bread={input.bread}
                    pumpkin={input.pumpkin}
                    meats={input.meats}
                    sidings={input.sidings}
                    appetiser={input.appetiser}
                    salad={input.salad}
                    freebies={input.freebies}
                    cost={input.cost}
                    functionDate={input.functionDate}
                    number={input.guestNo}
                    textValue={input.textValue}
                />
            )}

            {meatonly && (
                <MeatOnly
                    name={input.name}
                    bread={input.bread}
                    pumpkin={input.pumpkin}
                    meats={input.meats}
                    sidings={input.sidings}
                    appetiser={input.appetiser}
                    salad={input.salad}
                    freebies={input.freebies}
                    cost={input.cost}
                    functionDate={input.functionDate}
                    number={input.guestNo}
                    textValue={input.textValue}
                />
            )}
        </>
    );
}
