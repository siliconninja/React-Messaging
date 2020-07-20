import React, { useState, useEffect } from "react"

const MessageList = (props) => {
    // console.log(props)
    const [dataStuff] = useState(props); // have to use square brackets to get the 0'th element out of React's weird array if we use useState.
    // The reason for this is because you can SET STATE with the first thing in the array, and just access it with the 0'th thing. That's just the way function components work.
    // (thought of this upon seeing 2) First render in https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)
    // console.log(dataStuff.test)

    // MessageList used [USE EFFECT]!
    // It's super effective!
    useEffect(() => {
        // Effectful code is super duper effective! +MAX HP
        dataStuff.onNewMsgFunc();
    });

    return (
        <>
        {/* note, the ( is the same thing as just {return (stuff...)} */ }
        {
            dataStuff.data.messages.nodes.map((value, index) => (
                <>
                    <tr key={value.id.toString()}>
                        <td key={value.id.toString() + "email"}>{value.email}</td>
                        <td key={value.id.toString() + "msg"}>{value.message}</td>
                    </tr>
                </>
            ))
        }
        </>
    );
};
export default MessageList;