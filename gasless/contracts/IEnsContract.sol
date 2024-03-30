// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;


interface IEnsContract {

    function getDomainDetails(string memory _domainName) external view returns (string memory, string memory, address);

    function registerNameService(string memory _domainName,string memory _avatarURI) external;

    function updateDomainAvatar(string memory _domainName,string memory _avatarURI ) external;
}