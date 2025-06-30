import { useState, useEffect } from "react";
import "./App.css";
import { IconButton } from "@mui/material";
import { PokemonCard } from "./components/PokemonCard";

function App() {
    const [pokeCategory, setPokeCategory] = useState(null);
    const [type, setType] = useState("ice");

    const getPokemonCategory = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/type");
            const json = await response.json();
            setPokeCategory(json.results);
        } catch (error) {
            console.log("error", error);
        } finally {
        }
    };

    const handleClick = (type) => {
        setType(type);
    };

    useEffect(() => {
        getPokemonCategory();
    }, []);

    return (
        <div className="wrapper">
            <h1 className="logo-pokemon"></h1>
            {pokeCategory && pokeCategory.length && (
                <div className="types-bar types">
                    {pokeCategory.map((cate) => {
                        return (
                            <IconButton
                                key={cate.name}
                                className={cate.name}
                                onClick={() => handleClick(cate.name)}
                            >
                                <img
                                    src={`/images/types-icons/${cate.name}.svg`}
                                    alt=""
                                    width="50"
                                    height="50"
                                />
                            </IconButton>
                        );
                    })}
                </div>
            )}
            <div>
                <PokemonCard type={type} />
            </div>
        </div>
    );
}

export default App;
