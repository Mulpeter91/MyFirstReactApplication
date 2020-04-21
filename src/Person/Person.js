import React from 'react';
//mport Radium from 'radium';
//import Styled from 'styled-components';
//import './Person.css';
import styles from './Person.module.css';

//This is a stateless componement because it does not include or manage 'state'
//They are also called dump or presentational components
//You should try to maximize stateless components over stateful components. A lot of states becomes difficult to manage.
//They are also called smart of container components.


// the sytled component contains all html elements as a method 
// this use of back tick replacing parenthesis is for ES6 to create tagged template literals
// automatically creates class names on the client side form the styled-components library
// const StyledDiv = Styled.div`
//     width: 60%;
//     margin: 16px auto;
//     border: 1px solid #eee;
//     box-shadow: 0 2px 3px #ccc;
//     padding: 16px;
//     text-align: center;        

//     @media (min-width: 500px) {               
//         width: 450px;
//     }
// `;

//component files and folders get a capital letter.
//properties should always be named 'Props'
const person = (props) => {
    // const style = {
    //     //this is understood by Radium
    //     '@media(min-width: 500px)':{
    //         width: '450px'
    //     }
    // }
    return (
        
        //<StyledDiv>
        <div className={styles.Person}> 
            <p onClick={props.click}>Name: {props.name} | Age: {props.age}</p>
            <p>{props.children}</p>  
            {/* Here I want pass the name from the UI with a method passed down from the App smart component*/}
            <input type="text" onChange={props.changed} value={props.name}/>
            <p onClick={props.delete}>X</p>
        </div>
        //</StyledDiv>
    )
};

export default person;
//export default Radium(person);