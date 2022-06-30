import React from "react";

export default class BalanceScreen extends React.Component{
    constructor(props){
        super(props);
        this.getStyle = this.getStyle.bind(this);

    }

    getStyle(){
        if (this.props.balance > 0){
            return {color:"lime"}
        }
        else if(this.props.balance < 0){
            return {color:"red"}
        }
    }

    render(){
        return <h1>Your Balance is: <div style={this.getStyle()}>{this.props.balance}</div></h1>
    }
}