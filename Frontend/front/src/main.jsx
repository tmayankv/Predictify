import React from 'react';
import { Sepolia } from "@thirdweb-dev/chains";
import ReactDOM from 'react-dom/client';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

import { StateContextProvider } from './context/StateContext';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThirdwebProvider activeChain={ Sepolia }
  clientId="9d91a9d97cfdd6132ce83d303ed74c00" > 
      <StateContextProvider>
        <App />
      </StateContextProvider>
  </ThirdwebProvider> 
)