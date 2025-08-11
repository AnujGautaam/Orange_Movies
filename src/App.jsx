// this is the new beginning 
import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import IsLoading from '../src/components/IsLoading'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'

const App = () => {
  
  // first i am declaring the search components
  //  or props as a hook here and then i will pass it to the search funtion 
  // two of the most important lessons relating to the handling of props and state is to not mutate the props and the states
  // an example would be  searchVariable = "something new"
  // so what then, only use the setter function to mutate the state, i.e. setSearchVariable("someting new ") in this case

  
  const [searchVariable, setSearchVariable] = useState("")
  // what i will try to do here is to creatue a loading state as well as the state for the handling of data.
  const [movieData, setMovieData] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean)
  // const debounce = useDebounce(searchVariable,200)
  const [debouncedVariable, setDebouncedVariable] = useState("")
  
  useDebounce(()=>setDebouncedVariable(searchVariable),600,[searchVariable])
  
  const [errorFound, setErrorFound] = useState("")
  // in the next task, we need to fetch some variables from the api key that we have.
  // for this we will use the useEffect hook 

  const API_BASE_URL= "https://api.themoviedb.org/3"
  const API_KEY = import.meta.env.VITE_ACCESS_TOKEN
  // const rando = import.meta.env.MANGO
  // console.log(API_KEY)

  const options = {
    method : "GET", 
    headers:{
      accept:"application/json",
      // Authorization:`Bearer ${API_KEY}` 
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGI2MTIzY2E2NmQ5ZDVhMmMxN2JmMTM4ZWZjNTliYiIsIm5iZiI6MTc1NDc4MTczNS40OTUwMDAxLCJzdWIiOiI2ODk3ZDgyNzY4YThhZmE3NDRlMjQ3NTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jD-F1L1E5GoWdiexIqzzUzvc7-814fYkDOfm0PMwir8 `
    }
  }

  const fetchingData = async(query="")=>{
    setIsLoading(true)
    // const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
    const endpoint = searchVariable?`https://api.themoviedb.org/3/search/movie?query=${encodeURI(query)}`:`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`

    setIsLoading(false)

try {
      const response = await fetch(endpoint, options)
      console.log(`1st one: ${response.ok}` )
      if(!response.ok){
        throw new Error(`HTTP Error: ${response.status}`);
        
      }
      const result = await response.json()
      // what if there is an error in this section as well, that is why we create another error handler
      if(result.Response==="False"){
        setErrorFound(result.Error ||"something went wrong with searching for the movie")
        setMovieData([])
        return

      }
      setMovieData(result.results||[])
      console.log(result.results)
    } catch (error) {
      setErrorFound(error)
    } finally{
      // setIsLoading(false)
      setIsLoading(false)
      // no matter if the data is found or not the loading is set to be false
    }
  }

  // I will try to chose a different route to show the movies in this case by building up a new search function for doing so 
  // we have to decorate it in a way that we can get the database 

  // now it has been decided to use the same route as his but adding a conditional that if there are no search terms, include the regular one and if there are search terms there, do the searching one
  // const optionsSearch = {
  //   method:"GET", 
  //   headers:{
  //     accept:"application/json",
  //     Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGI2MTIzY2E2NmQ5ZDVhMmMxN2JmMTM4ZWZjNTliYiIsIm5iZiI6MTc1NDc4MTczNS40OTUwMDAxLCJzdWIiOiI2ODk3ZDgyNzY4YThhZmE3NDRlMjQ3NTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jD-F1L1E5GoWdiexIqzzUzvc7-814fYkDOfm0PMwir8"
  //   }

  // }
  
  
  // const findMovies= async(query)=>{
  //   try {
  //     const response = await fetch(`https://api.themoviedb.org/3/search/movie`,optionsSearch)

  //     // adding first layer of error boundary
  //     if(!response.ok){
  //       throw new Error("there was an error with fetching the data ! please try again later")
  //     }
  //     const result = await response.json()
  //     console.log(result)
  //   } catch (error) {
      
  //   }
  // }

  // findMovies("My Oxford Year")
  // this works perfectly fine




  useEffect(()=>{
    
    fetchingData(debouncedVariable)
    
  }, [debouncedVariable])
  // i will use the try and catch method which is the more reliable one

  // here empty array signifies that every time the screen refreshes or rerenders, the effects called inside the function get executed 
  return (
    <main className="bg-[url(../public/BG.png)]">
      {/* so this is how it is done using figma, tailwind and react js */}
      <div className='pattern'/>
      <div className='wrapper'>
        <header>

          <h1 className="text-3xl font-bold underline font-red">
   Welcome to Orange Movies
  </h1>
  
  <h2 className='text-center'>

    Find <span className='text-gradient-one'>Best Movies</span> on one go
  </h2>
  <img src='/hero-img.png' alt='' style={{height:"420px"}}/>

  {/* in this section, i will try to include the things i have downloaded from the figma that he has provided */}
  {/* <p className='text-amber-50'>Search</p> */}
  <Search searchVariable={searchVariable} setSearchVariable={setSearchVariable}/>

        </header>
        <section>
          {searchVariable? <h5 className='text-white mt-[14px] border-2 border-solid m-2 text-center'>Showing Results for "{searchVariable}" </h5>:<h5 className='text-white mt-[14px] border-2 border-solid m-2 text-center'>Top Trending ones</h5>
          }
          
          {/* <h4>{errorFound}</h4> */}
          {/* in this section, we will try to find one of the movies */}
          
          {/* {movieData?<div className='text-white'> */}

            {/* {movieData.map(elements=><li> */}
             {/* { elements.title} */}
            {/* </li>)} */}
            {/* {console.log(movieData[0].original_title)} */}
          {/* </div>: <h3 className='text-white'>let's find this movie */}

            {/* {} */}
          {/* </h3> */}
          
          
          {/* } */}
         

         {/* this was my idea of rendering the data using the movieData element and the one used by the JSM is also good, so that is the one that i will be using now */}
         {isLoading?<IsLoading/>:errorFound?setErrorFound("there appears to be some kinds of bugs infecting this website"):<ul className='flex flex-row flex-wrap'>
          
          {movieData.map(elements=><div className=''><  MovieCard key={elements.id} data={elements}/></div>
            
            
            
            // (<li key={elements.id} className="text-white">{elements.title}</li>)
            )}
          </ul>}
          {/* one thing that i have learnt is that for the usage of braces, it is important to use () instead of the curly ones as the curly ones require the return statement while the another one does not */}
          {/* i can now explain the importance of using the id values which is that it will aid in establishing uniqueness with the elements and while deleting them there are no unexpected behaviours as react would know exactly which one to delete */}
        </section>
      </div>
      {/* <h3 className='text-white'>{searchVariable}</h3> */}
      {/* this was to see if the things that i did worked out */}
      {/* and i was right about the things that i tried here */}


    </main>
  )
}

export default App
