// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";

import {ChatDapp} from "../src/ChatDapp.sol";
import {EnsContract} from "../src/EnsContract.sol";

contract DeployScript is Script {
    EnsContract ensService;
    ChatDapp chatService;

    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("private_key");
        // address account = vm.addr(privateKey);
        vm.startBroadcast(privateKey);

        // Deploy contract
        ensService = new EnsContract();
        chatService = new ChatDapp(address(ensService));

        console2.log("Ens Service: ", address(ensService));
        console2.log("Chat Dapp: ", address(chatService));

        vm.stopBroadcast();
    }
}