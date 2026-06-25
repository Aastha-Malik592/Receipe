import React from "react";


const RecipeFilter=({
category,
setCategory
})=>{


return (

<select

value={category}

onChange={(e)=>
setCategory(e.target.value)
}

>


<option value="">
All Categories
</option>


<option value="Breakfast">
Breakfast
</option>


<option value="Lunch">
Lunch
</option>


<option value="Dinner">
Dinner
</option>


<option value="Dessert">
Dessert
</option>


</select>

);


};


export default RecipeFilter;