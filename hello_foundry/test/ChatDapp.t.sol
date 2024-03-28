// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ChatDapp} from "../src/ChatDapp.sol";

contract ChatDappTest is Test {
    ChatDapp public chatDapp;

    function setUp() public {
        chatDapp = new ChatDapp();
    }

    function testSendMessage() public {
        address receiver = address(0x123);
        string memory messageContent = "Hello, receiver!";
        chatDapp.sendMessage(receiver, messageContent);

        ChatDapp.Message[] memory messages = chatDapp.getMessages(address(this), receiver);
        require(messages.length == 1, "Message not sent");
        require(messages[0].sender == address(this), "Sender address incorrect");
        require(messages[0].receiver == receiver, "Receiver address incorrect");
        require(keccak256(bytes(messages[0].content)) == keccak256(bytes(messageContent)), "Message content incorrect");
    }

   
}
