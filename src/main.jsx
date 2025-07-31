import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, polygon, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import {
  RainbowKitProvider,
  getDefaultWallets
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import './custom-rainbowkit.css';

import App from "./App";
import "./index.css";

// 1. Configure chains + wallets
const { chains, publicClient } = configureChains(
  [mainnet, polygon, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "AbstractCat",
  projectId: "YOUR_PROJECT_ID", // You can replace with actual WalletConnect projectId later
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);