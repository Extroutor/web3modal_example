import React from 'react';
import {chain, configureChains, createClient, WagmiConfig} from "wagmi";
import {Web3Button, Web3Modal} from "@web3modal/react";
import {EthereumClient, modalConnectors, walletConnectProvider} from "@web3modal/ethereum";

const chains = [chain.polygon];

// Wagmi client
const {provider} = configureChains(chains, [
    walletConnectProvider({projectId: "d9210d7f507ad22b39b14475b3c9797e"}),
]);

const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({appName: "web3Modal", chains}),
    provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

const App = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <WagmiConfig client={wagmiClient}>
                <Web3Button/>
            </WagmiConfig>

            <Web3Modal
                projectId="d9210d7f507ad22b39b14475b3c9797e"
                theme="dark"
                accentColor="default"
                ethereumClient={ethereumClient}
            />
        </div>
    );
};

export default App;