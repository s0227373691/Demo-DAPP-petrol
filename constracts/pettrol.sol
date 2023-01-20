// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract petrolExchang{
    //  owner
    address public owner;
    address public deployAddress;

    // petrolBalence
    mapping(address => uint256) public petrolBalences; 

    constructor(){
        owner = msg.sender;
        deployAddress = address(this);
        petrolBalences[address(this)] = 1000;
    }

    function getEthBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getPetrolBalences() public view returns(uint256){
        return petrolBalences[address(this)];
    }

    function addPetrol(uint256 amount) public{
        require(msg.sender == owner, "only owner can add petrols"); 
        petrolBalences[address(this)] += amount;
    }

    function buyPetrol(uint256 amount) public payable{
        require(msg.value >=  amount * 1 ether,"not enough money to buy petrol");
        require(petrolBalences[address(this)] >= amount, "not enough petrol to bought");

        petrolBalences[address(this)] -= amount;
        petrolBalences[msg.sender] += amount;
    }

    function sellPetrol(uint256 amount) public payable{
        require(petrolBalences[msg.sender] >= amount,"not enough petrol to sell");
        require(address(this).balance >= 1, "not enough eth to bought");

        petrolBalences[address(this)] += amount;
        petrolBalences[msg.sender] -= amount;
        payable(msg.sender).transfer(1 ether * amount);
    }
}