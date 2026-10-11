import type { PokemonProps } from '../types/type'
import { typeColors } from '../constants/typeColors'
import '../css/PokemonCard.css'

function Pokemon({ pokemons }: PokemonProps) {
    return (
        <>
            {pokemons.map((pokemon) => (
                <div key={pokemon.id} className="pokemonCard">
                    <span className="pokemonId">#{String(pokemon.id).padStart(3, '0')}</span>

                    <img
                        className="pokemonImg"
                        src={pokemon.sprites.other['official-artwork'].front_default ?? ''}
                        alt={pokemon.name}
                    />

                    <h3 className="pokemonName">{pokemon.name}</h3>

                    <div className="typeList">
                        {pokemon.types.map(({ type }) => {
                            const color = typeColors[type.name] ?? '#666'

                            return (
                                <span
                                    key={type.name}
                                    className="typeBadge"
                                    style={{ color, background: `${color}22` }}
                                >
                                    ● {type.name}
                                </span>
                            )
                        })}
                    </div>

                    <div className="cardStats">
                        <div>
                            <small>HEIGHT</small>
                            <strong>{pokemon.height / 10} m</strong>
                        </div>
                        <div>
                            <small>WEIGHT</small>
                            <strong>{pokemon.weight / 10} kg</strong>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Pokemon