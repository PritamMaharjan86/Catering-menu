import React, { useState } from 'react';

export default function Quoting() {
    // State initialization for different sections
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
        bread: '',
        pumpkin: '',
        meats: '',
        sidings: '',
        salad: '',
        appetiser: '',
        dessert: '',
        teaCoffee: '',
    });

    const [cutleryExtras, setCutleryExtras] = useState({
        fork: '',
        knife: '',
        spoon: '',
        dinnerPlate: '',
        dessertPlate: '',
        freebies: '',
    });

    // Handler to update state based on section and key
    const handleChange = (section, key, value) => {
        if (section === 'customer') {
            setCustomerDetails(prev => ({ ...prev, [key]: value }));
        } else if (section === 'function') {
            setFunctionDetails(prev => ({ ...prev, [key]: value }));
        } else if (section === 'catering') {
            setCateringDetails(prev => ({ ...prev, [key]: value }));
        } else if (section === 'cutlery') {
            setCutleryExtras(prev => ({ ...prev, [key]: value }));
        }
    };

    return (
        <div>
            <h1 className='title'>Quoting Sheet</h1>

            <h4>Customer Detail</h4>
            <div className="row">
                {Object.keys(customerDetails).map(key => (
                    <div className="column" key={key}>
                        {`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                        <input
                            type={key === 'email' ? 'email' : 'text'}
                            value={customerDetails[key]}
                            onChange={(e) => handleChange('customer', key, e.target.value)}
                            style={{ border: '1px solid yellow', backgroundColor: 'yellow', padding: '3px', borderRadius: '10px' }}
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
                            onChange={(e) => handleChange('function', key, e.target.value)}
                            style={{ border: '1px solid yellow', backgroundColor: 'yellow', padding: '3px', borderRadius: '10px' }}
                        />
                    </div>
                ))}
            </div>

            <h4>Catering Detail</h4>
            <div className="row">
                {Object.keys(cateringDetails).map(key => (
                    <div className="column" key={key}>
                        {`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                        <input
                            type='text'
                            value={cateringDetails[key]}
                            onChange={(e) => handleChange('catering', key, e.target.value)}
                            style={{ border: '1px solid yellow', backgroundColor: 'yellow', padding: '3px', borderRadius: '10px' }}
                        />
                    </div>
                ))}
            </div>

            <h4>Cutlery / Extras</h4>
            <div className="row">
                {Object.keys(cutleryExtras).map(key => (
                    <div className="column" key={key}>
                        {`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                        <input
                            type='text'
                            value={cutleryExtras[key]}
                            onChange={(e) => handleChange('cutlery', key, e.target.value)}
                            style={{ border: '1px solid yellow', backgroundColor: 'yellow', padding: '3px', borderRadius: '10px' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
