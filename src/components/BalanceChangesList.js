import React from "react";

import "../styles/BalanceChangesList.css"

import BalanceChange from "./BalanceChange";

export default function BalanceChangesList(props){


    const iA = props.iA;
    const sA = props.sA;

    const iAMapped = iA.map((income)=>{ 
       // console.log(income.type); 
        return (<BalanceChange  type = "income" incomeAmount = {income.incomeAmount}/>); 
       });
    //    console.log(props.iA);
    const sAMapped = sA.map((spending)=><BalanceChange  type="spending" spendingAmount = {spending.spendingAmount} spendingCategory={spending.spendingCategory} spendingName={spending.spendingName}/>);

    //  console.log("iAMapped",iAMapped);
    //  console.log("sAMapped",sAMapped);


    return (<>
    <BalanceChange props={props.iA[0]}/>
    {iAMapped}
    {sAMapped}
    </>); 

}