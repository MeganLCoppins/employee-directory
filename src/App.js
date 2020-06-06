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
        dob: moment(user.dob.date).format("MM/DD/YYYY"),
        id: user.registered.date
      }));
      const sortname = users.sort((a, b) =>
        a.fullname.localeCompare(b.fullname)
      );
      this.setState({ results: sortname });
    });
  }

  // function to handle on click event of up arrow(sort names A-Z)
  onSortUp = () => {
    const sortUp = this.state.results.sort((a, b) =>
      a.fullname.localeCompare(b.fullname)
    );

    this.setState({
      results: sortUp
    });
  };

  // function to handle on click event of down arrow(sort names Z-A)
  onSortDown = () => {
    const sortDown = this.state.results.sort((a, b) =>
      b.fullname.localeCompare(a.fullname)
    );

    this.setState({
      results: sortDown
    });
  };

  // function to handle search input
  handleInputChange = e => {
    // preventing user from entering employee name with capital letters
    const { name, value } = e.target;
    this.setState({
      [name]: value.toLowerCase()
    });
  };

  render() {
    return (
      <div id="container">
        <div>
          <Header></Header>
        </div>
        <div className="row" id="form">
          <form className="form-inline">
            <div className="form-group">
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Search By Name"
                onChange={this.handleInputChange}
                value={this.state.search}
              />
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col" id="tableDiv" size="md-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>
                    Name
                    <button onClick={this.onSortUp}>
                      <span role="img" aria-label="UpArrow" idname="upBtn">
                        ⬆️
                      </span>
                    </button>
                    <button onClick={this.onSortDown}>
                      <span role="img" aria-label="DownArrow" idname="downBtn">
                        ⬇️
                      </span>
                    </button>
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
                      id={result.id}
                      key={result.id}
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
