import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectPokemonById } from "../RTK/selector"

export default function Detail() {
    const {pokemonId} = useParams()
    const pokemon = useSelector(selectPokemonById(Number(pokemonId)))

    //pokemon이 undefined인 경우 
    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return(
    <div className="flex flex-col justify-center items-center items-center border 
    border-[gray] p-[30px] rounded-[10px]">
        <div className="text-[25px] mb-[10px]">{pokemon.name}</div>
        <div className="text-center whitespace-pre-wrap">{pokemon.description}</div>
        <img className="w-[200px]" src={pokemon.front}/>
    </div>)
}