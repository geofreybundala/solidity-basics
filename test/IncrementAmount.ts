import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';

describe('IncrementAmount', function () {
    let incrementAmount: any;
    let owner: Signer;

    before(async function () {
        const IncrementAmount = await ethers.getContractFactory('IncrementAmount');
        [owner] = await ethers.getSigners();
        incrementAmount = await IncrementAmount.deploy(15); // Initialize with an initial value of 15
    });

    it('Initial amount should be 15', async function () {
        expect(await incrementAmount.getAmount()).to.equal(15);
    });

    it('Should increment amount by 1', async function () {
        await incrementAmount.incrementAmount();
        expect(await incrementAmount.getAmount()).to.equal(16);
    });

    it('Should not increment amount beyond 100', async function () {
        // Increment amount to 100
        for (let i = 0; i < 84; i++) {
            await incrementAmount.incrementAmount();
        }
        // Try to increment again
        await expect(incrementAmount.incrementAmount()).to.be.revertedWith('You only have 100 amount');
    });

    it('Should decrement amount by 1', async function () {
        await incrementAmount.decrementAmount();
        expect(await incrementAmount.getAmount()).to.equal(99);
    });

    it('Should not decrement amount below 2', async function () {
        // Decrement amount to 2
        const amount = await incrementAmount.getAmount()
        for (let i = 1; i < amount; i++) {
            await incrementAmount.decrementAmount();
        }

        // Try to decrement again
        await expect(incrementAmount.decrementAmount()).to.be.revertedWith('You have insufficient amount, to decrement the amount');
    });
});
