import { useEffect } from 'react'
import '../css/PokeList.css'
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { getFilteredByType, getPokemons, searchPokemons } from '../redux/pokeSlices';
import Pokemon from './Pokemon';

function PokeList() {

    const { pokemons, filteredPokemons } = useSelector(
        (store: RootState) => store.poke
    );

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getPokemons())
    }, [])

    const allTypes = pokemons.flatMap((pokemon) => {
        return pokemon.types.map((type) => {
            return type.type.name;
        });
    });

    const types = [...new Set(allTypes)];

    return (
        <div className="pokelist-container" id="navbar-search-btn">
            <section className="pokelistmain">
                <div className="pokelist-text">
                    <span>YOUR COLLECTION</span>
                    <h2>Explore the Pokédex</h2>
                    <p>Discover Pokémon across generations, explore their stats, and find your favorites.</p>
                </div>

                <div className="pokeList-Pokenumber">
                    <span>{filteredPokemons.length}</span>
                    <h5>Pokémon shown</h5>
                </div>
            </section>

            <section>
                <div className='list-input-main' >
                    <div className='search-box'>
                        <IoIosSearch />
                        <TextField
                            onChange={(e) => {
                                dispatch(searchPokemons(e.target.value));
                            }}

                            className='PokeList-input'
                            placeholder='Search the Pokédex…'
                            variant='standard'
                            fullWidth />
                    </div>

                    <div className='filter-group'>
                        <label htmlFor='type-select'>Type</label>
                        <NativeSelect
                            className="filter-select"
                            onChange={(e) => {
                                dispatch(getFilteredByType(e.target.value))
                            }}
                            disableUnderline
                            defaultValue="all"
                            inputProps={{ name: 'type', id: 'type-select' }}
                        >
                            <option value="all">All</option>

                            {types.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </NativeSelect>
                    </div>
                </div>
            </section >
            <section>
                <div className='pokemonListShower'>
                    <Pokemon pokemons={filteredPokemons} />
                </div>
            </section>
        </div >

    )
}

export default PokeList