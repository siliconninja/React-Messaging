import React, { useState, useEffect } from "react"

const MessageList = (props) => {
    // console.log(props)
    //const [dataStuff, setDataStuff] = useState(props); // have to use square brackets to get the 0'th element out of React's weird array if we use useState.
    // The reason for this is because you can SET STATE with the first thing in the array, and just access it with the 0'th thing. That's just the way function components work.
    // (thought of this upon seeing 2) First render in https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)
    // console.log(dataStuff.test)

    // MessageList used [USE EFFECT]!
    // It's super effective!
    // useEffect(async () => {
    //     // Effectful code is super duper effective! +MAX HP
    //     const newMessage = await dataStuff.onNewMsgFunc();
    //     console.log(newMessage)
    // });  
    useEffect(() => {
        props.onNewMsgFunc();
        console.log(props.data.messages.nodes.length)
    }  )

    return (
        <>
        {/* note, the ( is the same thing as just {return (stuff...)} */ }
        {
            // need to use WHATEVER'S PASSED IN to the component, NOT WHAT'S IN THE PROPS!!! THAT FORCES IT TO NOT CHANGE upon re-rendering
            //  UNLESS YOU ACTUALLY CHANGE THE STATE!!! and so causes more code duplication to update the state, etc/
            // https://github.com/trojanowski/react-apollo-hooks/issues/158#issuecomment-490763073
            // I don't store return data from query to react state. I just feel like that's an anti-pattern. You should just use the returned data as it is like below:
            props.data.messages.nodes.map((value, index) => (
                    <tr key={value.id.toString()}>
                        <td key={value.id.toString() + "email"}>{value.email}</td>
                        <td key={value.id.toString() + "msg"}>{value.message}</td>
                    </tr>
            ))
        }
        <p>Random number (re-render, come on): {Math.random()}</p>
        </>
    );
};
export default MessageList;