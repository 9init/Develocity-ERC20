// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract Contract {
    // Variables
    string private _name;
    string private _symbol;
    uint256 private _totalSupply;

    // Methods to read the details of this token
    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }
}