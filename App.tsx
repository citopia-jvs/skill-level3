import React from 'react';

import Root from './src';
import { SafeAreaProvider } from "react-native-safe-area-context";

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>    
  );
}

export default App;
