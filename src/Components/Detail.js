import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../Detail.css';

export default function Detail() {
    const [input, setInput] = useState({
        // Customer detail
        name: '',
        phNumber: '',
        email: '',
        inquiryForm: '',
        guestNo: '',
        contactDate: '',

        // Function detail
        functionDate: '',
        occasion: '',
        menu: '',
        reference: '',

        // Catering detail
        bread: '',
        pumpkin: '',
        sidings: '',
        meats: '',
        salad: '',
        appetiser: '',
        freebies: '',

        //Particulars
        textValue: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    const handleSave = () => { // Convert input state to an array of arrays
        const data = [
            ['Field', 'Value'],
            ...Object.entries(input) // Convert object entries to array of arrays
        ];

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert the array of arrays to a worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(data);

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, 'FormDetails.xlsx');

    }

    const [dropdownVisible, setDropdownVisible] = useState(null);

    const handleDropdownToggle = (buttonType) => {
        setDropdownVisible(dropdownVisible === buttonType ? null : buttonType);
    };

    return (
        <>
            <div className="form-container">
                <div className="row">
                    <h1>Customer Detail</h1>
                    <div className="column">
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
                            type="number"
                            placeholder="Enter User Phone Number"
                        />
                        <input
                            onChange={handleChange}
                            value={input.email}
                            name="email"
                            type="email"
                            placeholder="Enter User Email"
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
                            type="text"
                            placeholder="Enter Function Date"
                        />
                        <input
                            onChange={handleChange}
                            value={input.menu}
                            name="menu"
                            type="text"
                            placeholder="Enter Menu"
                        />
                        <input
                            onChange={handleChange}
                            value={input.occasion}
                            name="occasion"
                            type="text"
                            placeholder="Enter Occasion"
                        />
                        <input
                            onChange={handleChange}
                            value={input.reference}
                            name="reference"
                            type="text"
                            placeholder="Enter Reference"
                        />
                    </div>
                </div>

                <div className="row">
                    <h1>Catering Detail</h1>
                    <div className="column">
                        <select
                            onChange={handleChange}
                            value={input.bread}
                            name="bread"
                        >
                            <option value="">Select Bread Type</option>
                            <option value="wholeWheat">Whole Wheat</option>
                            <option value="white">White Bread</option>
                            <option value="multigrain">Multigrain</option>
                        </select>

                        <select
                            onChange={handleChange}
                            value={input.pumpkin}
                            name="pumpkin"
                        >
                            <option value="">Select Pumpkin Dish</option>
                            <option value="pumpkinSoup">Pumpkin Soup</option>
                            <option value="roastedPumpkin">Roasted Pumpkin</option>
                            <option value="pumpkinPie">Pumpkin Pie</option>
                        </select>

                        <select
                            onChange={handleChange}
                            value={input.sidings}
                            name="sidings"
                        >
                            <option value="">Select Sidings</option>
                            <option value="mashedPotatoes">Mashed Potatoes</option>
                            <option value="steamedVeggies">Steamed Veggies</option>
                            <option value="grilledCorn">Grilled Corn</option>
                        </select>

                        <select
                            onChange={handleChange}
                            value={input.meats}
                            name="meats"
                        >
                            <option value="">Select Meat</option>
                            <option value="chicken">Chicken</option>
                            <option value="beef">Beef</option>
                            <option value="lamb">Lamb</option>
                        </select>
                    </div>
                </div>

                <div className='row'>

                    <h1>Particulars</h1>
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
            <button className='btn-primary' onClick={handleSave}>Download</button>
            <div className="dropdown-container">
                <button
                    className='btn-secondary'
                    onClick={() => handleDropdownToggle('quote')}
                >
                    Create Quote
                </button>
                {dropdownVisible === 'quote' && (
                    <div className="dropdown-menu">
                        <button onClick={handleSave}>Quote Option 1</button>
                        <button onClick={handleSave}>Quote Option 2</button>
                        <button onClick={handleSave}>Quote Option 3</button>
                    </div>
                )}
            </div>

            <div className="dropdown-container">
                <button
                    className='btn-danger'
                    onClick={() => handleDropdownToggle('book')}
                >
                    Book Now
                </button>
                {dropdownVisible === 'book' && (
                    <div className="dropdown-menu">
                        <button onClick={handleSave}>Book Option 1</button>
                        <button onClick={handleSave}>Book Option 2</button>
                        <button onClick={handleSave}>Book Option 3</button>
                    </div>
                )}
            </div>
        </>
    );
}
