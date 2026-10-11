import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { StateType } from '../types/type'
import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2'

const initialState: StateType = {
    pokemons: [],
    filteredPokemons: [],
    selectedPokemon: null,
    loading: false,
    error: null
}

export const getPokemons = createAsyncThunk('getPokemons', async () => {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=36`)
    const pokemonDetails = await Promise.all(
        response.data.results.map(
            async (pokemon: { url: string }) => {
                const response = await axios.get(pokemon.url)
                return response.data
            }
        )
    )
    return pokemonDetails
}
)

export const getPokemonByName = createAsyncThunk('getPokemonByName', async (name: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon/${name.toLowerCase().trim()}`)
        return response.data

    } catch (error) {
        return rejectWithValue(
            'Pokémon not found.'
        )
    }
}
)

export const pokeSlice = createSlice({
    name: 'poke',
    initialState,
    reducers: {
        getFilteredByType: (state, action) => {
            const selectedType = action.payload

            if (selectedType === 'all') {
                state.filteredPokemons = state.pokemons
                return
            }

            state.filteredPokemons = state.pokemons.filter((pokemon) =>
                pokemon.types.some((item) => item.type.name === selectedType))
        },

        searchPokemons: (state, action) => {
            const searchValue = action.payload.toLowerCase()

            state.filteredPokemons = state.pokemons.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(searchValue)
            )
        },
        clearSelectedPokemon: (state) => {
            state.selectedPokemon = null
            state.error = null
        }
    },

    extraReducers: (builder) => {
        builder
            // Pokémon listesini yükleme
            .addCase(getPokemons.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPokemons.fulfilled, (state, action) => {
                state.pokemons = action.payload
                state.filteredPokemons = action.payload
                state.loading = false
            })
            .addCase(getPokemons.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to load Pokémon list.'
            })

            // İsme göre Pokémon arama
            .addCase(getPokemonByName.pending, (state) => {
                state.error = null
            })
            .addCase(getPokemonByName.fulfilled, (state, action) => {
                state.selectedPokemon = action.payload
                state.error = null
            })
            .addCase(getPokemonByName.rejected, (state, action) => {
                state.selectedPokemon = null
                state.error =
                    (action.payload as string) || 'Pokémon not found.'
            })


    }
})

export default pokeSlice.reducer
export const { getFilteredByType, searchPokemons, clearSelectedPokemon } = pokeSlice.actions