import '@assets/styles/index.css';

import { RootProvider } from '@app/providers/root-provider';
import { Router } from '@app/router/router';

function App() {
  return (
    <RootProvider>
      <Router />
    </RootProvider>
  );
}

export default App;
