import React from 'react';
import Header from './components/Header/index.js';
import API from "./utils/API.js";
// import './App.css';

class App extends React.Component {
  state = {
    results: []
  }

    componentDidMount() {
      API.getEmployees()
      .then(({data}) => {
        // full name
        // image
        // email
        // phone number
        // dob
        const users = data.results.map(user=> ({
          fullname: `${user.name.first} ${user.name.last}`,
          image: user.picture.medium,
          email: user.email,
          phone: user.phone,
          dob: user.dob.date
        }))
        this.setState({ results: users })
      })
    }

            /* Inside of the `render` method, map over `this.state.friends` to render each `FriendCard` component. */
            // {this.state.friends.map(friend =>(      <FriendCard
            //   name={friend.name}
            //   image={friend.image}
            //   occupation={friend.occupation}
            //   location={friend.location}
            //   id={friend.id}
            //   key={friend.id}
            //   handleClick={this.removeFriend}
            // />))}

  render(){
    return(
      <div>
        <Header></Header>
      </div>
    )
  }
}

export default App;
