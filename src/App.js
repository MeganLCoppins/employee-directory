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
                onChange={this.handleInputChange}
                value={this.state.search}
              />
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th idName="th1">Name</th>
                  <th idName="th2">Email</th>
                  <th idName="th3">Phone</th>
                  <th idName="th4">DOB</th>
                </tr>
              </thead>
              <tbody>
                {this.state.results
                  .filter(employee =>
                    employee.fullname.toLowerCase().includes(this.state.search)
                  )
                  .map(result => (
                    <Table
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
