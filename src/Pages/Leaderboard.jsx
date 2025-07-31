import React from "react";

function Leaderboard() {
  // Dummy leaderboard data — replace later with real blockchain data
  const leaderboard = [
    { rank: 1, address: "0xA1B2...C3D4", points: 1200 },
    { rank: 2, address: "0xE5F6...G7H8", points: 980 },
    { rank: 3, address: "0xI9J0...K1L2", points: 760 },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-12 px-4 font-pixel text-greenlite">
      <h1 className="text-4xl mb-8">Leaderboard</h1>

      {leaderboard.length === 0 ? (
        <p className="text-xl">No stakers yet.</p>
      ) : (
        <div className="w-full max-w-3xl">
          <div className="grid grid-cols-3 text-left border-b border-greenlite pb-2 mb-4 text-lg sm:text-xl">
            <span>Rank</span>
            <span>Wallet</span>
            <span className="text-right">Points</span>
          </div>

          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className="grid grid-cols-3 items-center border-b border-greenlite py-3 text-base sm:text-lg"
            >
              <span>#{entry.rank}</span>
              <span>{entry.address}</span>
              <span className="text-right">{entry.points}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;