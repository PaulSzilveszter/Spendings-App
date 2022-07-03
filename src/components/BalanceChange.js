import React from "react";

import "../styles/BalanceChangesList.css"

const incomeStyle = {
    color: "lime",
    "borderColor": "black"

}
const spendingStyle = {
    color: "red",
    "borderColor": "black"

}
const spendingCategoryAndNameStyle = {
    "borderColor": "black",
    "borderStyle": "solid"
}


export default function BalanceChange(props) {
    if (props.type === "income") {
        return (
            <div className="balance-change">
                <div style={incomeStyle}>+{props.incomeAmount}</div>
            </div>)
    }
    else if (props.type === "spending") {
        return (
            <div className="balance-change">
                <div style={spendingStyle}>+{props.spendingAmount}</div>

                <div style={spendingCategoryAndNameStyle}>Spending Name: {props.spendingName}</div>

                <div style={spendingCategoryAndNameStyle}>Spending Category: <u>{props.spendingCategory}</u></div>
            </div>
        )
    }

}