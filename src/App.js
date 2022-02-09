import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
   
  }

  componentDidMount() {
    fetch("https://api.hatchways.io/assessment/students")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const itemArray = items.students;
    // const avg = itemArray.grades.reduce((sum, curr) => sum + Number(curr), 0) / itemArray.grades.length;
    // console.log(items);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {itemArray.map((item) => (
            <li key={item.id}>
              <img src={item.pic} />
              {item.firstName} {item.lastName}
              Email {item.email}
              Company {item.company}
              Skill {item.skill}
              
              Average {item.grades.reduce((sum, curr) => sum + Number(curr), 0) / item.grades.length}
    
            </li>
          ))}
        </ul>
      );
    }
  }
}


export default MyComponent;
