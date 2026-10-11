import React, { useState } from 'react'
import '../css/Hero.css'
import { LuSparkles } from 'react-icons/lu'
import { IoIosSearch } from 'react-icons/io'
import { TextField, InputAdornment, Button } from '@mui/material'
import pikachu from '../images/pikachu.webp'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../redux/store'
import { getPokemonByName } from '../redux/pokeSlices'
import PokemonDetailModal from '../components/PokemonDetailModal'

function Hero() {

    const { selectedPokemon, error } = useSelector((state: RootState) => state.poke)
    const [search, setSearch] = useState('')
    const [searchLoading, setSearchLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const handleSearch = async () => {
        if (!search.trim() || searchLoading) return
        setSearchLoading(true)
        try {
            await dispatch(getPokemonByName(search)).unwrap()
        } catch {
            // Hata mesajı Redux state üzerinden gösterilecek.
        } finally {
            setSearchLoading(false)
        }
        setSearch('')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') { handleSearch() }
    }

    return (
        <>
            <header className="hero-main">
                <div className="hero-content">
                    <span className="hero-top-badge">
                        <LuSparkles className="hero-badge-icon" />
                        <span className="hero-badge-text">
                            Your Pokémon companion
                        </span>
                    </span>

                    <h1 className="hero-heading">
                        The Ultimate Pokémon
                        <em>Atlas</em>
                    </h1>

                    <p className="hero-desc">
                        Discover Pokémon, explore their abilities and stats,
                        and learn what makes each one unique.
                    </p>
                    <div className="hero-actions">
                        <TextField
                            className="hero-input"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search Pokémon by name..."
                            variant="outlined"
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'var(--hero-input-bg)',
                                    borderRadius: { xs: '14px', sm: '18px' },
                                    paddingRight: { xs: '6px', sm: '14px' },
                                    paddingLeft: { xs: '10px', sm: '14px' },
                                    fontSize: { xs: '0.85rem', sm: '1rem' },
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: 'var(--hero-input-placeholder)',
                                    padding: { xs: '14px 6px', sm: '16.5px 14px' },
                                    textOverflow: 'ellipsis',
                                },
                                '& .MuiInputAdornment-root': {
                                    marginRight: { xs: '4px', sm: '8px' },
                                },
                                '& input:-webkit-autofill': {
                                    WebkitBoxShadow: '0 0 0 100px var(--hero-input-bg) inset',
                                    WebkitTextFillColor: 'var(--hero-input-text)',
                                    caretColor: 'var(--hero-input-text)',
                                    borderRadius: 'inherit',
                                    transition: 'background-color 9999s ease-out',
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IoIosSearch size={20} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ marginLeft: 0 }}>
                                            <Button
                                                variant="contained"
                                                onClick={handleSearch}
                                                disabled={searchLoading || !search.trim()}
                                                sx={{
                                                    borderRadius: '10px',
                                                    textTransform: 'none',
                                                    whiteSpace: 'nowrap',
                                                    minWidth: 'auto',
                                                    padding: { xs: '4px 10px', sm: '6px 16px' },
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                    backgroundColor: '#ef6262',
                                                    '&:hover': { backgroundColor: '#d95353' },
                                                    '&.Mui-disabled': {
                                                        backgroundColor: '#878787',
                                                        color: '#fff',
                                                    },
                                                }}
                                            >
                                                {searchLoading ? '...' : 'Explore'}
                                            </Button>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </div>
                </div>

                <div className="hero-visual">
                    <span className="hero-ring hero-ring--outer" />
                    <span className="hero-ring hero-ring--inner" />
                    <img src={pikachu} className="hero-photo" alt="Pikachu" />

                    <span className="hero-visual-badge hero-badge--id">#025</span>
                    <span className="hero-visual-badge hero-badge--type">
                        <i className="hero-badge__dot" />
                        Electric
                    </span>
                </div>
            </header>

            {error && (
                <div className="pokemon-search-error">
                    {error}
                </div>
            )}

            {selectedPokemon && (
                <PokemonDetailModal pokemon={selectedPokemon} />
            )}
        </>
    )
}

export default Hero