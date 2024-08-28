import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');

});


app.get('/menu', (req, res) => {

    const menu = [
        {
            id: 1,
            title: 'SausageSizzle',
            content: 'this is chicken'

        },
        {
            id: 2,
            title: 'MeatOnly',
            content: 'this is beef'

        },
        {
            id: 3,
            title: '2CourseMeal',
            content: 'this is lamb'

        },
        {
            id: 4,
            title: '3CourseMeal',
            content: 'this is pork'

        },
    ]

    res.send(menu);
});

const port = process.env.Port || 3001; //get from env file or hardcode the port

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);

});