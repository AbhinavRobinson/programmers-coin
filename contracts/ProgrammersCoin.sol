pragma solidity >=0.8.4;

// SPDX-License-Identifier: MIT
// @title Programmers Coin : ERC20 Token Standard
// @version 1.0
// @author Abhinav Robinson
// @notice This is a standard token implementation.

import "hardhat/console.sol";

// @notice ER20 Token Standard Interface for Programmers Coin
interface ERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// @notice Implementation of the Programmers Coin
contract ProgrammersCoin is ERC20 {
    string public constant name = "Programmers Coin";
    string public constant symbol = "PGC";
    uint8 public constant decimals = 18;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;

    uint256 public totalSupply_;

    // @dev Initializes the contract with the initial supply
    constructor(uint256 supply) {
        totalSupply_ = supply;
        balances[msg.sender] = supply;
    }

    function totalSupply() public view override returns (uint256) {
        return totalSupply_;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return balances[account];
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address owner, uint256 amount) public override returns (bool) {
        allowed[msg.sender][owner] = amount;
        emit Approval(msg.sender, owner, amount);
        return true;
    }

    function allowance(address owner, address delegate) public view override returns (uint256) {
        return allowed[owner][delegate];
    }

    function transferFrom(
        address owner,
        address to,
        uint256 amount
    ) public override returns (bool) {
        require(balances[owner] >= amount, "Insufficient funds");
        require(allowed[owner][msg.sender] >= amount, "Insufficient allowance");

        balances[owner] -= amount;
        allowed[owner][msg.sender] -= amount;

        balances[to] += amount;

        emit Transfer(owner, to, amount);
        return true;
    }
}
