import React, { useState } from 'react';
import Select from 'react-select';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


export default function Input() {

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
        ],
    }; const [customerDetails, setCustomerDetails] = useState({
        name: '',
        number: '',
        email: '',
        address: '',
        suburb: '',
        postcode: '',
        inquirySource: '',
        howFound: '',
        occasion: '',
    });

    const [functionDetails, setFunctionDetails] = useState({
        date: '',
        time: '',
        guests: '',
        menu: [],
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

    const [filename, setFilename] = useState('QuotingSheet');
    const [errors, setErrors] = useState({});

    const handleCustomerChange = (category, value) => {
        const newDetails = { ...customerDetails, [category]: value };
        setCustomerDetails(newDetails);
        validateCustomerDetails(category, value);
    };

    const validateCustomerDetails = (category, value) => {
        let error = '';

        if (category === 'name') {
            if (!/^[a-zA-Z\s]+$/.test(value)) {
                error = 'Name should contain only letters and spaces.';
            }
        }

        if (category === 'number') {
            if (!/^\d{10}$/.test(value)) {
                error = 'Number should be a 10-digit number.';
            }
        }

        if (category === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = 'Invalid email format.';
            }
        }

        setErrors(prevErrors => ({ ...prevErrors, [category]: error }));
    };

    const handleFunctionChange = (key, value) => {
        setFunctionDetails(prev => ({ ...prev, [key]: value }));
    };

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
        ];

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'QuotingSheet');

        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${filename}.xlsx`);
    };

    const inputStyle = {
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        marginBottom: '8px',
        width: '100%',
    };

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '20px',
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Quoting Sheet</h1>

            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Filename</h4>
            <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                style={inputStyle}
                placeholder="Enter filename"
            />

            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Customer Detail</h4>
            <div style={gridContainerStyle}>
                {Object.keys(customerDetails).map(category => (
                    <div key={category} style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '4px' }}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
                        <input
                            type={category === 'email' ? 'email' : 'text'}
                            value={customerDetails[category]}
                            onChange={(e) => handleCustomerChange(category, e.target.value)}
                            style={inputStyle}
                            placeholder={`Enter ${category}`}
                        />
                        {errors[category] && <p style={{ color: 'red', marginTop: '4px' }}>{errors[category]}</p>}
                    </div>
                ))}
            </div>

            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Function Detail</h4>
            <div style={gridContainerStyle}>
                {Object.keys(functionDetails).map(key => (
                    <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '4px' }}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        {key === 'menu' ? (
                            <Select
                                isMulti
                                options={Object.keys(options).map(opt => ({
                                    value: opt,
                                    label: opt.charAt(0).toUpperCase() + opt.slice(1),
                                }))}
                                value={functionDetails[key].map(value => ({ value, label: value.charAt(0).toUpperCase() + value.slice(1) }))}
                                onChange={(selectedOptions) => handleFunctionChange(key, selectedOptions ? selectedOptions.map(option => option.value) : [])}
                                styles={{
                                    container: (provided) => ({
                                        ...provided,
                                        marginBottom: '16px'
                                    }),
                                    control: (provided) => ({
                                        ...provided,
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        boxShadow: 'none',
                                        minHeight: '38px',
                                    }),
                                }}
                            />
                        ) : (
                            <input
                                type={key === 'date' ? 'date' : key === 'time' ? 'time' : 'text'}
                                value={functionDetails[key]}
                                onChange={(e) => handleFunctionChange(key, e.target.value)}
                                style={inputStyle}
                                placeholder={`Enter ${key}`}
                            />
                        )}
                    </div>
                ))}
            </div>

            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Catering Detail</h4>
            <div style={gridContainerStyle}>
                {Object.keys(options).map(category => (
                    <div key={category} style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '4px' }}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
                        <Select
                            isMulti
                            options={options[category]}
                            value={options[category].filter(option => cateringDetails[category].includes(option.value))}
                            onChange={(selectedOptions) => handleSelectChange(category, selectedOptions)}
                            styles={{
                                container: (provided) => ({
                                    ...provided,
                                    marginBottom: '16px'
                                }),
                                control: (provided) => ({
                                    ...provided,
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    boxShadow: 'none',
                                    minHeight: '38px',
                                }),
                            }}
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={generateExcelDocument}
                style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                }}

            >
                Download Excel
            </button>


        </div>
    );
}
