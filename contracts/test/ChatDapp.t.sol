// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {EnsContract} from "../src/EnsContract.sol";
import {ChatDapp} from "../src/ChatDapp.sol";

contract ChatDappTest is Test {
    EnsContract public ensContract;
    ChatDapp public chatDapp;

    address A;
    address B;

    function setUp() public {
        ensContract = new EnsContract();
        chatDapp = new ChatDapp(address(ensContract));

        A = mkaddr("user A");
        B = mkaddr("user B");

        ensContract.registerNameService("A.ns", "awiijjj");
        ensContract.registerNameService("B.ns", "bwiijjj");
    }

    function testSendMessage() public {
        chatDapp.sendMessage("B.ns", "Hello B");
        chatDapp.sendMessage("A.ns", "Hello A");

        ChatDapp.Message[] memory messagesAB = chatDapp.getMessages("A.ns", "B.ns");
        ChatDapp.Message[] memory messagesBA = chatDapp.getMessages("B.ns", "A.ns");

        assert(messagesAB.length == 1);
        assert(messagesBA.length == 1);
    }

    function mkaddr(string memory name) internal pure returns (address) {
        address addr = address(uint160(uint256(keccak256(abi.encodePacked(name)))));
        return addr;
    }
}
