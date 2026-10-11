export interface PokeType {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    sprites: {
        front_default: string | null;
        front_shiny: string | null;
        other: {
            "official-artwork": {
                front_default: string | null;
                front_shiny: string | null;
            };
        };
    };
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }[];
}

export interface StateType {
    filteredPokemons: PokeType[];
    pokemons: PokeType[];
    loading: boolean;
    error: string | null;
    selectedPokemon: PokeType | null;
}

export interface PokemonProps {
    pokemons: PokeType[];
}