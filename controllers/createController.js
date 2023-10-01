const createController = require("express").Router();
const {create} = require('../services/animalService.js')

createController.get("/", (req, res) => {
  res.render("create", {
    title: "Add animal",
  });
});


createController.post('/', async (req,res)=>{
try{
    const result =  await create(req.body)
    res.redirect('/')
}catch(err){
    res.render('create',{
        title : 'Create error',
    }); 
    console.log(err);
}


})



module.exports = createController
