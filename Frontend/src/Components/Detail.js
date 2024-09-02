import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../Detail.css';
import SausageSizzle from './SausageSizzle';
import MeatOnly from './MeatOnly';
import ThreeCourseMeal from './ThreeCourseMeal';
import TwoCourseMeal from './TwoCourseMeal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Download from '@mui/icons-material/Download';
import Create from '@mui/icons-material/Create';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton } from '@mui/material';


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
        discount: '',
        staffFee: '',
        gst: '',
        cost: '',
        total: '',

        // Catering detail
        bread: [''],
        pumpkin: [''],
        sidings: [''],
        meats: [''],
        salad: [''],
        appetiser: [''],
        freebies: [''],

        // Particulars

        textValue: '',
    });

    const [sausageSizzle, setSausageSizzle] = useState(false);
    const [meatonly, setMeatonly] = useState(false);
    const [threecoursemeal, setThreecoursemeal] = useState(false);
    const [twocoursemeal, setTwocoursemeal] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);


    const formatPhoneNumber = (number) => {
        const cleaned = number.replace(/\D/g, '');
        const limitedDigits = cleaned.slice(0, 10);
        const formatted = limitedDigits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        return formatted;
    };

    const validateForm = (updatedInput) => {
        const { phNumber, meats, bread, pumpkin, sidings, salad, appetiser } = updatedInput;


        const allFieldsFilled = phNumber &&
            meats.every((item) => item.trim() !== '') &&
            bread.every((item) => item.trim() !== '') &&
            pumpkin.every((item) => item.trim() !== '') &&
            salad.every((item) => item.trim() !== '') &&
            appetiser.every((item) => item.trim() !== '') &&
            sidings.every((item) => item.trim() !== '');

        setIsFormValid(allFieldsFilled);
    };

    const handleChange = (e, index = null, category = null) => {
        const { name, value } = e.target;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

        let updatedInput;

        if (name === 'phNumber') {
            updatedInput = {
                ...input,
                [name]: formatPhoneNumber(value),
            };
        }
        else if (index !== null && category !== null) {
            const newValues = [...input[category]];
            newValues[index] = capitalizedValue;

            updatedInput = {
                ...input,
                [category]: newValues,
            };
        } else {
            updatedInput = {
                ...input,
                [name]: capitalizedValue,
            };
        }

        setInput(updatedInput);
        validateForm(updatedInput);
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
            setThreecoursemeal(false);
            setTwocoursemeal(false);
        } else if (input.menu === 'BBHMeatOnly') {
            setSausageSizzle(false);
            setThreecoursemeal(false);
            setTwocoursemeal(false);
            setMeatonly(true);
        } else if (input.menu === 'ThreeCourseMeal') {
            setThreecoursemeal(true);
            setMeatonly(false);
            setSausageSizzle(false);
            setTwocoursemeal(false);
        } else if (input.menu === 'TwoCourseMeal') {
            setThreecoursemeal(false);
            setTwocoursemeal(true);
            setMeatonly(false);
            setSausageSizzle(false);
        }
        else {
            setSausageSizzle(false);
            setMeatonly(false);
            setThreecoursemeal(false);
            setTwocoursemeal(false);
        }
    };



    return (
        <>
            <div className="form-container">
                <div className="row">
                    <h1>Customer Detail</h1>
                    <div className="column">

                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        ></Box>
                        <TextField id="outlined-basic" label="Contact date" variant="outlined" onChange={handleChange} value={input.contactDate} type='date' name='contactDate' />

                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        ></Box>
                        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={handleChange} value={input.name} type='text' name='name' required />


                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        ></Box>
                        <TextField id="outlined-basic" label="Phone Number" variant="outlined" onChange={handleChange} value={input.phNumber} type='tel' name='phNumber' pattern="^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$"
                            title="Phone number should be in the format: +61 4xx xxx xxx or 04xx xxx xxx"
                            required />

                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        ></Box>
                        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={handleChange} value={input.email} type='text' name='email' />


                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">How did customer contact you?</InputLabel>
                                <Select
                                    name='inquiryForm'
                                    value={input.inquiryForm}
                                    label="How did customer contact you?"
                                    onChange={handleChange}
                                >
                                    <MenuItem value='Phone'>Phone</MenuItem>
                                    <MenuItem value='Website'>Website</MenuItem>
                                    <MenuItem value='Email'>Email</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        ></Box>
                        <TextField id="outlined-basic" label="No of Guest" variant="outlined" onChange={handleChange} value={input.guestNo} type='number' name='guestNo' required />

                    </div>

                </div>

                <div className="row">
                    <h1>Function Detail</h1>
                    <div className="column">
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        ></Box>
                        <TextField id="outlined-basic" label="Function date" variant="outlined" onChange={handleChange} value={input.functionDate} type='date' name='functionDate' required InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }} />

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel>Select Menu Type</InputLabel>
                                <Select
                                    name='menu'
                                    value={input.menu}
                                    label="Select Menu Type"
                                    onChange={handleChange}
                                >
                                    <MenuItem value='BBHSausageSizzle'>BBH Sausage Sizzle</MenuItem>
                                    <MenuItem value='BBHMeatOnly'>BBH Meat Only</MenuItem>
                                    <MenuItem value='TwoCourseMeal'>2 Course Meal</MenuItem>
                                    <MenuItem value='ThreeCourseMeal'>3 Course Meal</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>


                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        ></Box>
                        <TextField id="outlined-basic" label="Occasion" variant="outlined" onChange={handleChange} value={input.occasion} type='text' name='occasion' />


                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        ></Box>
                        <TextField id="outlined-basic" label="How did customer find you?" variant="outlined" onChange={handleChange} value={input.reference} type='text' name='reference' />



                    </div>
                </div>

                <div className="row">
                    <h1>Catering Detail</h1>
                    <div className="column">
                        {/* Bread Selection */}
                        {input.bread.map((bread, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <FormControl fullWidth>
                                    <InputLabel>Select Bread Type</InputLabel>
                                    <Select
                                        onChange={(e) => handleChange(e, index, 'bread')}
                                        value={bread}
                                        label="Select Bread Type"
                                    >
                                        <MenuItem value="">Select Bread Type</MenuItem>
                                        <MenuItem value="Dinner roll">Dinner roll</MenuItem>
                                        <MenuItem value="Damper roll">Damper roll</MenuItem>
                                        <MenuItem value="Garlic bread">Garlic bread</MenuItem>
                                        <MenuItem value="Hotdog roll">Hotdog roll</MenuItem>
                                        <MenuItem value="Burger buns">Burger buns</MenuItem>
                                        <MenuItem value="Pita bread">Pita bread</MenuItem>
                                        <MenuItem value="Sliced bread">Sliced bread</MenuItem>
                                    </Select>
                                </FormControl>

                                {index > 0 && (
                                    <IconButton
                                        color="error"
                                        onClick={() => removeOption(index, 'bread')}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}

                                {index === input.bread.length - 1 && (
                                    <IconButton
                                        color="success"
                                        onClick={() => addOption('bread')}
                                    >
                                        <AddBoxIcon />
                                    </IconButton>
                                )}
                            </div>
                        ))}

                        {/* Pumpkin Selection */}
                        {input.pumpkin.map((pumpkin, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <FormControl fullWidth>
                                    <InputLabel>Select Pumpkin Size</InputLabel>
                                    <Select
                                        onChange={(e) => handleChange(e, index, 'pumpkin')}
                                        value={pumpkin}
                                        label="Select Pumpkin Size"
                                    >
                                        <MenuItem value="">Select Pumpkin Size</MenuItem>
                                        <MenuItem value="1 Pumpkin Large">1 Pumpkin large</MenuItem>
                                        <MenuItem value="2 Pumpkin Large">2 Pumpkin large</MenuItem>
                                        <MenuItem value="3 Pumpkin Large">3 Pumpkin large</MenuItem>
                                        <MenuItem value="4 Pumpkin Large">4 Pumpkin large</MenuItem>
                                        <MenuItem value="1 Pumpkin Medium">1 Pumpkin medium</MenuItem>
                                        <MenuItem value="2 Pumpkin Medium">2 Pumpkin medium</MenuItem>
                                        <MenuItem value="3 Pumpkin Medium">3 Pumpkin medium</MenuItem>
                                    </Select>
                                </FormControl>

                                {index > 0 && (
                                    <IconButton
                                        color="error"
                                        onClick={() => removeOption(index, 'pumpkin')}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}

                                {index === input.pumpkin.length - 1 && (
                                    <IconButton
                                        color="success"
                                        onClick={() => addOption('pumpkin')}
                                    >
                                        <AddBoxIcon />
                                    </IconButton>
                                )}
                            </div>
                        ))}

                        {/* Sidings Selection */}
                        {input.sidings.map((siding, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <FormControl fullWidth>
                                    <InputLabel>Select Sidings</InputLabel>
                                    <Select
                                        onChange={(e) => handleChange(e, index, 'sidings')}
                                        value={siding}
                                        label="Select Sidings"
                                    >
                                        <MenuItem value="">Select Sidings</MenuItem>
                                        <MenuItem value="Mashed Potatoes">Mashed Potatoes</MenuItem>
                                        <MenuItem value="Steamed Veggies">Steamed Veggies</MenuItem>
                                        <MenuItem value="Grilled Corn">Grilled Corn</MenuItem>
                                        <MenuItem value="Jacket Potatoes">Jacket Potatoes</MenuItem>
                                        <MenuItem value="Sliced Onion">Sliced Onion</MenuItem>
                                        <MenuItem value="Sig Warm Potatoes">Sig Warm Potatoes</MenuItem>
                                        <MenuItem value="BBQ Baked Potatoes">BBQ Baked Potatoes</MenuItem>
                                        <MenuItem value="Pea / Carrot / Corn">Pea/Carrot/Corn</MenuItem>
                                        <MenuItem value="Steamed Potatoes">Steamed Potatoes</MenuItem>
                                    </Select>
                                </FormControl>

                                {index > 0 && (
                                    <IconButton
                                        color="error"
                                        onClick={() => removeOption(index, 'sidings')}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}

                                {index === input.sidings.length - 1 && (
                                    <IconButton
                                        color="success"
                                        onClick={() => addOption('sidings')}
                                    >
                                        <AddBoxIcon />
                                    </IconButton>
                                )}
                            </div>
                        ))}

                        {/* Meats Selection */}
                        {input.meats.map((meat, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <FormControl fullWidth>
                                    <InputLabel>Select Meat Type</InputLabel>
                                    <Select
                                        onChange={(e) => handleChange(e, index, 'meats')}
                                        value={meat}
                                        label="Select Meat Type"
                                    >
                                        <MenuItem value="">Select Meat Type</MenuItem>
                                        <MenuItem value="Beef Steak">Beef Steak</MenuItem>
                                        <MenuItem value="Lamb Chops">Lamb Chops</MenuItem>
                                        <MenuItem value="Chicken Thigh">Chicken Thigh</MenuItem>
                                        <MenuItem value="Pork Sausages">Pork Sausages</MenuItem>
                                        <MenuItem value="Beef Sausages">Beef Sausages</MenuItem>
                                        <MenuItem value="BBQ Ribs">BBQ Ribs</MenuItem>
                                        <MenuItem value="Chicken Wings">Chicken Wings</MenuItem>
                                        <MenuItem value="Lamb Ribs">Lamb Ribs</MenuItem>
                                    </Select>
                                </FormControl>

                                {index > 0 && (
                                    <IconButton
                                        color="error"
                                        onClick={() => removeOption(index, 'meats')}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}

                                {index === input.meats.length - 1 && (
                                    <IconButton
                                        color="success"
                                        onClick={() => addOption('meats')}
                                    >
                                        <AddBoxIcon />
                                    </IconButton>
                                )}
                            </div>
                        ))}

                        {/* Salad Selection */}
                        {input.salad.map((salad, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <TextField
                                    onChange={(e) => handleChange(e, index, 'salad')}
                                    value={salad}
                                    name={`salad-${index}`}
                                    fullWidth
                                    label="Enter Salad Type"
                                />

                                {index > 0 && (
                                    <IconButton
                                        color="error"
                                        onClick={() => removeOption(index, 'salad')}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}

                                {index === input.salad.length - 1 && (
                                    <IconButton
                                        color="success"
                                        onClick={() => addOption('salad')}
                                    >
                                        <AddBoxIcon />
                                    </IconButton>
                                )}
                            </div>
                        ))}

                        {/* Appetiser Selection */}
                        {input.appetiser.map((appetiser, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <FormControl fullWidth>
                                    <InputLabel>Select Appetiser Type</InputLabel>
                                    <Select
                                        onChange={(e) => handleChange(e, index, 'appetiser')}
                                        value={appetiser}
                                        label="Select Appetiser Type"
                                    >
                                        <MenuItem value="">Select Appetiser Type</MenuItem>
                                        <MenuItem value="Cheese Platter">Cheese Platter</MenuItem>
                                        <MenuItem value="Vegetable Platter">Vegetable Platter</MenuItem>
                                        <MenuItem value="Fruit Platter">Fruit Platter</MenuItem>
                                        <MenuItem value="Breadsticks">Breadsticks</MenuItem>
                                        <MenuItem value="Bruschetta">Bruschetta</MenuItem>
                                        <MenuItem value="Mini Quiches">Mini Quiches</MenuItem>
                                        <MenuItem value="Spring Rolls">Spring Rolls</MenuItem>
                                        <MenuItem value="Stuffed Mushrooms">Stuffed Mushrooms</MenuItem>
                                    </Select>
                                </FormControl>

                                {index > 0 && (
                                    <IconButton
                                        color="error"
                                        onClick={() => removeOption(index, 'appetiser')}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}

                                {index === input.appetiser.length - 1 && (
                                    <IconButton
                                        color="success"
                                        onClick={() => addOption('appetiser')}
                                    >
                                        <AddBoxIcon />
                                    </IconButton>
                                )}
                            </div>
                        ))}

                        {/* Freebies Selection */}
                        {input.freebies.map((freebie, index) => (
                            <div key={index} className="multi-input-row flex items-center space-x-2 mb-2">
                                <FormControl fullWidth>
                                    <InputLabel>Select Freebies</InputLabel>
                                    <Select
                                        onChange={(e) => handleChange(e, index, 'freebies')}
                                        value={freebie}
                                        label="Select Freebies"
                                    >
                                        <MenuItem value="">Select Freebies</MenuItem>
                                        <MenuItem value="Water">Water</MenuItem>
                                        <MenuItem value="Soft Drinks">Soft Drinks</MenuItem>
                                        <MenuItem value="Napkins">Napkins</MenuItem>
                                        <MenuItem value="Plastic Cutlery">Plastic Cutlery</MenuItem>
                                        <MenuItem value="Sauces">Sauces</MenuItem>
                                        <MenuItem value="Condiments">Condiments</MenuItem>
                                    </Select>
                                </FormControl>

                                {index > 0 && (
                                    <IconButton
                                        color="error"
                                        onClick={() => removeOption(index, 'freebies')}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}

                                {index === input.freebies.length - 1 && (
                                    <IconButton
                                        color="success"
                                        onClick={() => addOption('freebies')}
                                    >
                                        <AddBoxIcon />
                                    </IconButton>
                                )}
                            </div>
                        ))}
                    </div>

                </div>

                <div className="row">
                    <h1>Costing Detail</h1>
                    <div className="column">

                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        ></Box>
                        <TextField id="outlined-basic" label="Staff fee" variant="outlined" onChange={handleChange} value={input.staffFee} type='number' name='staffFee' required InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }} />

                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        ></Box>
                        <TextField id="outlined-basic" label="Cost" variant="outlined" onChange={handleChange} value={input.cost} type='number' name='cost' required InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }} />


                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        ></Box>
                        <TextField id="outlined-basic" label="GST" variant="outlined" onChange={handleChange} value={input.gst} type='number' name='gst' required InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }} />

                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        ></Box>
                        <TextField id="outlined-basic" label="Discount" variant="outlined" onChange={handleChange} value={input.discount} type='number' name='discount' required InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }} />

                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        ></Box>
                        <TextField id="outlined-basic" label="Total cost" variant="outlined" onChange={handleChange} required value={(Number(input.gst)) + (Number(input.staffFee)) + (Number(input.cost)) - (Number(input.discount))} type='number' name='total' InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }} />

                    </div>
                </div>
                <div className='row'>
                    <h1>Additional Notes</h1>


                    <TextField
                        value={input.textValue}
                        name="textValue"
                        onChange={handleChange}
                        label="Note"
                        multiline
                        rows={5}
                        variant="outlined"
                        fullWidth
                    />
                </div>
            </div>

            <span className='flex justify-center items-center gap-2 mb-10 text-red-500'>All the fields are required to be filled.</span>
            <div className='flex justify-center items-center gap-2 mb-10'>
                <Button color='success' variant="outlined" startIcon={<Download />} onClick={handleSave} disabled={!isFormValid}>
                    Download
                </Button>

                <Button color='warning' variant="outlined" startIcon={<Create />} onClick={handleQuote} disabled={!isFormValid}>
                    Create Quote
                </Button>

            </div>

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
                    total={(Number(input.gst)) + (Number(input.staffFee)) + (Number(input.cost)) - (Number(input.discount))}
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
                    total={(Number(input.gst)) + (Number(input.staffFee)) + (Number(input.cost)) - (Number(input.discount))}
                    functionDate={input.functionDate}
                    number={input.guestNo}
                    textValue={input.textValue}
                />
            )}

            {threecoursemeal && (
                <ThreeCourseMeal
                    name={input.name}
                    bread={input.bread}
                    pumpkin={input.pumpkin}
                    meats={input.meats}
                    sidings={input.sidings}
                    appetiser={input.appetiser}
                    salad={input.salad}
                    freebies={input.freebies}
                    total={(Number(input.gst)) + (Number(input.staffFee)) + (Number(input.cost)) - (Number(input.discount))}
                    functionDate={input.functionDate}
                    number={input.guestNo}
                    textValue={input.textValue}
                />
            )}

            {twocoursemeal && (
                <TwoCourseMeal
                    name={input.name}
                    bread={input.bread}
                    pumpkin={input.pumpkin}
                    meats={input.meats}
                    sidings={input.sidings}
                    appetiser={input.appetiser}
                    salad={input.salad}
                    freebies={input.freebies}
                    total={(Number(input.gst)) + (Number(input.staffFee)) + (Number(input.cost)) - (Number(input.discount))}
                    functionDate={input.functionDate}
                    number={input.guestNo}
                    textValue={input.textValue}
                />
            )}
        </>
    );
}
