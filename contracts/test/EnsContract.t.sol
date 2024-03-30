// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {EnsContract} from "../src/EnsContract.sol";

contract EnsContractTest is Test {
    EnsContract public ensContract;

    function setUp() public {
        ensContract = new EnsContract();
    }

    function testRegisterAndRetrieveDomain() public {
        string memory domainName = "example.com";
        string memory avatarURI = "https://example.com/avatar.jpg";
        
        ensContract.registerNameService(domainName, avatarURI);

        (string memory registeredDomainName, string memory registeredAvatarURI, address owner) = ensContract.getDomainDetails(domainName);

        require(keccak256(bytes(registeredDomainName)) == keccak256(bytes(domainName)), 
        "Domain name is incorrect");

        require(keccak256(bytes(registeredAvatarURI)) == keccak256(bytes(avatarURI)),
         "Avatar URI is incorrect");

        require(owner == address(this),
         "Owner address is incorrect");
    }

    function testRegisterDomainWithIncorrectDetails() public {
        string memory domainName = "example.com";
        string memory avatarURI = "https://example.com/avatar.jpg";
        
        string memory incorrectAvatarURI = "https://example.com/.jpg.jpg"; // Fix the incorrect avatar URI
        address wrongOwner = address(0x123);

        ensContract.registerNameService(domainName, avatarURI);

        (string memory registeredDomainName, string memory registeredAvatarURI, address owner) = ensContract.getDomainDetails(domainName);
        
        require(keccak256(bytes(registeredDomainName)) == keccak256(bytes(domainName)), 
        "Registered domain name does not match expected");

        require(keccak256(bytes(registeredAvatarURI)) != keccak256(bytes(incorrectAvatarURI)), 
        "Registered avatar URI matches incorrect expected value");

        require(owner != wrongOwner, "Registered owner address matches unexpected value");
    }
}
