// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract IncrementAmount {
    uint public amount;
    constructor(uint initialValue) {
        require(
            initialValue > 10,
            "Initial value should be greater than 10"
        );
        amount = initialValue;
    }

    function incrementAmount() public {
        require(amount < 100, "You only have 100 amount");
        amount++;
    }

    function decrementAmount() public {
        require(amount >= 2, "You have insufficient amount, to decrement the amount");
        amount--;
    }

    function getAmount() public view returns (uint) {
        return amount;
    }
}
