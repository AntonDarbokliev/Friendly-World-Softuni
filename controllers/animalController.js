const animalController = require("express").Router();
const {create, getAll} = require('../services/animalService.js')
const { getById } = require("../services/animalService.js");

//Create

animalController.get("/create", (req, res) => {
  res.render("create", {
    title: "Add animal",
  });
});


animalController.post('/create', async (req,res)=>{
try{
    const result =  await create(req.body)
    res.redirect('/')
}catch(err){
    console.log(err);
}
})

//Detalis

animalController.get("/:id/details", async (req, res) => {
  try {
    console.log(req.params.id);
    const animal = await getById(req.params.id);
    console.log(animal);
    res.render("details", {
      title: "Animal Details",
      animal,
    });
  } catch (err) {
    console.log(err);
  }
});

//Dashboard

animalController.get("/dashboard", async (req, res) => {
    try {
        const animals = await getAll()
        res.render('dashboard',{
            title : 'Animal Dashboard',
            animals
        })
    } catch (err) {
      console.log(err);
    }
  });



module.exports = animalController
