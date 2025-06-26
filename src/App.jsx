import { useState, useEffect } from 'react'
import './App.css'
import { IconButton } from '@mui/material'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [pokeCategory, setPokeCategory] = useState(null)
  const [pokemons, setPokemons] = useState([])

  const getPokemonCategory = async () =>{
    setIsLoading(true)
    try{

      const response = await fetch('https://pokeapi.co/api/v2/type')
      const json = await response.json();
      setPokeCategory(json.results)
      console.log(pokeCategory)
    }catch(error){
      console.log('error', error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    getPokemonCategory()
  },[])

  return (
    <>
    <div>
    {
      pokeCategory && pokeCategory.length ? 
      pokeCategory.map((cate)=>{return <IconButton>
        <img src={`/images/types-icons/${cate.name}.svg`} alt="" width="50"/>
        </IconButton>}) : <>loading...</>
    }
    </div>
    </>
  )
}

export default App
