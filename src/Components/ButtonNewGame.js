import React from 'react';

const ButtonNewGame = (props) => {

    return (
        <div className="reset">
            <button onClick={props.refresh}>New Game</button>

        </div>
    );
};

export default ButtonNewGame;