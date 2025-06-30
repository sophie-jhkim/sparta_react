import { useEffect, useState } from "react";
import { formatPokemonData } from "../utils/pokemon-helper";

export function PokemonCard({ type }) {
    const [pokemons, setPokemons] = useState([]);
    const [finalPokemons, setFinalPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getPokemonsByType = async () => {
        try {
            setIsLoading(true);
            setFinalPokemons([]);
            const response = await fetch(
                `https://pokeapi.co/api/v2/type/${type}`
            );
            const data = await response.json();
            setPokemons(data.pokemon);
        } catch (error) {
            console.log("error::", error);
        } finally {
            setIsLoading(false);
        }
    };

    // type이 바뀌면 호출
    useEffect(() => {
        getPokemonsByType();
    }, [type]);

    // pokemons가 바뀌면 호출
    useEffect(() => {
        if (pokemons.length === 0) return;

        const fetchDatails = async () => {
            setIsLoading(true);
            try {
                let results = await Promise.all(
                    pokemons.map(async (item) => {
                        const response = await fetch(item.pokemon.url);
                        const data = await response.json();
                        return formatPokemonData(data);
                    })
                );
                setFinalPokemons(results);
            } catch (error) {
                console.error("Failed to fetch pokemon details", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDatails();
    }, [pokemons]);

    return (
        <div className="pokemons-container">
            {isLoading ? (
                <div className="loader"></div>
            ) : finalPokemons && finalPokemons.length ? (
                finalPokemons.map((item) => {
                    return (
                        <div
                            className={`pokemon-card ${item.types[0].name}`}
                            key={item.name}
                        >
                            <div>
                                <div className="id-number">#{item.id}</div>
                                <span className="pokemon-name">
                                    {item.name}
                                </span>
                                <div className="types">
                                    {item.types.map((type) => {
                                        return (
                                            <div
                                                className={type.name}
                                                key={type.name}
                                            >
                                                <img
                                                    src={`/images/types-icons/${type.name}.svg`}
                                                    alt=""
                                                    width="10"
                                                    height="10"
                                                />
                                                <span className="type-name">
                                                    {type.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="pokeball-bg"></div>
                            <img
                                className="pokemon-image"
                                src={item.imgSrc}
                                alt={item.name}
                            />
                        </div>
                    );
                })
            ) : (
                <></>
            )}
        </div>
    );
}
