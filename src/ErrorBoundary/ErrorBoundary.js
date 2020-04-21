import React, { Component } from 'react';

//ErrorBoundary is considered a higher order boundary
//Only use error boundaries around code where it's out of your control. Such as a dependancy
//Don't just use it anywhere! 
class ErrorBoundary extends Component{
    state = {
        hasError: false, 
        errorMessage: ''
    }

    //built in method
    componentDidCatch = (error, info) => {
        this.setState({
            hasError: true, 
            errorMessage: error
        })
    }

    render(){
        if(this.state.hasError){
            return<h1>{this.state.errorMessage}</h1>
        } else {
            //This child will be the content later wrapped within the errorboundary component
            return this.props.children;
        }  
    }
}

export default ErrorBoundary