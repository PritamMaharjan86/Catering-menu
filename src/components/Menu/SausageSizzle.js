import React from 'react';

export default function SausageSizzle({ items }) {

    const name = items.find(item => item.category === 'name') ? items.find(item => item.category === 'name').input : '';
    const number = items.find(item => item.category === 'number') ? items.find(item => item.category === 'number').input : '';
    const food = items.find(item => item.category === 'bread' || item.category === 'pumpkin' || item.category === "meat") ? items.find(item => item.category === 'bread' || item.category === 'pumpkin' || item.category === "meat").input : '';
    const costItem = items.find(item => item.category === 'cost');
    const costWithGST = costItem ? (parseFloat(costItem.input) * 1.10).toFixed(2) : '';



    return (
        <div style={{ width: '21cm', height: '29.7cm', margin: 'auto' }}>
            <span>Friday, 18 November 2022</span>
            <p style={{ textAlign: 'left', marginLeft: '30px' }}>Dear {name},</p>
            <p style={{ textAlign: 'left', marginLeft: '30px' }}>Thank you for your inquiry.</p>
            <p style={{ textAlign: 'left', marginLeft: '30px' }}>Barbehire would love to cater for your event!</p>
            <p style={{ textAlign: 'left', marginLeft: '30px' }}>Please find your quotation below:</p>
            <br />
            <br />

            <p style={{ textAlign: 'center', fontSize: '25x', fontWeight: 'bold', textDecoration: 'underline' }}>BBQ sizzle package for guests : {number} people</p>
            <p>{food}</p>
            <p>Your own personal chef to cook and serve</p>
            <p>Total <span style={{fontWeight:'bold'}}>$ {costWithGST} </span>GST INCLUSIVE </p>
            <p>Extras</p>
            <p>Our chef will cook and serve the juicy Barbecue Sizzle to your guests adding their own personal</p>
            <p>touch on the night. Your guests will not only leave your party with a belly full of great good, but</p>
            <p>also feeling satisfied that their meal was really looked after.</p>
            <br />
            <p style={{ textAlign: 'left', marginLeft: '30px' }}>Kind regards.</p>
            <p style={{ textAlign: 'left', marginLeft: '30px' }}>Geofrey Oliva - Manager</p>
        </div>
    );
}
