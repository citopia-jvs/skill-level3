import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

type SeparatorProps = {
  height?: number;
  width?: number;
}

const Separator: FunctionComponent<SeparatorProps> = ({ height, width }) => {
  return (
    <View style={{ height, width }} />
  )
}

export default Separator;