import React from 'react';
import { saveAs } from 'file-saver';
import Button from '@mui/material/Button';


export default function TwoCourseMeal({ textValue, name, bread, pumpkin, meats, sidings, appetiser, salad, freebies, total, functionDate, number }) {

    const handleDownload = () => {
        const content = document.getElementById('quotation-content').innerHTML;
        const htmlContent = `
            <html>
            <head>
                <meta charset="utf-8">
                <title>Quotation</title>
                <style>
                    @page {
                        size: A4;
                        margin: 20mm;
                    }
                    img {
                        max-width: 80%;
                        height: auto;
                    }
                </style>
            </head>
            <body>
                ${content}
            </body>
            </html>
        `;
        const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
        saveAs(blob, 'quotation.doc');
    };

    return (
        <div>
            <div id="quotation-content" style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', width: '800px', margin: 'auto', backgroundColor: 'white' }}>
                <img style={{ width: '100%', borderBottom: '2px solid #555' }} src='https://res.cloudinary.com/dedpvue13/image/upload/v1723893237/Barbehaus-letterhead_v4myn9.png' />

                <div style={{ margin: '20px 30px' }}>
                    <p>{functionDate}</p>
                    <p>Dear {name},</p>
                    <p>Thank you for your inquiry. Barbehire would love to cater for your event! Please find your quotation below:</p>

                    <p style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold', textDecoration: 'underline', margin: '40px 0' }}>Deluxe Split Roast Package for {number} Guests</p>

                    <div style={{ margin: '20px 0', paddingLeft: '20px', textAlign: 'center' }}>
                        <p><strong>Bread:</strong> {bread.join(', ')}</p>
                        <p><strong>Pumpkin:</strong> {pumpkin.join(', ')}</p>
                        <p><strong>Meats:</strong> {meats.join(', ')}</p>
                        <p><strong>Sidings:</strong> {sidings.join(', ')}</p>
                        <p><strong>Appetiser:</strong> {appetiser.join(', ')}</p>
                        <p><strong>Salad:</strong> {salad.join(', ')}</p>
                        <br />
                        <p style={{ textAlign: 'center' }}>Your choice of four freshly prepared salads</p>
                        <p style={{ textAlign: 'center' }}>Idaho potatoes with sour cream</p>
                        <p style={{ textAlign: 'center' }}>Barbehaus's <strong>Signature stuffed pumpkin</strong></p>
                        <p style={{ textAlign: 'center' }}>Fresh bread rolls with creamy butter</p><br />
                        <p style={{ textAlign: 'center', textDecoration: 'underline' }}> <strong>Free Hire of</strong></p>
                        <p style={{ textAlign: 'center' }}>Spits with charcoal and firelighters</p>
                        <p style={{ textAlign: 'center' }}>Disposable plates, cutlery and all serving utensils</p>
                        <p style={{ textAlign: 'center' }}>Washing up of all equipment and crockery</p>
                        <p style={{ textAlign: 'center' }}>Condiments and Serviettes</p>
                    </div>

                    <p style={{ textAlign: 'center' }}>Your own professional chef(s) to set up, prepare the food,</p>
                    <p style={{ textAlign: 'center' }}>cook and carve the meats onto your guest's plates</p>
                    <br />

                    <p style={{ textAlign: 'center', fontSize: '22px', fontWeight: 'bold' }}>All this for just: <span style={{ color: '#d9534f' }}>${total} </span> (GST Inclusive)</p>
                    <p style={{ textAlign: 'center', fontStyle: 'italic', textDecoration: 'underline' }}> Note: 2.3% surcharge will apply for credit card payment.</p>

                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '40px 0' }} />

                    <p style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center' }}>Freebies</p>
                    <p style={{ textAlign: 'center' }}>{freebies.join(', ')}</p> <br />

                    <p style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center' }}>Additional Notes</p>
                    <p style={{ textAlign: 'center' }}>{textValue}</p> <br />

                    <p style={{ textAlign: 'center' }}>Our chef will cook and serve the juicy Barbecue Sizzle to your guests, adding their own personal touch on the night. Your guests will not only leave your party with a belly full of great food, but also feeling satisfied that their meal was really looked after.</p>

                    <p style={{ textAlign: 'center' }}>If you have any questions, please feel free to call or email. I look forward to hearing from you soon.</p>

                    <p style={{ marginTop: '60px' }}>Kind regards,</p>
                    <p>Geofrey Oliva - Manager</p> <br />
                    <p style={{ textDecoration: 'underline', fontStyle: 'italic' }}>Please note: The price above is based on the number of guests you have given us. Any change in the numbers will also change in the total cost.</p>
                </div>

                <img style={{ width: '100%', borderTop: '2px solid #555' }} src='https://res.cloudinary.com/dedpvue13/image/upload/v1723893361/Barbehaus-letterhead_2_iwp0mv.png' alt="Barbehaus Letterhead" />
            </div>
            <div className='flex justify-center items-center gap-2 mb-10 mt-10'>
                <Button color='success' variant="outlined" onClick={handleDownload}>
                    Download
                </Button>

            </div>
        </div >
    );
}
