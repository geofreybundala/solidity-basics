// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Chat {
    struct Message {
        address sender;
        address recipient;
        uint256 timestamp;
        string content;
    }

    mapping(uint256 => Message) public messages;
    uint256 public messageCount;

    function sendMessage(address _recipient, string memory _content) public {
        messages[messageCount] = Message(msg.sender, _recipient, block.timestamp, _content);
        messageCount++;
    }

    function getMessage(uint256 _index) public view returns (address, address, uint256, string memory) {
        require(_index < messageCount, "Message index out of bounds");
        Message memory message = messages[_index];
        return (message.sender, message.recipient, message.timestamp, message.content);
    }


}
