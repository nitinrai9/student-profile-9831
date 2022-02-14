import logo from './logo.svg';
import React, { useEffect, useState, setState } from "react";
import ReactDOM from "react-dom";
import './App.css';


class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      tags:  [],
      value: '',
      textValue:'',
      rowId:''
    };
    this.handleChange = this.handleChange.bind(this);
    
  }

 
    inputKeyDown = (e) => {
      const val = e.target.value;
      const itemId = e.target.id;
      
      
      if (e.key === "Enter" && val !== "") {
        
        // Check if tag already exists
         if (this.state.tags.find(tag => tag.valu.toLowerCase() === val.toLowerCase())) {
           return;
         }
        
        this.setState({ tags: [...this.state.tags, 
          { 
            id:itemId, valu: val
          }
            ]
          });
        // this.setTags({ tags: [...this.state.tags, val]});
        // this.tagInput.value = null;
         e.target.value="";
        }
        console.log(this.state.tags);
    }

  handleChange(event) {
    this.setState({value: event.target.value});
  
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
    const { error, isLoaded, items, value} = this.state;
    var i = 0;
    const itemArray = items.students;
    var rowCount=0;

  
  

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if(this.state.value!='') {
      return (
        
        <div>

            <div class="row textbox-pad">
              <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <form>
                  <div class="form-group">
                    <input type="text" class="filter-content form-control" name="textInput" id="textinput" aria-describedby="" placeholder="Search by name" value={this.state.value} onChange={this.handleChange} ></input>
                  </div>
                </form>
              </div>
            </div>
          {
              
              itemArray.filter(item => (item.firstName+item.lastName).toLowerCase().includes(this.state.value)).map((item) => (
            
            <div class="row add-pad">
              
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
    else{
      return (
                
                 
                
        <div>

            <div class="row textbox-pad">
              <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <form>
                  <div class="form-group">
                    <input type="text" class="filter-content form-control" name="textInput" id="textinput" aria-describedby="" placeholder="Search by name" value={this.state.value} onChange={this.handleChange} ></input>
                  </div>
                </form>
              </div>
            </div>

            <div class="row textbox-pad">
              <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <form>
                  <div class="form-group">
                    <input type="text" class="filter-content form-control" name="textInput" id="textinput" aria-describedby="" placeholder="Search by Tag"  ></input>
                  </div>
                </form>
              </div>
            </div>
          {

                
              
              itemArray.map((item) => (
            
            <div class="row add-pad">
              
              <div class="col-2 col-sm-2 col-md-2 col-lg-2 profile-image">
                <img src={item.pic} class="image-height" />
              </div>
                  <div class=" col-8 col-sm-8 col-md-8 col-lg-8">
                    <div class="row"><div class="col-12 col-sm-12 col-md-12 col-lg-12"><h1 class="profile-name">{item.firstName} {item.lastName} </h1></div></div>
                    <div class="row indent-row"><div class="col-12 col-sm-12 col-md-12 col-lg-12">Email: {item.email} </div></div>
                    <div class="row indent-row"><div class="col-12 col-sm-12 col-md-12 col-lg-12">Company: {item.company} </div></div>
                    <div class="row indent-row"><div class="col-12 col-sm-12 col-md-12 col-lg-12">Skill: {item.skill} </div></div>
                    <div class="row indent-row"><div class="col-12 col-sm-12 col-md-12 col-lg-12">Average: {item.grades.reduce((sum, curr) => sum + Number(curr), 0) / item.grades.length}%</div></div>
                    <div class="row indent-row"><div class="col-12 col-sm-12 col-md-12 col-lg-12">
                    
                    { this.state.tags.map((tag, i) => (
                           
                            <div>
                              {item.id==tag.id?tag.valu:''}
                              
                            </div>
                            
                          ))}

                      </div></div>
                    <div class="row indent-row"><div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        
                            <div class="form-group">
                                  <input type="text" class="add-tag form-control" name="addTagInput" id={item.id} aria-describedby="" placeholder="Add a tag"  onKeyDown={this.inputKeyDown} ></input>
                            </div>
                        
                    </div>
                  </div>
                    
                    <div class="row indent-row"> 
                        <div id={item.id} class="col-md-12 collapse">
                                  <ul class="grades-css">
                                    {item.grades.map(grade => 
                                  
                                        <li>Test {i=i+1} &nbsp;&nbsp;&nbsp;&nbsp;{grade}%</li>)}
                                        <p hidden>{i=0}</p> 
                                  </ul>
                        </div>
                    </div>
                  </div>
                  <div class="col-2 col-sm-2 col-md-2 col-lg-2">
                    <div class="row">
                      <div class="col-12 col-sm-12 col-md-12 col-lg-12"> 
                          <button type="button" class="glyphicon glyphicon-plus plus-button" data-toggle="collapse" data-target={"#"+item.id}></button>
                      </div>
                    </div>
                  </div>
              
              
            </div>
            
            
          ))}
              

        </div>
        
      
      );
    }
  
  }
}


export default MyComponent;
