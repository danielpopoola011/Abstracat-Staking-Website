// src/Pages/Gallery.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// ------------- CONFIG -----------------
const NFT_CONTRACT = "0x001393efa7a009b620003bf9ab72d6a50311e3ec"; // AbstractCats
const STAKING_CONTRACT_ADDRESS = "0xYourStakingContract";          // <— replace later

// Minimal ABI with only a stake(uint256) function.  Replace with full ABI later.
const stakingAbi = [
  {
    name: "stake",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [],
  },
];

export default function Gallery() {
  // ------------------------------------
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { address, isConnected } = useAccount();

  // Wagmi write hook (pre‑configured, we’ll pass tokenId at runtime)
  const { config } = usePrepareContractWrite({
    address: STAKING_CONTRACT_ADDRESS,
    abi: stakingAbi,
    functionName: "stake",
    // args will be supplied in the onClick
    enabled: false, // we enable it dynamically
  });
  const { writeAsync } = useContractWrite(config);

  // Fetch NFTs (OpenSea API)
  useEffect(() => {
    async function fetchNFTs() {
      try {
        const res = await axios.get(
          `https://api.opensea.io/api/v2/assets?asset_contract_address=${NFT_CONTRACT}&order_direction=asc&limit=20`
        );
        setNfts(res.data.assets || []);
      } catch (err) {
        console.error("Failed to fetch NFTs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNFTs();
  }, []);

  // Stake handler
  async function handleStake(tokenId) {
    if (!isConnected) {
      alert("Connect your wallet first.");
      return;
    }
    try {
      // Call the staking contract
      await writeAsync({ args: [tokenId] });
      alert(`Staking tx sent for token #${tokenId}!`);
    } catch (err) {
      console.error(err);
      alert("Stake failed (see console).");
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-10 font-pixel text-greenlite px-4">
      {/* Wallet connect button */}
      <ConnectButton />

      <h1 className="text-4xl mt-6 mb-8">Your AbstractCats</h1>

      {loading ? (
        <p className="text-2xl">Loading NFTs…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="bg-black/60 backdrop-blur-md p-4 rounded-lg border border-greenlite shadow-lg w-[250px]"
            >
              <img
                src={nft.image_preview_url || nft.image_url}
                alt={nft.name}
                className="w-full h-56 object-cover rounded"
              />
              <h2 className="mt-4 text-lg text-center">{nft.name}</h2>

              <button
                className="mt-3 w-full bg-greenlite text-black font-bold py-2 rounded hover:bg-white transition"
                onClick={() => handleStake(Number(nft.token_id))}
              >
                Stake
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}