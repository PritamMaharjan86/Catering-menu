import React, { useState } from 'react';
import Select from 'react-select';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const options = {
    bread: [
        { value: 'Dinner Roll', label: 'Dinner Roll' },
        { value: 'Ciabatta', label: 'Ciabatta' },
        { value: 'Sourdough', label: 'Sourdough' },
    ],
    pumpkin: [
        { value: '1 Small Pumpkin', label: '1 Small Pumpkin' },
        { value: '1 Medium Pumpkin', label: '1 Medium Pumpkin' },
        { value: '1 Large Pumpkin', label: '1 Large Pumpkin' },
    ],
    meats: [
        { value: 'Whole Lamb', label: 'Whole Lamb' },
        { value: 'Beef Brisket', label: 'Beef Brisket' },
        { value: 'Chicken', label: 'Chicken' },
    ],
    sidings: [
        { value: 'Grilled Potato', label: 'Grilled Potato' },
        { value: 'Rice Salad', label: 'Rice Salad' },
        { value: 'Garlic Bread', label: 'Garlic Bread' },
    ],
    salad: [
        { value: 'Caesar Salad', label: 'Caesar Salad' },
        { value: 'Greek Salad', label: 'Greek Salad' },
        { value: 'Coleslaw', label: 'Coleslaw' },
    ],
    appetiser: [
        { value: 'Bruschetta', label: 'Bruschetta' },
        { value: 'Stuffed Mushrooms', label: 'Stuffed Mushrooms' },
        { value: 'Caba', label: 'Caba' },
    ],
    dessert: [
        { value: 'Cheesecake', label: 'Cheesecake' },
        { value: 'Brownies', label: 'Brownies' },
        { value: 'Fruit Tart', label: 'Fruit Tart' },
    ],
    teaCoffee: [
        { value: 'Black Tea', label: 'Black Tea' },
        { value: 'Green Tea', label: 'Green Tea' },
        { value: 'Coffee', label: 'Coffee' },
        { value: 'Caba', label: 'Caba' },
    ],
};

export default function Quoting() {
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        number: '',
        email: '',
        address: '',
        suburb: '',
        postcode: '',
    });

    const [functionDetails, setFunctionDetails] = useState({
        date: '',
        time: '',
        guests: '',
        menu: '',
        deliveryPickupTime: '',
        diyHire: '',
    });

    const [cateringDetails, setCateringDetails] = useState({
        bread: [],
        pumpkin: [],
        meats: [],
        sidings: [],
        salad: [],
        appetiser: [],
        dessert: [],
        teaCoffee: [],
    });

    const [cutleryExtras, setCutleryExtras] = useState({
        fork: '',
        knife: '',
        spoon: '',
        dinnerPlate: '',
        dessertPlate: '',
        freebies: '',
    });

    const [filename, setFilename] = useState('QuotingSheet');

    const handleSelectChange = (category, selectedOptions) => {
        setCateringDetails(prev => ({
            ...prev,
            [category]: selectedOptions.map(option => option.value),
        }));
    };

    const generateExcelDocument = () => {
        const wsData = [
            ['Category', 'Detail'],
            ['Customer Detail', ''],
            ...Object.keys(customerDetails).map(key => [key.charAt(0).toUpperCase() + key.slice(1), customerDetails[key]]),
            ['Function Detail', ''],
            ...Object.keys(functionDetails).map(key => [key.charAt(0).toUpperCase() + key.slice(1), functionDetails[key]]),
            ['Catering Detail', ''],
            ...Object.keys(cateringDetails).map(category => [
                category.charAt(0).toUpperCase() + category.slice(1),
                cateringDetails[category].join(', '),
            ]),
            ['Cutlery / Extras', ''],
            ...Object.keys(cutleryExtras).map(key => [key.charAt(0).toUpperCase() + key.slice(1), cutleryExtras[key]]),
        ];

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'QuotingSheet');

        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${filename}.xlsx`);
    };

    const inputStyle = {
        border: 'none',
        borderBottom: '2px solid yellow', // Highlight only the text width
        background: 'transparent',
        padding: '3px',
        borderRadius: '0px',
        outline: 'none',
    };

    return (
        <div>
            <h1 className='title'>Quoting Sheet</h1>

            <h4>Filename</h4>
            <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                style={inputStyle}
                placeholder="Enter filename"
            />

            <h4>Customer Detail</h4>
            <div className="row">
                {Object.keys(customerDetails).map(key => (
                    <div className="column" key={key}>
                        {`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                        <input
                            type={key === 'email' ? 'email' : 'text'}
                            value={customerDetails[key]}
                            onChange={(e) => setCustomerDetails(prev => ({ ...prev, [key]: e.target.value }))}
                            style={inputStyle}
                        />
                    </div>
                ))}
            </div>

            <h4>Function Detail</h4>
            <div className="row">
                {Object.keys(functionDetails).map(key => (
                    <div className="column" key={key}>
                        {`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                        <input
                            type={key === 'date' ? 'date' : key === 'time' ? 'time' : 'text'}
                            value={functionDetails[key]}
                            onChange={(e) => setFunctionDetails(prev => ({ ...prev, [key]: e.target.value }))}
                            style={inputStyle}
                        />
                    </div>
                ))}
            </div>

            <h4>Catering Detail</h4>
            {Object.keys(options).map(category => (
                <div key={category}>
                    <h5>{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                    <Select
                        isMulti
                        options={options[category]}
                        value={options[category].filter(option => cateringDetails[category].includes(option.value))}
                        onChange={(selectedOptions) => handleSelectChange(category, selectedOptions)}
                    />
                </div>
            ))}

            <h4>Cutlery / Extras</h4>
            <div className="row">
                {Object.keys(cutleryExtras).map(key => (
                    <div className="column" key={key}>
                        {`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                        <input
                            type='text'
                            value={cutleryExtras[key]}
                            onChange={(e) => setCutleryExtras(prev => ({ ...prev, [key]: e.target.value }))}
                            style={inputStyle}
                        />
                    </div>
                ))}
            </div>

            <button onClick={generateExcelDocument}>Download Excel</button>
        </div>
    );
}
