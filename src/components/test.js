import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const EXCHANGE_RATES = gql`
    {
        messages {
            nodes {
                nodeId
                id
                email
                message
            }
        }
    }
`

function Test() {
    const { loading, error, data } = useQuery(EXCHANGE_RATES)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    console.log(data)

    return <p>Done</p>
}

export default Test
