app.post("/api/persons", (req, res) => {
    const { name, phonenumber } = req.body;
    if ( name || phonenumber ){
        return res
        .status(200)
        .send(`Please enter the information for ID ${getRandomInt()}`)
    
}
})
  