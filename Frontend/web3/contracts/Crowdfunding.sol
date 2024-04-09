// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crowdfunding {
    struct Campaign {
        address owner; 
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountcollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

mapping (uint256 => Campaign) public campaigns;

uint256 public noOfCampaigns = 0;

// this fucntion creeates a campaign adn then return the campaign id for which it is created
function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
    Campaign storage campaign= campaigns[noOfCampaigns];

    // As in JS we have if-else in solidity we use require to test whether things are okay or not?
    require(campaign.deadline < block.timestamp, "deadline should be earlier than block.timestamp");

    campaign.owner= _owner;
    campaign.deadline = _deadline;
    campaign.title = _title;
    campaign.description= _description;
    campaign.target = _target;
    campaign.amountcollected = 0;
    campaign.image = _image;

    noOfCampaigns++;

    return noOfCampaigns - 1;
}

// takes the id of the campaign to which we need to doante money/crypto
function donateToCampaigns(uint256 _id) public payable {
    uint256 amount = msg.value;
    // this value comes from frontend by the user is simply the amount that is to be donated

    Campaign storage campaign = campaigns[_id];

    campaign.donators.push(msg.sender);
    campaign.donations.push(amount);

// payable refers that the amount is to be paid to the campaign owner by calling the value of the campaign as amount to be paid to the campaign owner!
    (bool sent,) =payable(campaign.owner).call{value : amount}("");

// payable givees two values to the campaign owner by calling the value of the campaign as amount

    if(sent){
        campaign.amountcollected = campaign.amountcollected + amount;
    }

}

function getDonators( uint256 _id) view public returns ( address[] memory, uint256[] memory) {
    return (campaigns[_id].donators, campaigns[_id].donations);
}

function getCampaigns() public view returns(Campaign[] memory) {
// make a variable allcampaigns
// then assign it with empty arrays of length = noOfCampaigns;
    Campaign[] memory allCampaigns = new Campaign[](noOfCampaigns);

    // Now populate these mutiple empty campaign arrays

    for(uint i=0 ; i< noOfCampaigns; i++){
        Campaign storage item= campaigns[i];

        allCampaigns[i] = item;
    }
    return allCampaigns;
}
}