import {ethers} from 'hardhat';
import {Signer, ethers as eth} from 'ethers';
import {expect} from 'chai';


describe('Chat', () => {
    let owner: Signer;
    let Chat;
    let chat;
    let address1;
    let address2;

    before(async () => {
        const Chat = await ethers.getContractFactory('Chat');
        const [owner, addr1, addr2] = await ethers.getSigners();
        address1 = addr1;
        address2 = addr2;
        chat = await Chat.deploy();
        //await chat.deployed();
    })


    it("Should store a message and return it correctly", async function () {
        const content = "Hello, world!";
        const ipfsHash = "QmHash123";


        await chat.sendMessage(address1, ipfsHash);

        const message = await chat.getMessage(0);
        expect(message.sender).to.equal(owner);
        expect(message[1]).to.equal(address1.address);
        expect(message[2]).to.be.closeTo(Math.floor(Date.now() / 1000), 10); // Check if timestamp is close to current time
        expect(message[3]).to.equal(ipfsHash);
    });
})
