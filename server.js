const express = require('express');


const app = express();
const port = process.env.PORT || 3001;



app.get("/", (req, res) => {
    res.send("Back end face recognition");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})