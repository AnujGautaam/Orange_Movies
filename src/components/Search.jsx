import React from 'react'

const Search = ({searchVariable, setSearchVariable}) => {
    // one thing to note is that never try to change the values of the props inside the children components as this will mutate the functions and the rendering will be hindered 
    // this is an example, let serachVariable="something else"
    // console.log(props)
    //  i will try both of the methods of importing and using the props here 
    // i will now try the second method for the usage of props by destructuring them 
  return (
    <div className="text-white text-3xl search">
    <div className=''>
        <img src='../public/search.png' alt='search-components'/>
        
        <input 
        type='text'
        placeholder='search for orange movies'
        onChange={(event)=>setSearchVariable(event.target.value)}
        // this is the point where i was at last time, i am trying to build a search function that aids in searching the things that have been typed there
        
        
        />

    </div>
    
    
    </div>

    // i will now be creating a search components using the already available ui from the figma and tailwind css one 
  )
}

export default Search