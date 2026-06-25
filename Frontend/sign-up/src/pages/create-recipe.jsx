import React,{useState} from "react";
import {useDispatch} from "react-redux";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

import RecipeForm from "../components/recipe-form";

import {
 createRecipeThunk
} from "../features/recipe/recipe-thunk";


const CreateRecipe =()=>{


const dispatch=useDispatch();

const navigate=useNavigate();


const [form,setForm]=useState({

title:"",
description:"",
ingredients:"",
category:""

});


const [image,setImage]=useState(null);



const handleSubmit=async(e)=>{

e.preventDefault();



const formData=new FormData();


formData.append(
"title",
form.title
);


formData.append(
"description",
form.description
);


formData.append(
"ingredients",
JSON.stringify(
form.ingredients.split(",")
)
);


formData.append(
"category",
form.category
);


formData.append(
"image",
image
);



const result =
await dispatch(
createRecipeThunk(formData)
);



if(
createRecipeThunk.fulfilled.match(result)
){

toast.success(
"Recipe Created"
);

navigate("/home");

}
else{

toast.error(
result.payload
);

}



};




return (

  

  <div className="authContainer">

  <div className="left-side">
    <img
      src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
      alt="Recipe"
    />
  </div>

  <div className="right-side">

    <div className="authBox">

      <h1>Create Recipe</h1>

      <p>Add a new recipe</p>

      <RecipeForm
        form={form}
        setForm={setForm}
        image={image}
        setImage={setImage}
        handleSubmit={handleSubmit}
        buttonText="Create Recipe"
      />

    </div>

  </div>

</div>

);




};


export default CreateRecipe;