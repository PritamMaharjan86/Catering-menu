import React from 'react';
import { saveAs } from 'file-saver';

export default function MeatOnly({ textValue, name, bread, pumpkin, meats, sidings, appetiser, salad, freebies, cost, functionDate, number }) {

    const handleDownload = () => {
        // Get the content of the div
        const content = document.getElementById('quotation-content').innerHTML;

        // Wrap content in a full HTML structure to be saved as .doc
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

        // Create a Blob with the HTML content and set MIME type to application/msword
        const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });

        // Trigger the download
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

                    <p style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold', textDecoration: 'underline', margin: '40px 0' }}>Chef and Meat Package for {number} Guests</p>

                    <div style={{ margin: '20px 0', paddingLeft: '20px', textAlign: 'center' }}>
                        <p><strong>Bread:</strong> {bread}</p>
                        <p><strong>Pumpkin:</strong> {pumpkin}</p>
                        <p><strong>Meats:</strong> {meats}</p>
                        <p><strong>Sidings:</strong> {sidings}</p>
                        <p><strong>Appetiser:</strong> {appetiser}</p>
                        <p><strong>Salad:</strong> {salad}</p>
                        <br />
                        <p style={{ textAlign: 'center' }}><strong>Chef Service:</strong> Your own personal chef to setup, cook, carve and serve</p>
                    </div>

                    <p style={{ textAlign: 'center', fontSize: '22px', fontWeight: 'bold' }}>TOTAL: <span style={{ color: '#d9534f' }}>${cost} </span> (GST Inclusive)</p>
                    <p style={{ textAlign: 'center', fontStyle: 'italic', textDecoration: 'underline' }}> Note: 2.3% surcharge will apply for credit card payment.</p>

                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '40px 0' }} />

                    <p style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center' }}>Freebies</p>
                    <p style={{ textAlign: 'center' }}>{freebies}</p> <br />

                    <p style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center' }}>Additional Notes</p>
                    <p style={{ textAlign: 'center' }}>{textValue}</p> <br />

                    <p>Your chef will arrive 5 hours before eating time. A source of power will be needed.</p>
                    <p>Our chef will cook and serve the juicy Barbecue Sizzle to your guests, adding their own personal touch on the night. Your guests will not only leave your party with a belly full of great food, but also feeling satisfied that their meal was really looked after.</p>

                    <p>If you have any questions, please feel free to call or email. I look forward to hearing from you soon.</p>

                    <p style={{ marginTop: '60px' }}>Kind regards,</p>
                    <p>Geofrey Oliva - Manager</p> <br />
                    <p style={{ textDecoration: 'underline', fontStyle: 'italic' }}>Please note: The price above is based on the number of guests you have given us. Any change in the numbers will also change in the total cost.</p>
                </div>

                <img style={{ width: '100%', borderTop: '2px solid #555' }} src='https://res.cloudinary.com/dedpvue13/image/upload/v1723893361/Barbehaus-letterhead_2_iwp0mv.png' alt="Barbehaus Letterhead" />
            </div>
            <button className='border-2 rounded-md p-1 mt-5 bg-blue-500 text-white mx-auto block mb-10' onClick={handleDownload}>Download</button>
        </div >
    );
}
