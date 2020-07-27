import React from "react"
// import { Link } from "gatsby"

// Apollo helper functions, thanks apollo :)
import { navigate } from "gatsby"

import { split } from "apollo-link"
import { getMainDefinition } from "apollo-utilities"
import { useSubscription, useQuery } from "@apollo/react-hooks"

const Login = () => {
    // should only have access to GATSBY_* variables, not the whole process.env so just getting {} is expected
    // console.log(process.env)

    return (
        <>
            <h1>The Login Page<sup>TM</sup></h1>
            <form method="POST" onSubmit = {
                event => {
                    this.handleSubmit(event);
                    navigate(`/app/messages`)
                }}>

                </form>

        </>
    )
}

export default Login
