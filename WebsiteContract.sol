// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WebsiteContract {
    struct Resource {
        string content;
        string contentType;
    }

    mapping(string => Resource) private resources;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function setResource(string memory path, string memory content, string memory contentType) public onlyOwner {
        resources[path] = Resource(content, contentType);
    }

    function getResource(string memory path) public view returns (string memory, string memory) {
        Resource memory resource = resources[path];
        return (resource.content, resource.contentType);
    }

    function removeResource(string memory path) public onlyOwner {
        delete resources[path];
    }
}