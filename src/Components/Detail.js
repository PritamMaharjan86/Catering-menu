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


    const formatPhoneNumber = (number) => {
        const cleaned = number.replace(/\D/g, '');
        const limitedDigits = cleaned.slice(0, 10);
        const formatted = limitedDigits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        return formatted;
    };

    const handleChange = (e, index = null, category = null) => {
        const { name, value } = e.target;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

        if (name === 'phNumber') {
            setInput((prevInput) => ({
                ...prevInput,
                [name]: formatPhoneNumber(value),
            }));
        } else if (index !== null && category !== null) {
            // Handle dynamic category inputs (like meats, salad, etc.)
            const newValues = [...input[category]];
            newValues[index] = capitalizedValue;

            setInput((prevInput) => ({
                ...prevInput,
                [category]: newValues,
            }));
        } else {
            // Handle regular inputs
            setInput((prevInput) => ({
                ...prevInput,
                [name]: capitalizedValue,
            }));
        }
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
                    </div>
                </div>

                <div className="row">
                    <h1>Catering Detail</h1>
                    <div className="column">
                        {/* Bread Selection */}
                        {input.bread.map((bread, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2">
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
                                        className="bg-red-300 p-2 rounded-md"
                                        onClick={() => removeOption(index, 'bread')}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-green-300 w-max p-2 rounded-md "
                                onClick={() => addOption('bread')}
                            >
                                Add Bread
                            </button>
                        </div>


                        {/* Pumpkin Selection */}
                        {input.pumpkin.map((pumpkin, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2">
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
                                        className="bg-red-300 p-2 rounded-md"
                                        onClick={() => removeOption(index, 'pumpkin')}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-green-300 w-max p-2 rounded-md"
                                onClick={() => addOption('pumpkin')}
                            >
                                Add Pumpkin
                            </button>
                        </div>


                        {/* Sidings Selection */}
                        {input.sidings.map((siding, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2">
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
                                        className="bg-red-300 p-2 rounded-md"
                                        onClick={() => removeOption(index, 'sidings')}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-green-300 w-max p-2 rounded-md"
                                onClick={() => addOption('sidings')}
                            >
                                Add Sidings
                            </button>
                        </div>

                        {/* Meats Selection */}
                        {input.meats.map((meat, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2">
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
                                        className="bg-red-300 p-2 rounded-md"
                                        onClick={() => removeOption(index, 'meats')}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-green-300 w-max p-2 rounded-md"
                                onClick={() => addOption('meats')}
                            >
                                Add Meat
                            </button>
                        </div>


                        {/* Salad Selection */}
                        {input.salad.map((salad, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2">
                                <select
                                    onChange={(e) => handleChange(e, index, 'salad')}
                                    value={salad}
                                    className="flex-grow p-2 border rounded-md"
                                >
                                    <option value="">Select Salad Type</option>
                                    <option value="Greek Salad">Greek Salad</option>
                                    <option value="Caesar Salad">Caesar Salad</option>
                                    <option value="Garden Salad">Garden Salad</option>
                                    <option value="Potato Salad">Potato Salad</option>
                                    <option value="Pasta Salad">Pasta Salad</option>
                                    <option value="Coleslaw">Coleslaw</option>
                                    <option value="Fruit Salad">Fruit Salad</option>
                                </select>
                                {index > 0 && (
                                    <button
                                        className="bg-red-300 p-2 rounded-md"
                                        onClick={() => removeOption(index, 'salad')}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-green-300 w-max p-2 rounded-md"
                                onClick={() => addOption('salad')}
                            >
                                Add Salad
                            </button>
                        </div>

                        {/* Appetiser Selection */}
                        {input.appetiser.map((appetiser, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2">
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
                                        className="bg-red-300 p-2 rounded-md"
                                        onClick={() => removeOption(index, 'appetiser')}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-green-300 w-max p-2 rounded-md "
                                onClick={() => addOption('appetiser')}
                            >
                                Add Appetiser
                            </button>
                        </div>


                        {/* Freebies Selection */}
                        {input.freebies.map((freebie, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2">
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
                                        className="bg-red-300 p-2 rounded-md"
                                        onClick={() => removeOption(index, 'freebies')}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-green-300 p-2 rounded-md"
                                onClick={() => addOption('freebies')}
                            >
                                Add Freebie
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <button className='download' onClick={handleSave}>Download</button>
            <button className='btn-secondary' onClick={handleQuote}>Create Quote</button>

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
