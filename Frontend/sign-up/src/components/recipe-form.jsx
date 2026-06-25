import React from "react";


const RecipeForm = ({
  form,
  setForm,
  image,
  setImage,
  handleSubmit,
  buttonText
})=>{


const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:
e.target.value

});

};



return (

<form onSubmit={handleSubmit}>


<input

name="title"

placeholder="Recipe title"

value={form.title}

onChange={handleChange}

/>



<textarea

name="description"

placeholder="Description"

value={form.description}

onChange={handleChange}

/>



<input

name="ingredients"

placeholder="Ingredients"

value={form.ingredients}

onChange={handleChange}

/>



<select

name="category"

value={form.category}

onChange={handleChange}

>


<option value="">
Select Category
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



<input

type="file"

onChange={(e)=>
setImage(e.target.files[0])
}

/>



<button>

{buttonText}

</button>


</form>

);


};


export default RecipeForm;