import React from "react"
// import { Link } from "gatsby"

// React-Bootstrap imports
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"

import "bootstrap/dist/css/bootstrap.min.css"

// === SEPARATE COMPONENTS ===
// import Layout from "../components/layout"
import Header from "../components/header"
import MessageSendingThing from "../components/messageSendingThing"
import Image from "../components/image"
import Test from "../components/test"
// import SEO from "../components/seo"

import "../css/custom.css"

// Apollo imports
import { gql, ApolloClient, InMemoryCache } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
import { ApolloProvider } from "@apollo/react-hooks"
import { createHttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"

// Apollo helper functions, thanks apollo :)
import { split } from "apollo-link"
import { getMainDefinition } from "apollo-utilities"
import { useSubscription, useQuery } from "@apollo/react-hooks"

import { Component } from "react"

// https://www.apollographql.com/docs/react/data/subscriptions/#client-setup
const httpLink = createHttpLink({ uri: "http://localhost:5000/graphql" })

// The backend (running on PostGraphile) uses websockets for subscriptions.
const wsLink = new WebSocketLink({
    uri: `ws://localhost:5000/graphql`,
    options: {
        reconnect: true,
    },
})

const apClient = new ApolloClient({
    link: split(
        // split based on operation type
        ({ query }) => {
            const definition = getMainDefinition(query)
            return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
            )
        },
        wsLink,
        httpLink
    ),
    cache: new InMemoryCache(),
})

// apClient.query({query: gql`
// {
//   messages {
//     nodes {
//       nodeId
//       id
//       email
//       message
//     }
//   }
// }
// `}).then(result => console.log(result))

const IndexPage = () => {
    // should only have access to GATSBY_* variables, not the whole process.env so just getting {} is expected
    // console.log(process.env)

    return (
        <>
            <ApolloProvider client={apClient}>
                <Header />
                <MessageSendingThing />
            </ApolloProvider>
        </>
    )
}

export default IndexPage
