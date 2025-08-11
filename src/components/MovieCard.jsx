import React from 'react'

const MovieCard = ({data}) => {
  return (
    <div className='movie-card' style={{height:"500px", width:"250px", margin:"20px"}}>
       
        <img src={data.poster_path?`https://image.tmdb.org/t/p/w500/${data.poster_path}`:"/nothing.png"} style={{height:"300px"}}/>
         <h6 className='text-white mt-[40px]'>
            
           {data.title}
           {/* {console.log(data)} */}

        </h6>
<div className='content'>
    <img src='/Rating.png' style={{height:"30px", width:"30px"}}/>
    <h3>{data.vote_average}</h3> 
    <span className='text-5xl mb-6'>.</span>
    <h3 className='language'>{data.original_language}</h3>
    <span className='text-5xl mb-6'>.</span>
    <h3 className=''>{data.release_date?data.release_date.split("-")[0]:"N/A"}</h3>
    {/* I am going to add a proper error boundary for running this line of code */}

</div>

    </div>
  )
}

export default MovieCard

// this is a good name for the movie card