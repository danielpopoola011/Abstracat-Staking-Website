// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IERC721 {
    function transferFrom(address from, address to, uint256 tokenId) external;
}

contract AbstractCatStaking {
    address public nftAddress;
    mapping(address => uint256[]) public stakedTokens;
    mapping(uint256 => address) public tokenOwner;

    constructor(address _nftAddress) {
        nftAddress = _nftAddress;
    }

    function stake(uint256 tokenId) external {
        IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);
        stakedTokens[msg.sender].push(tokenId);
        tokenOwner[tokenId] = msg.sender;
    }

    function unstake(uint256 tokenId) external {
        require(tokenOwner[tokenId] == msg.sender, "Not your token");

        // Remove tokenId from user’s stakedTokens
        uint256[] storage tokens = stakedTokens[msg.sender];
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i] == tokenId) {
                tokens[i] = tokens[tokens.length - 1];
                tokens.pop();
                break;
            }
        }

        delete tokenOwner[tokenId];
        IERC721(nftAddress).transferFrom(address(this), msg.sender, tokenId);
    }

    function getStakedTokens(address user) external view returns (uint256[] memory) {
        return stakedTokens[user];
    }
}