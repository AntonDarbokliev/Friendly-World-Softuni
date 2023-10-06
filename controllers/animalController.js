const animalController = require("express").Router();
const { isAuthorized } = require("../middlewares/authMiddleware.js");
const { create, getAll, findAnimal, edit, deleteAnimal, donate} = require("../services/animalService.js");
const { getById } = require("../services/animalService.js");
const { errorHelper } = require("../utils/errorHelpers.js");

//Create

animalController.get("/create",isAuthorized, (req, res) => {
  res.render("create", {
    title: "Add animal",
  });
});

animalController.post("/create",isAuthorized, async (req, res) => {
  try {
    await create(req.body,req.user._id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

//Detalis

animalController.get("/:id/details", async (req, res) => {
  try {
    const animal = await getById(req.params.id);
    const isOwner = req.user?._id == animal.owner._id
    let hasDonated = false;
    if (JSON.parse(JSON.stringify(animal.donations)).includes(req.user?._id)) {
        hasDonated = true
    }

    res.render("details", {
      title: "Animal Details",
      animal,
      isOwner,
      hasDonated
    });
  } catch (err) {
    const errors = errorHelper(err)
    res.render('details',{
      title : 'Details',
      errors
    });
  }
});

//Dashboard

animalController.get("/dashboard", async (req, res) => {
  try {
    const animals = await getAll();
    res.render("dashboard", {
      title: "Animal Dashboard",
      animals,
    });
  } catch (err) {
    console.log(err);
  }
});

//Search
animalController.get("/search", async (req, res) => {
  try {
    const searchValue = req.query.search;
    let animals;
    if (searchValue) {
      animals = await findAnimal(searchValue);
    }else{
        animals = await getAll()
    }
    res.render("search", {
      title: "Animal Search",
      animals
    });
  } catch (err) {
    console.log(err);
  }
});

animalController.get("/:id/edit",isAuthorized,async (req, res) => {
  try {
    const id = req.params.id;
    const animal = await getById(id)
   
    res.render("edit", {
      title: "Animal Edit",
      animal
    });
  } catch (err) {
    const errors = errorHelper(err)
    res.render("edit", {
      title: "Animal Edit",
      animal,
      errors
    });
  }
});

animalController.post("/:id/edit",isAuthorized, async (req, res) => {
  try {
    const id = req.params.id;
    const animalData = req.body
    await edit(id,animalData)
    res.redirect(`/animal/${id}/details`)
   
  } catch (err) {
    const errors = errorHelper(err)
    res.render("edit", {
      title: "Animal Edit",
      errors
    });
  }
});

animalController.get('/:id/delete',isAuthorized, async (req,res) => {
  const id = req.params.id
try{
  await deleteAnimal(id)
  res.redirect('/animal/dashboard')
}catch(err){
  res.redirect(`/animal/${id}/details`)
}
})


animalController.get('/:id/donate', isAuthorized,async (req,res) => {
  const animalId = req.params.id
  const userId = req.user._id 
try{
  
  await donate(animalId,userId)
  res.redirect(`/animal/${animalId}/details`)
}catch(err){
  const errors = errorHelper(err)
  res.render('details',{
    title : 'Details',
    errors,
    animal
  })
}
})


module.exports = animalController;
