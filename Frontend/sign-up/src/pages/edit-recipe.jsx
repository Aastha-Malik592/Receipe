import React,{useEffect,useState} from "react";

import {useParams,useNavigate} from "react-router-dom";

import {useSelector,useDispatch} from "react-redux";

import toast from "react-hot-toast";

import RecipeForm from "../components/recipe-form";

import {
updateRecipeThunk
} from "../features/recipe/recipe-thunk";



const EditRecipe=()=>{


const {id}=useParams();

const navigate=useNavigate();

const dispatch=useDispatch();



const recipe =
useSelector(
state=>state.recipe.recipes
.find(
item=>item._id===id
)
);



const [form,setForm]=useState({

title:"",
description:"",
ingredients:"",
category:""

});


const [image,setImage]=useState(null);



useEffect(()=>{

if(recipe){

setForm({

title:recipe.title,

description:recipe.description,

ingredients:
recipe.ingredients.join(","),

category:recipe.category

});


}


},[recipe]);




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



if(image){

formData.append(
"image",
image
);

}



const result =
await dispatch(
updateRecipeThunk({

id,

data:formData

})
);



if(
updateRecipeThunk.fulfilled.match(result)
){

toast.success(
"Recipe Updated"
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
      src="https://images.unsplash.com/photo-1495521821757-a1efb6729352"
      alt="Recipe"
    />
  </div>

  <div className="right-side">

    <div className="authBox">

      <h1>Edit Recipe</h1>

      <p>Update your recipe details</p>

      <RecipeForm
        form={form}
        setForm={setForm}
        image={image}
        setImage={setImage}
        handleSubmit={handleSubmit}
        buttonText="Update Recipe"
      />

    </div>

  </div>

</div>

);







};


export default EditRecipe;