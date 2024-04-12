import React from 'react';
import { Sepolia } from "@thirdweb-dev/chains";
import ReactDOM from 'react-dom/client';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

import { StateContextProvider } from './context/StateContext';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
import { registerLicense, setCulture} from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXtfcXRXQmNeWEJxXks=');
setCulture('en-US');
root.render(
  <ThirdwebProvider activeChain={ Sepolia }
  clientId="9d91a9d97cfdd6132ce83d303ed74c00" > 
  <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
  </Router>
  </ThirdwebProvider> 
)