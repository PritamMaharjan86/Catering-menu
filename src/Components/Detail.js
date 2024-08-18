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
        contactDate:  getTodayDate(),

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

        // Particulars
        cost: '',
        textValue: '',
    });

    const [sausageSizzle, setSausageSizzle] = useState(false);
    const [meatonly, setMeatonly] = useState(false);

   
    const handleChange = (e) => {
        const { name, value } = e.target;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

        setInput({
            ...input,
            [name]: capitalizedValue,
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
                            <option value="1 Pumpkin Large">1 Pumpkin large</option>
                            <option value="2 Pumpkin Large">2 Pumpkin large</option>
                            <option value="3 Pumpkin Large">3 Pumpkin large</option>
                            <option value="4 Pumpkin Large">4 Pumpkin large</option>
                            <option value="1 Pumpkin Medium">1 Pumpkin medium</option>
                            <option value="2 Pumpkin Medium">2 Pumpkin medium</option>
                            <option value="3 Pumpkin Medium">3 Pumpkin medium</option>
                        </select>

                        <select
                            onChange={handleChange}
                            value={input.sidings}
                            name="sidings"
                        >
                            <option value="">Select Sidings</option>
                            <option value="Mashed Potatoes">Mashed Potatoes</option>
                            <option value="Steamed Veggies">Steamed Veggies</option>
                            <option value="Grilled Corn">Grilled Corn</option>
                            <option value="Jacket Potatoes">Jacket Potatoes</option>
                            <option value="Sliced Onion">Sliced Onion</option>
                            <option value="Sigwarm Potatoes">Sig Warm Potatoes</option>
                            <option value="BBQ Baked Potatoes">BBQ Baked Potatoes</option>
                            <option value="Pea / Carrot / Corn">Pea/Carrot/Corn</option>
                            <option value="Steamed Potatoes">Steamed Potatoes</option>
                        </select>

                        <select
                            onChange={handleChange}
                            value={input.meats}
                            name="meats"
                        >
                            <option value="">Select Meat</option>
                            <option value="Whole Chicken">Whole Chicken</option>
                            <option value="Beef Rump">Beef Rump</option>
                            <option value="Whole Lamb">Whole Lamb</option>
                            <option value="Boneless Pork Leg Roll">Boneless Pork Leg Roll</option>
                            <option value="Porketta">Porketta</option>
                            <option value="Whole Pig">Whole Pig</option>
                            <option value="Aussie Sausage">Aussie Sausage</option>
                            <option value="Chicken Tenderloin">Chicken Tenderloin</option>
                            <option value="Vegetarian Sausage">Vegetarian Sausage</option>
                            <option value="Hamburger Pattie">Hamburger Pattie</option>
                            <option value="Veggie Sausage">Veggie Sausage</option>
                            <option value="Minute Steak">Minute Steak</option>
                            <option value="Chicken Wings">Chicken Wings</option>
                            <option value="Chicken Kebab">Chicken Kebab</option>
                            <option value="Chicken Pattie">Chicken Pattie</option>
                            <option value="Veggie Pattie">Veggie Pattie</option>
                        </select>

                        <select
                            onChange={handleChange}
                            value={input.appetiser}
                            name="appetiser"
                        >
                            <option value="">Select Appetiser</option>
                            <option value="Caba, Cheese, Crackers">Caba, Cheese, Crackers</option>
                            <option value="Burrito Melts">Burrito Melts</option>
                            <option value="Proscuito and Asparagus">Prosciutto and Asparagus</option>
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
                            <option value="">Select Freebies</option>
                            <option value="Assorted Drinks">Assorted Drinks</option>
                            <option value="Tea Coffee">Tea / Coffee</option>
                            <option value="Gravy">Gravy</option>
                            <option value="Petit">Petit Cake</option>
                            <option value="Extra Salad">Extra Salad</option>
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
