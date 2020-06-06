import React from "react";

function Table(props){
    return (
        <tr>
            <td><img src={props.photo} alt={props.name}/></td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>{props.dob}</td>
        </tr>
    )
}

export default Table;