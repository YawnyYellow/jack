import { useState, useEffect } from "react";
import ImageToggle from "./components/ImageToggle";
import "./App.css";
import { starter, basic, boots, epic, legendary } from "./components/Items";

function App() {
    const [stats, setStats] = useState(new Array(21).fill(0));
    const [numStats, setNumStats] = useState(0);
    const [clear, setClear] = useState(0);
    const [checkboxes, setCheckboxes] = useState({
        BORDERS: true,
        GRAYSCALE: true, 
    });

    function handleReset() {
        setClear((c) => c + 1);
    }

    let statNames = [
        "Attack damage",
        "Attack speed",
        "Ability haste",
        "Ability power",
        "Armor",
        "Percentage armor penetration",
        "Critical strike chance",
        "Heal and shield power",
        "Health",
        "Health regeneration",
        "Life steal",
        "Lethality",
        "Flat magic penetration",
        "Percentage magic penetration",
        "Magic resistance",
        "Mana",
        "Mana regeneration",
        "Flat movement speed",
        "Percentage movement speed",
        "Omnivamp",
        "Tenacity",
    ];

    function getColor() {
        const red = Math.max(255 - numStats * 25, 0); // Red decreases as count increases
        const green = Math.min(numStats * 25, 255); // Green increases as count increases
        return `rgb(${red}, ${green}, 0)`; // Keep blue at 0 for red-green gradient
    }

    useEffect(() => {
        setNumStats(stats.filter((item) => item !== 0).length);
    }, [stats]);

    function callMap(item, index) {
        return (
            <ImageToggle
                src={"images/" + item[0] + ".png"}
                alt={item[0]}
                key={item[0]}
                stats={stats}
                setStats={setStats}
                itemStats={item[1]}
                checkboxes={checkboxes}
                clear={clear}
            />
        );
    }

    function statMap(item, index) {
        if (stats[index] > 0) {
            return <p className="statName selected">{item}</p>;
        } else {
            return <p className="statName">{item}</p>;
        }
    }

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxes({ ...checkboxes, [name]: checked });
    };

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    name="BORDERS"
                    
                    checked={checkboxes.BORDERS}
                    onChange={handleCheckboxChange}
                />
                Borders
            </label>
            <label>
                <input
                    type="checkbox"
                    name="GRAYSCALE"
                    checked={checkboxes.GRAYSCALE}
                    onChange={handleCheckboxChange}
                />
                Grayscale
            </label>
            <button id="resetBtn" onClick={handleReset}>
                Reset all
            </button>

            <div id="statContainer">{statNames.map(statMap)}</div>
            <p id="numStats">
                Number of Stats:{" "}
                <span style={{ color: getColor() }}>{numStats}</span>
            </p>
            <p>additional stats: green = 1    blue = 2    purple = 3   yellow = 4</p>
            {/* <img className="icon" src="https://static.wikia.nocookie.net/leagueoflegends/images/1/17/Health_icon.png"></img> */}

            <h2>Starter</h2>
            {starter.map(callMap)}
            <br></br>
            <h2>Boots</h2>
            {boots.map(callMap)}
            <br></br>
            <h2>Basic</h2>
            {basic.map(callMap)}
            <br></br>
            <h2>Epic</h2>
            {epic.map(callMap)}
            <br></br>
            <h2>Legendary</h2>
            {legendary.map(callMap)}
        </>
    );
}

export default App;
