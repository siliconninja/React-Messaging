// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

// React-Bootstrap imports
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"

// Gatsby imports
// import { useStaticQuery, graphql } from "gatsby"

// Apollo imports
import { gql, ApolloClient, InMemoryCache } from "apollo-boost"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { createHttpLink } from "apollo-link-http"

// const addMessageQuery = gql`
// mutation AddMessage(em: String!, ms: String!) {
//     createMessage(
//       input: {
//         message: {
//           email: em
//           message: ms
//         }
//       }
//     )
// }`

// running apollo queries.
// const addMessageQuery = gql`
// mutation {
//     createMessage(
//       input: {
//         message: {
//           email: "%s"
//           message: "%s"
//         }
//       }
//     )
// }`
const addMessageQuery = gql`
    mutation AddMessage($em: [String]!, $ms: [String]!) {
        createMessage(input: { message: { email: $em, message: $ms } }) {
            message {
                id
                email
                message
            }
        }
    }
`

// https://github.com/apollographql/apollo-client/issues/3639#issuecomment-627491262

// convert it to a function component because we need the useStaticQuery hook, and we can't use any hooks in classes
const MessageSendingThing = () => {
    const [stateJson, setStateJson] = useState({ email: "", message: "" })
    const [addMsg, { data }] = useMutation(addMessageQuery)

    // Shamelessly inspired by https://reactjs.org/docs/forms.html but without the godawful duplicate code
    // and https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
    const handleSubmit = event => {
        // new mutation with graphql query!
        // useStaticQuery()
        addMsg({ variables: { em: stateJson.email, ms: stateJson.message } })
        event.preventDefault() // don't refresh dat page!
    }

    const handleChange = event => {
        const name = event.target.name
        const value = event.target.value
        setStateJson({ ...stateJson, [name]: value })
        event.preventDefault() // don't clear whatever key was pushed
    }

    return (
        <Container>
            <Row>
                {/* https://react-bootstrap.netlify.app/components/forms/ */}
                <Form id="submitForm" onSubmit={handleSubmit}>
                    <Form.Group controlId="formToSend">
                        <Form.Label>Send to...</Form.Label>
                        {/* STORE THE EMAIL entered IN this.state */}
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formMsg">
                        <Form.Label>Message</Form.Label>
                        {/* STORE THE MESSAGE entered IN this.state */}
                        <Form.Control
                            type="text"
                            placeholder="Message"
                            name="message"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Send
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

// class MessageSendingThing extends React.Component {
//     // we need a constructor for a custom handleSubmit function
//     constructor(props) {
//         super(props);
//         this.handleSubmit = this.handleSubmit.bind(this); // do this bind thing for ALL FUNCTIONS
//         this.state = {email: '', message: ''};
//     }
//    handleSubmit(event) {

//     }

//     // NO DUPLICATE CODE FOR EMAIL AND MESSAGE!!!
//     // handleChangeEmail(event) {
//     //     this.setState({email})
//     //     event.preventDefault(); // don't refresh dat page!
//     // }
//     handleChange = (event) => {

//     }

//     render = () => (

//     );
// }

// Graphile prevents SQL injection on the backend by doing type chekcing.
// But there's still reason to be concerned with their implementation if there are any flaws in it, etc.
// Update or check for new vulns.
// https://github.com/graphile/postgraphile/issues/280
// export const addMessageQuery = graphql`
// mutation {
//     createMessage(
//       input: {
//         message: {
//           email: "%s"
//           message: "%s"
//         }
//       }
//     )
// }` // I feel guilty writing this concatenation but at least this operation is "slightly more secure" because of Graphile backend validation.

// EDIT: there is a way! (and i don't need to use hooks for it!)
// https://www.gatsbyjs.org/docs/static-query/

export default MessageSendingThing
