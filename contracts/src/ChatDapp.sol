// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import './IEnsContract.sol';

contract ChatDapp {
    uint256 chatId = 1;
    struct Message {
        address sender;
        address receiver;
        string content;
    }

    mapping(address => mapping(address => uint256)) public messages;

    mapping(uint256 => Message[]) chatSession;

    address public ensAddress;

    event MessageSent(
        address indexed sender,
        address indexed receiver,
        uint256 timestamp
    );

    constructor(address _nameAddress) {
        ensAddress = _nameAddress;
    }

    function sendMessage(string memory _receiver, string memory _content) external {
        
         IEnsContract nameService = IEnsContract(ensAddress);
    (, , address _receiverAddr) = nameService.getDomainDetails(_receiver);
    
    uint256 _chatSession = chatCheck(msg.sender, _receiverAddr);
    if (_chatSession == 0) {
        _chatSession = chatId;
        messages[msg.sender][_receiverAddr] = _chatSession;
        chatId++;
    }

    Message memory _message = Message(
        msg.sender,
        _receiverAddr,
        _content
    );
    chatSession[_chatSession].push(_message);

    emit MessageSent(msg.sender, _receiverAddr, block.timestamp);
    }

    function getMessages(string memory _sender, string memory _receiver)
        external
        view
        returns (Message[] memory)
    {
        

        IEnsContract nameService = IEnsContract(ensAddress);

        (, , address _senderAddr) = nameService.getDomainDetails(_sender);
        (, , address _receiverAddr) = nameService.getDomainDetails(_receiver);

        uint256 _chatSession = chatCheck(_senderAddr, _receiverAddr);        
        return chatSession[_chatSession];
    }

    function chatCheck(address sender, address receiver)
        private
        view
        returns (uint256)
    {
        if (messages[sender][receiver] != 0) {
            return messages[sender][receiver];
        } else if (messages[receiver][sender] != 0) {
            return messages[receiver][sender];
        }
        return 0;
    }
}