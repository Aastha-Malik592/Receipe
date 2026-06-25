import React,{useEffect} from "react";

import {useDispatch,useSelector} from "react-redux";

import {
getFavoriteRecipesThunk
} from "../features/recipe/recipe-thunk";

import RecipeCard from "../components/recipe-card";



const FavoriteRecipes=()=>{


const dispatch=useDispatch();


const favorites=
useSelector(
state=>state.recipe.favorites
);



useEffect(()=>{

dispatch(
getFavoriteRecipesThunk()
);


},[dispatch]);



return (

<div>

<h1>
Favorite Recipes
</h1>



{
favorites.length===0 ?

<p>
No favorite recipes
</p>


:


favorites.map(recipe=>(

<RecipeCard

key={recipe._id}

recipe={recipe}

/>

))


}



</div>

);


};



export default FavoriteRecipes;