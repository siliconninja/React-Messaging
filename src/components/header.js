import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect } from "react"

// React-Bootstrap imports
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

// Component imports
import MessageList from '../components/messageList'

// Gatsby imports
import { useStaticQuery, graphql } from "gatsby"

// Apollo imports
import { gql, ApolloClient, InMemoryCache } from "apollo-boost";
import { useSubscription, useQuery } from '@apollo/react-hooks';

// class Header extends React.Component {
  
//   constructor(props) {
//     super(props);
//     // this.state = {data: useStaticQuery(getMessagesQuery)};
//   }

//   render = () => {
//     return (
//       <>
//         <h1>Messages of {process.env.GATSBY_TEST_USERNAME}</h1>
//         <Container>
//           <Row>
//             <Table responsive>
//               <thead id="cool_header">
//                 <tr>
//                   <th>EMAIL</th>
//                   <th>MESSAGE</th>
//                 </tr>
//               </thead>
//               <tbody>
//                   {/* note, the ( is the same thing as just {return (stuff...)} */}
//                   {this.state.data.messagesApi.messages.nodes.map((value, index) => (
//                     <>
//                     <tr>
//                     <td>1</td>
//                     <td>Table cell</td>
//                     </tr>
//                     </>
//                   ))}
//               </tbody>
//             </Table>
//           </Row>
//           </Container>
//       </>
//     );
//   };
// }

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

// INFO this query will get run on the *backend*
const getMessagesQuery = gql`
query b {
  messages {
    nodes {
      nodeId
      id
      email
      message
    }
  }
}
`;

const getMessagesSubscription = gql`
subscription {
  listen(topic: "onNewMessage") {
    relatedNodeId
    relatedNode {
      nodeId
      ... on Message {
        id
        email
        message
        __typename
      }
      __typename
    }
  }
}`;

const onNewMessage = (data) => {
  console.log(data)
}

const Header = () => {
  // can only use hooks inside of one function thing apparently (not a component class?!)
  // it's a const because data is ONLY fetched AT THE TIME OF *CREATING (and updating)* THE (Header) COMPONENT
  // const {data, loading} = useSubscription(getMessagesSubscription, {onSubscriptionData: onNewMessage});

  const {loading, error, subscribeToMore, ...data} = useQuery(getMessagesQuery);
//   const subscriptionDataAndInfo = useSubscription(getMessagesSubscription);

  // this helped explain what loading and error are: https://www.youtube.com/watch?v=8uU6IHMBDao
  // (and this does too: https://www.apollographql.com/docs/react/data/queries/#executing-a-query)
  if(loading) return <p>Loading!!!</p>;
  else if(error) return <p>Error :(</p>;
  return (
    <>
      <h1>Messages of {process.env.GATSBY_TEST_USERNAME}</h1>
      <Container>
        <Row>
          <Table responsive>
            <thead id="cool_header">
              <tr>
                <th>EMAIL</th>
                <th>MESSAGE</th>
              </tr>
            </thead>
            <tbody>
               <MessageList {...data} test="this@should.not.be.a.bunch.of.props.in.a.list" onNewMsgFunc={() => {
                   subscribeToMore({
                       document: getMessagesSubscription,
                       updateQuery: (prev, { subscriptionData }) => {
                           console.log(prev)
                           console.log(subscriptionData)

                            if(!subscriptionData.data) return prev;
                            const newMessage = subscriptionData.data.listen.relatedNode;
                            console.log(prev.messages.nodes)
                            // copy the new message to the INTERNAL DATA OBJECT stored inside the component to show it. (Apollo docs say it does this by refreshing its cached version)
                            // "The return value of this function *completely replaces* the current cached result for the query." - https://www.apollographql.com/docs/react/data/subscriptions/
                            return Object.assign({}, prev, {
                                messages: {
                                    nodes: [...prev.messages.nodes, newMessage],
                                    __typename: prev.messages.__typename
                                }
                            })
                        }
                   })
               }} />
            </tbody>
          </Table>
        </Row>
        </Container>
    </>
  );
}


export default Header;