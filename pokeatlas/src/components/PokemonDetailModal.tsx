import { Dialog, DialogContent, IconButton, Typography, Chip, LinearProgress } from '@mui/material'
import { IoClose } from 'react-icons/io5'
import type { PokeType } from '../types/type'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../redux/store'
import { clearSelectedPokemon } from '../redux/pokeSlices'
import { typeColors } from '../constants/typeColors'
import '../css/PokemonDetailModal.css'

type PokemonDetailModalProps = {
    pokemon: PokeType
}
function PokemonDetailModal({ pokemon }: PokemonDetailModalProps) {
    const dispatch = useDispatch<AppDispatch>()

    const handleClose = () => {
        dispatch(clearSelectedPokemon())
    }

    const image =
        pokemon.sprites.other['official-artwork'].front_default

    return (
        <Dialog open={true} onClose={handleClose} fullWidth maxWidth="sm" slotProps={{ paper: { className: 'pokemon-dialog-paper' } }} >
            <DialogContent className="pokemon-modal">

                <IconButton onClick={handleClose} className="pokemon-modal-close">
                    <IoClose />
                </IconButton>

                <div className="pokemon-modal-header">
                    <span className="pokemon-modal-id">
                        #{String(pokemon.id).padStart(3, '0')}
                    </span>

                    <Typography className="pokemon-modal-name" variant="h3">
                        {pokemon.name}
                    </Typography>

                    <div className="pokemon-modal-types">
                        {pokemon.types.map(({ type }) => {
                            const color = typeColors[type.name] ?? '#666'
                            return (
                                <Chip key={type.name} label={type.name}
                                    sx={{
                                        color: color,
                                        backgroundColor: `${color}22`,
                                        fontWeight: 700,
                                        textTransform: 'capitalize'
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>

                <div className="pokemon-modal-image">
                    <img src={image ?? ''} alt={pokemon.name} />
                </div>

                <div className="pokemon-modal-info">
                    <div className="pokemon-info-box">
                        <span>HEIGHT</span>
                        <strong>
                            {pokemon.height / 10} m
                        </strong>
                    </div>

                    <div className="pokemon-info-box">
                        <span>WEIGHT</span>
                        <strong>
                            {pokemon.weight / 10} kg
                        </strong>
                    </div>
                </div>

                <div className="pokemon-modal-section">
                    <h3>Abilities</h3>

                    <div className="pokemon-abilities">
                        {pokemon.abilities.map((item) => (
                            <Chip
                                key={item.ability.name}
                                label={item.ability.name}
                                variant="outlined"
                                sx={{
                                    textTransform: "capitalize",
                                    color: "var(--text-color)",
                                    borderColor: "var(--border-color)",
                                    backgroundColor: "var(--modal-info-bg)"
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="pokemon-modal-section">
                    <h3>Base Stats</h3>

                    <div className="pokemon-stats">
                        {pokemon.stats.map((item) => {
                            const statName = item.stat.name
                                .replace(
                                    'special-attack',
                                    'Sp. Attack'
                                )
                                .replace(
                                    'special-defense',
                                    'Sp. Defense'
                                )

                            return (
                                <div className="pokemon-stat" key={item.stat.name}>
                                    <div className="pokemon-stat-header">
                                        <span>{statName}</span>
                                        <strong>
                                            {item.base_stat}
                                        </strong>
                                    </div>
                                    <LinearProgress variant="determinate" value={Math.min(item.base_stat, 100)} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PokemonDetailModal