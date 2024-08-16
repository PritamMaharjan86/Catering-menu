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
        cost: '',
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
                            type="tel"  // Correct type for phone numbers
                            placeholder="Enter User Phone Number"
                            pattern="[0-9]{10}"  // Example pattern for 10-digit phone numbers
                            title="Phone number should be 10 digits without spaces or special characters."
                        />

                        <input
                            onChange={handleChange}
                            value={input.email}
                            name="email"
                            type="email"
                            placeholder="Enter User Email"
                        />
                        <input
                            onChange={handleChange}
                            value={input.inquiryForm}
                            name="inquiryForm"
                            type="text"
                            placeholder="Inquiry Source/Form"
                        />
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
                            placeholder="How customer contact you?"
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
                            <option value="Dinner roll">Dinner roll</option>
                            <option value="Damper roll">Damper roll</option>
                            <option value="Garlic bread">Garlic bread</option>
                            <option value="Hotdog roll">Hotdog roll</option>
                            <option value="Burger buns">Burger buns</option>
                            <option value="Pita bread">Pita bread</option>
                            <option value="Sliced bread">Sliced bread</option>
                        </select>

                        <select
                            onChange={handleChange}
                            value={input.pumpkin}
                            name="pumpkin"
                        >
                            <option value="">Select Pumpkin Size</option>
                            <option value="1 Pumpkin large">1 Pumpkin large</option>
                            <option value="2 Pumpkin large">2 Pumpkin large</option>
                            <option value="3 Pumpkin large">3 Pumpkin large</option>
                            <option value="4 Pumpkin large">4 Pumpkin large</option>
                            <option value="1 Pumpkin medium">1 Pumpkin medium</option>
                            <option value="2 Pumpkin medium">2 Pumpkin medium</option>
                            <option value="3 Pumpkin medium">3 Pumpkin medium</option>

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
                            <option value="jacketPotatoes">Jacket Potatoes</option>
                            <option value="slicedOnion">Sliced Onion</option>
                            <option value="sigwarmpotato">Sig Warm Potatoes</option>
                            <option value="bbqbakedpotatoes">BBQ Baked Potatoes</option>
                            <option value="pea">Pea/Carrot/Corn</option>
                            <option value="steamedpotato">Steamed Potatoes</option>
                        </select>

                        <select
                            onChange={handleChange}
                            value={input.meats}
                            name="meats"
                        >
                            <option value="">Select Meat</option>
                            <option value="chicken">Whole Chicken</option>
                            <option value="beef">Beef Rump</option>
                            <option value="lamb">Whole Lamb</option>
                            <option value="bonelessPork">Boneless Pork Leg Roll</option>
                            <option value="porketta">Porketta</option>
                            <option value="wholePig">Whole Pig</option>
                            <option value="aussieSausage">Aussie Sausage</option>
                            <option value="tenderloin">Chicken Tenderloin</option>
                            <option value="vegSausage">Vegetarian Sausage</option>
                            <option value="hamburger">Hamburger Pattie</option>
                            <option value="veggie">Veggie Sausage</option>
                            <option value="minuteSteak">Minute Steak</option>
                            <option value="wings">Chicken Wings</option>
                            <option value="kebab">Chicken Kebab</option>
                            <option value="pattie">Chicken Pattie</option>
                            <option value="vegPattie">Veggie Pattie</option>
                        </select>

                        <select
                            onChange={handleChange}
                            value={input.appetiser}
                            name="appetiser"
                        >
                            <option value="">Select Appetiser</option>
                            <option value="caba">Caba, Cheese, Crackers</option>
                            <option value="burrito">Burrito Melts</option>
                            <option value="proscuito">Prosciuto and Asparagus</option>
                        </select>

                        <input
                            onChange={handleChange}
                            value={input.salad}
                            name="salad"
                            type="text"
                            placeholder="Salad"
                        />

                        <select
                            onChange={handleChange}
                            value={input.freebies}
                            name="freebies"
                        >
                            <option value="">Select Frebbies</option>
                            <option value="assortedDrinks">Assorted Drinks</option>
                            <option value="teaCoffee">Tea / Coffee</option>
                            <option value="gravy">Gravy</option>
                            <option value="petit">Petit Cake</option>
                            <option value="extraSalad">Extra Salad</option>

                        </select>
                        <input
                            onChange={handleChange}
                            value={input.cost}
                            name="cost"
                            type="number"
                            placeholder="Enter $ cost"
                        />

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

        </>
    );
}
