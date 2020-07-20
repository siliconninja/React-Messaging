import React, { useState, useEffect } from "react"

class MessageList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onNewMsgFunc();
        console.log(this.props.data.messages.nodes.length)
    }

    render() {
        return (
            <>
            {/* note, the ( is the same thing as just {return (stuff...)} */ }
            {
                // need to use WHATEVER'S PASSED IN to the component, NOT WHAT'S IN THE PROPS!!! THAT FORCES IT TO NOT CHANGE upon re-rendering
                //  UNLESS YOU ACTUALLY CHANGE THE STATE!!! and so causes more code duplication to update the state, etc/
                // https://github.com/trojanowski/react-apollo-hooks/issues/158#issuecomment-490763073
                // I don't store return data from query to react state. I just feel like that's an anti-pattern. You should just use the returned data as it is like below:
                this.props.data.messages.nodes.map((value, index) => (
                        <tr key={value.id.toString()}>
                            <td key={value.id.toString() + "email"}>{value.email}</td>
                            <td key={value.id.toString() + "msg"}>{value.message}</td>
                        </tr>
                ))
            }
            <p>Random number (re-render, come on): {Math.random()}</p>
            </>
        );
    }
};
export default MessageList;