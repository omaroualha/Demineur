import React from 'react';
import glamorous from 'glamorous';

const Message = props => {
    const Looser = glamorous.h1({ color: "red" })
    const Winner = glamorous.h1({ color: "green" })


    if (props.status === "running" || props.status === "wating") {
        return (
            <div className="message">
                <h1>You need 45 points!!</h1>

            </div>
        );

    }


    else if (props.status === "winner") {
        return (
            <div className="message">
                <Winner>YOU WIN!!</Winner>
            </div>
        );

    }
    else {
        return (
            <div className="message">
                <Looser>You loose!</Looser>

            </div>
        );

    }

};

export default Message;