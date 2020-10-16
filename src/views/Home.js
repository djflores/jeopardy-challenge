import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.scss';

const Home = (props) => {
    const history = useHistory();
    const [categoryCount, setCategoryCount] = useState(0);
    const [clueCount, setClueCount] = useState(0);

    const handleSubmit = () => {
        if (categoryCount > 0 && clueCount > 0) {
            history.push({
                pathname: '/board',
                state: { categoryCount: categoryCount, clueCount: clueCount },
            });
        }
    };
    const handleInputChange = (e) => {
        const input = e.target.name;

        switch (input) {
            case 'categories':
                setCategoryCount(parseInt(e.target.value));
                break;
            case 'clues':
                setClueCount(parseInt(e.target.value));
                break;
            default:
                break;
        }
    };
    return (
        <div className="Home">
            <h2>Jeopardy!</h2>
            <input type="number" placeholder="Number of Categories" onChange={handleInputChange} name="categories" />
            <input type="number" placeholder="Number of Clues" onChange={handleInputChange} name="clues" />
            <button onClick={handleSubmit}>Create</button>
        </div>
    );
};

export default Home;
