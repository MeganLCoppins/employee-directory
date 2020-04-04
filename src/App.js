import React from "react";
import moment from "moment";
import Header from "./components/Header/index.js";
import API from "./utils/API.js";
import Table from "./components/Table/index.js";
import "./App.css";


class App extends React.Component {
  state = {
    results: [],
    search: ""
  };

  componentDidMount() {
    API.getEmployees().then(({ data }) => {
      const users = data.results.map(user => ({
        fullname: `${user.name.first} ${user.name.last}`,
        image: user.picture.medium,
        email: user.email,
        phone: user.phone,
        dob: moment(user.dob.date).format("MM/DD/YYYY")
      }));
      this.setState({ results: users });
    });
  }

  handleInputChange = e => {
  // preventing user from entering employee name with capital letters 
    const { name, value } = e.target;
    this.setState({
      [name]: value.toLowerCase()
    });
  };

  render() {
    return (
      <div className="container">
        <div>
          <Header></Header>
        </div>
        <div className="row">
          <form className="form-inline">
            <div className="form-group">
              <input
                type="text"
                name="search"
                placeholder="Search by Name"
                onChange={this.handleInputChange}
                value={this.state.search}
              />
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col" size="md-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>
                    Name
                    <button> ⬇️</button>
                  </th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>DOB</th>
                </tr>
              </thead>
              <tbody>
              {/* filtering employee based on search input */}
                {this.state.results
                  .filter(employee =>
                    employee.fullname.toLowerCase().includes(this.state.search)
                  )
                  .map(result => (
                    <Table
                      photo={result.image}
                      name={result.fullname}
                      email={result.email}
                      phone={result.phone}
                      dob={result.dob}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
