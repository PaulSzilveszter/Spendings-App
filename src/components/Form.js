import React from "react";

import "../styles/Form.css";
import BalanceScreen from "./BalanceScreen";



let incomeArray = [];
let spendingsArray = [];

//storage functions

function formatLocalStorage() {

    if (localStorage.getItem("incomeArray") === null || localStorage.getItem("spendingsArray") === null) {

        const iA = JSON.stringify(incomeArray);
        const sA = JSON.stringify(spendingsArray);

        localStorage.setItem("incomeArray", iA);
        localStorage.setItem("spendingsArray", sA);

    }

    incomeArray = JSON.parse(localStorage.getItem("incomeArray"));
    spendingsArray = JSON.parse(localStorage.getItem("spendingsArray"));

    console.log("The data in the local storage at the beggining is: ");

    console.log("Income Array: ", incomeArray);
    console.log("Spendings Array: ", spendingsArray);

}

function addDataToLocalStorage() {
    const iA = JSON.stringify(incomeArray);
    const sA = JSON.stringify(spendingsArray);

    localStorage.setItem("incomeArray", iA);
    localStorage.setItem("spendingsArray", sA);

    console.log("Added some data to the local storage!");

    console.log("Income Array: ", incomeArray);
    console.log("Spendings Array: ", spendingsArray);
}

function showLocalStorageData(){
    console.log("Showing the data from the local storage");

    console.log("Income Array: ", incomeArray);
    console.log("Spendings Array: ", spendingsArray);
}

function clearLocalStorage() {
    localStorage.clear();
    
    incomeArray=[];
    spendingsArray=[];
    formatLocalStorage();

    console.log("The local storage was cleared!");
}
//balance functions

function getIncome(){
    let sum = 0;

    for(const income of incomeArray){
        sum+= parseInt(income.incomeAmount);
    }

    return sum;
}

function getSpendings(){
    let sum = 0;

    for(const spending of spendingsArray){
        sum+= parseInt(spending.spendingAmount);
    }

    return sum;
}

formatLocalStorage();


export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.getBalance = this.getBalance.bind(this);
        this.switchScreens = this.switchScreens.bind(this);
        this.render = this.render.bind(this);
    }

    state = {
        screenType: "addIncome",//or addSpending
        //For adding income
        incomeAmount: 0,
        //For adding spendings
        spendingName: "",
        spendingAmount: 0,
        spendingCategory: "",
        // 
        spendingsHistory: spendingsArray,
        incomeHistory: incomeArray,
        //
        balance: 0
    }

    //
    componentDidMount(){
        this.getBalance();
    }
    //balance functions

    getBalance(){
        let balance = getIncome()-getSpendings();
        
        this.setState({balance: balance});
    }


    switchScreens() {
        if (this.state.screenType === "addIncome") {
            this.setState({ screenType: "addSpending" });
        }
        else {
            this.setState({ screenType: "addIncome" });
        }

        console.log("Switching screens...")
    }

    handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.screenType === "addIncome") {
            incomeArray.push({ incomeAmount: this.state.incomeAmount });

            this.setState({ incomeHistory: incomeArray });
        }
        else {
            const s = this.state;

            spendingsArray.push({ spendingName: s.spendingName, spendingAmount: s.spendingAmount, spendingCategory: s.spendingCategory });

            this.setState({ spendingsHistory: spendingsArray });
        }
        addDataToLocalStorage();

        this.getBalance();

        console.log("Current state: ", this.state);
    }

    render() {

        const spendingScreen = (<form onSubmit={this.handleSubmit}>
            <input type="text" name="spendingName" id="spendingName" value={this.state.spendingName} onChange={this.handleChange} placeholder="Spending Name..." required></input>

            <input type="number" name="spendingAmount" id="spendingAmount" value={this.state.spendingAmount} onChange={this.handleChange} placeholder="Spending Amount..." required></input>

            <input type="text" name="spendingCategory" id="spendingCategory" value={this.state.spendingCategory} onChange={this.handleChange} placeholder="Spending Category..." required></input>

            <button type="submit" >Submit</button>
        </form>);

        const incomeScreen = (<form onSubmit={this.handleSubmit}>
            <input type="number" name="incomeAmount" id="incomeAmount" value={this.state.incomeAmount} onChange={this.handleChange} placeholder="Income Amount..." required></input>

            <button type="submit" >Submit</button>
        </form>);

        function getTheScreen(state) {
            if (state.screenType === "addIncome") {
                return incomeScreen;
            }
            else {
                return spendingScreen;
            }
        }

        return (<>
            <BalanceScreen balance={this.state.balance}/>

            <button onClick={this.switchScreens}>Switch Screens</button>
            {getTheScreen(this.state)}
            <button onClick={()=>{showLocalStorageData(); this.getBalance()}}>Show the data in the local storage</button>
            <button onClick={()=>{clearLocalStorage(); this.getBalance()}}>Clear the local storage</button>
        </>);
    }

}