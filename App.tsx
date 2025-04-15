import React from 'react';

import Root from './src';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


function App(): React.JSX.Element {
  console.log("TEST");
  return (
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>
  );
}

export default App;
