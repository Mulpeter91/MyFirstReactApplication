// start by installing the react developer tools into chrome

import React, {Component} from 'react';
// import React, {useState} from 'react'; //required import for hooks
//import './App.css';
import classes from './App.module.css'; //this creates css modules. Added as part of React 2.0. The idea is when a class 'button' is brought forward it will be given a unique class name and so won't conflict with another 'button' class on another css file.
//import Radium, { StyleRoot } from 'radium';
//import Styled from 'styled-components';
import Person from './Person/Person.js';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

//this relates to the style-component package
//the props is automatically passed to the button 'function' 
//the styled-component package also understand the injection of a funtion inside the template literal
//however, mixiing css into the js file slows the render of the js file slightly
// const StyledButton = Styled.button`
//   background-color: ${props => props.madeUpPropName ? 'red' : 'green'};
//   color: white;
//   font: inherit;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${props => props.madeUpPropName ? 'salmon' : 'lightgreen'};; 
//     color: black;
//   }
// `;

//classes get capital letters
//functions get lower case letters
class App extends Component {

  state = {
    persons: [
      { id: '1', name: 'Timmy', age: 28 }, 
      { id: '2', name: 'Rob', age: 29}, 
      { id: '3', name: 'Mimmo', age: 40}, 
      { id: '4', name: 'Robbie', age: 70}
    ], 
    otherState: 'some other value', 
    showPersons: false
  };

  switchNameHandler = newName => {
    //console.log('Interaction');
    //DON'T DO THIS: this.state.persons[0].name = 'eddie';
    //Since 16.8 setState was the only way to access states, which required the extension of component
    //Now you can access state through functional components with React Hooks
    //Still unknown if this will actually take over from setStates and class components
    this.setState({persons: [
      { name: newName, age: 28 }, 
      { name: 'Rob', age: 29}, 
      { name: 'Mimmo', age: 27}, 
      { name: 'Robbie', age: 70}
    ]});
  };

  nameChangedHandler = (event, id) => {
    //we could have passed the index directly but we're making us of the Id property already present
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    //creating a new object with information of the old object
    const person = {
      ...this.state.persons[personIndex]
    };

    //an older method which is just as good
    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    //updated persons array
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  };

  // nameChangedHandler = (event) => {
  //   this.setState({persons: [
  //     { name: event.target.value, age: 31 }, 
  //     { name: 'Rob', age: 41}, 
  //     { name: 'Max', age: 51}, 
  //     { name: 'Robbie', age: 61}
  //   ]});
  // };

  deletePersonHandler = (index) => {

    //this is actually a poor way of isolating the object as it copies the reference, not the object
    //state should be updated in an immutable fashion
    //On larger apps this can lead to unpredictable behaviour
    //const persons = this.state.persons;

    //Instead you want to COPY the object with either and empty splice:
    //const persons = this.state.persons;

    //Or use the ES6 spread operator
    //it spreads out the elements within state.persons and adds them to a new array
    //This is more modern.
    const persons = [...this.state.persons];

    persons.splice(index, 1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  };

  //a class must contain a render call
  //when the state changes everything inside render is executed.   
  //inline styles can't do things like 'hover' so a package was installed to handle this: Radium
  //Radium is a popular React package that allows inline pseudo selectors and media queries.
  render(){
    // const style = {
    //   backgroundColor: 'green', 
    //   color: 'white',
    //   font: 'inherit', 
    //   border: '1px solid blue',
    //   padding: '8px', 
    //   cursor: 'pointer', 
    //   //This comes from Radium:
    //   ':hover': {
    //     backgroundColor: 'lightgreen', 
    //     color: 'black'
    //   }
    // };

    console.log(classes);

    //let personsHardCoded = null;
    let personsLooped = null;
    let btnClass = [classes.button];

    //if statement can be used here because it's not inside the JSX
    if(this.state.showPersons){
      // personsHardCoded = (
      //     <div>
      //           <h4>Person List controlled by traditional if-else statement with hard coded objects</h4>
      //           <Person 
      //             name={this.state.persons[0].name} 
      //             age={this.state.persons[0].age}
      //             changed={this.nameChangedHandler}/>
      //           <Person 
      //             name="Conor" 
      //             age="27"
      //             click={this.switchNameHandler.bind(this, 'Karl_2')}/>           
      //           <Person 
      //             name={this.state.persons[2].name} 
      //             age={this.state.persons[2].age}
      //             >Hobbies: Playstation</Person>
      //           <Person 
      //             name={this.state.persons[3].name}  
      //             age={this.state.persons[3].age}/>
      //         </div> 
      //   );

      personsLooped = (
        <div>
            <h4>Persons List done with a mapping(loop)</h4>
            {
              //person is an alias for the objects in persons (like a foreach loop)
              //index is a built in parameter
              this.state.persons.map((person, index) => {
                return <ErrorBoundary
                key = {person.id} //the key was moved from Person to ErrorBoundary because map needs to see it on the outer component
                >
                  <Person 
                    delete = {() => this.deletePersonHandler(index)}
                    name = {person.name}
                    age = {person.age}
                    //React will throw console errors when you don't include keys in a list. 
                    //Why? because React effectively maintains a virtual DOM where is compares the current DOM to the output of the render method
                    //For lists, it then needs to figure out which elements have changed. If it can't figure identity each item then the default is to rerender the entire list, the longer the list the more inefficient
                    //Assigning keys will allow React to compare the present with the future for each specific item. 
                    //key = {person.id} //the key could be anything unique, preferabley some id from a DB
                    changed = {(event) => this.nameChangedHandler(event, person.id)} 
                  />
                </ErrorBoundary>
              })
            }
          </div>
      );

      //remember when implementing css modules the properties are case sensitive: red vs Red
      btnClass.push(classes.Red);  

      //dynamic styling. Changes the backgroundcolor on toggle
      // style.backgroundColor = 'red';
      // This hover is handled by Radium
      // style[':hover'] = {
      //   backgroundColor: 'salmon', 
      //   color: 'black'
      // }
    }

    //these are the class names from the css file
    //let assignedClasses = ['red', 'bold'].join(' '); //= 'red bold'
    const assignedClasses = [];
    if (this.state.persons.length <= 2){
      //assignedClasses.push('red'); // classess = ['red']
      assignedClasses.push(classes.red);
    }
    if(this.state.persons.length <= 1){
      //assignedClasses.push('bold'); // classess = ['red', 'bold']
      assignedClasses.push(classes.bold);
    }

    const rnd = Math.random();
    if (rnd > 0.75){
      throw new Error('this is a demo error');
    }

    return (
      //this is not html but JSX
      //styleroot is a Radium export and is needed for understanding tranforming selectors like media-queries
      // <StyleRoot> </StyleRoot>
        <div className={classes.App}>
            <h1>React</h1>
            {/* you need to pass the class as a string, join turns the array type into a string type */}
            <p className={assignedClasses.join(' ')}>This is a list of Objects</p>
            {/* Using the arrow function implicity puts a 'return' after the arrow when all in one line, the alternative it to wrap the body in curly braces. */}
            {/* Adding the parentheses is this case won't execute the function. It will pass as an anayonmous function and excute on click and return the result */}
            {/* However, React still has a chance to rerender code differently. So always try to use 'bind' over the arrow function approach. It's alos less efficient */}
            {/* <button 
              style ={style}
              onClick={() => this.switchNameHandler('Karl_1')}>Switch Name</button>  */}
            {/* Adding the parentheses would cause the method to execute immediately */}
            {/* <button onClick={this.switchNameHandler}>Switch Name</button>  */}  
            <button 
              className={btnClass.join(' ')}
              onClick={this.togglePersonsHandler}>Toggle Persons
            </button>           
            {/* <StyledButton madeUpPropName={this.state.showPersons} onClick={this.togglePersonsHandler}> 
                Toggle Persons
            </StyledButton>*/}
            {/* <button 
              style ={style}
              onClick={this.togglePersonsHandler}>Toggle Persons
            </button>  */}
            {
              personsLooped
            } 
            {/* { // traditional if statements won't work. You need to use ternary operators for jsx
              this.state.showPersons  ? 
                <div>
                  <h4>Person List controlled by the ternary condition</h4>
                  <Person 
                    name={this.state.persons[0].name} 
                    age={this.state.persons[0].age}
                    changed={this.nameChangedHandler}/>
                  <Person 
                    name="Conor" 
                    age="27"
                    click={this.switchNameHandler.bind(this, 'Karl_2')}/>           
                  <Person 
                    name={this.state.persons[2].name} 
                    age={this.state.persons[2].age}
                    >Hobbies: Playstation</Person>
                  <Person 
                    name={this.state.persons[3].name}  
                    age={this.state.persons[3].age}/>
                </div> : null
            } 
            {
              personsHardCoded
            }        */}        
        </div>
    );
    // It is a common design to pass methods that access state from the smart to the dump component
    // Behind the scenes, JSX is converted into the below javaScript:
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Working!'));
  }  
}

//Wrapping your app export in Radium, which is a 'higher order component'
//It's effectively a component wrapped in another to add some additional functionailty with new syntax
//export default Radium(App);
export default App;

//---------------------------------------------------------------------- THIS IS THE SAME CLASS ----------------------------------------------------------------
//-------------------------------------------------------------- BUT CONVERTED TO A FUNCTIONAL COMPONENT -------------------------------------------------------
//------------------------------------------------------------------------ AND USING HOOKS ---------------------------------------------------------------------

// const app = props => {
//     const [ personState, setPersonState ] = useState({ //useState is a hook. It has 2 elements, the state itself and the ability to change that state
//       //assigning them values on the left of the equals sign allows you to access them in the array.
//       persons: [
//         { name: 'Timmy', age: 28 }, 
//         { name: 'Rob', age: 29}, 
//         { name: 'Mimmo', age: 40}, 
//         { name: 'Robbie', age: 70}
//       ], 
//       otherState: 'some other value'
//     });

//     //Doing this means it won't be overriden by the setPersonState call (if not included manually)
//     //hooks can use the useState multiple times
//     const [otherState, setOtherState ] = useState({test: 'this is another value'});

//     //view what's inside it
//     console.log(personState, otherState);

//     //Not often to have functions inside functions but for reach hooks you need it
//     //IMPORTANT: When using setState, it OVERRIDES the current state. It does not merge it like in a class. Therefore 'otherState' will be removed
//     const switchNameHandler = () => {
//       setPersonState({persons: [
//         { name: 'Karl', age: 28 }, 
//         { name: 'Rob', age: 29}, 
//         { name: 'Mimmo', age: 27}
//       ]});
//     };

//     return (
//       <div className="App">
//           <h1>Rob</h1>
//           <p>This is finally working</p>
//           <button onClick={switchNameHandler}>Switch Name</button>
//           <Person name={personState.persons[0].name} age={personState.persons[0].age}/>
//           <Person name="Conor" age="27"/>
//           <Person name={personState.persons[2].name} age={personState.persons[2].age}>Hobbies: Playstation</Person>
//       </div>
//     );
// }  

// export default appWithHook
