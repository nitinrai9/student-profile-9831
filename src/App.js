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
   

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
       
        <div>


          {itemArray.map((item) => (
            
            <div class="row add-pad">
              {/* <li key={item.id}> */}
              <div class="col-2 col-sm-2 col-md-2 col-lg-2 profile-image">
                <img src={item.pic} class="image-height" />
              </div>
                  <div class=" col-10 col-sm-10 col-md-10 col-lg-10">
                    <div class="row"><div class="col-md-12"><h1 class="profile-name">{item.firstName} {item.lastName} </h1></div></div>
                    <div class="row indent-row"><div class="col-md-12">Email {item.email} </div></div>
                    <div class="row indent-row"><div class="col-md-12">Company {item.company} </div></div>
                    <div class="row indent-row"><div class="col-md-12">Skill {item.skill} </div></div>
                    <div class="row indent-row"><div class="col-md-12">Average {item.grades.reduce((sum, curr) => sum + Number(curr), 0) / item.grades.length}%</div></div>
                  </div>
              {/* </li> */}
              
            </div>
            
            
          ))}
              

        </div>
        
      
      );
    }
  }
}


export default MyComponent;
