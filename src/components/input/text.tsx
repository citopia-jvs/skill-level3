import React, { FunctionComponent, useCallback, useRef } from 'react';
import { TextInput, View } from 'react-native';
import styles from './text';
import { debounce } from 'lodash';


type TextProps = {
    value?: string;
    autoFocus?: boolean;
    placeholder?: string;
    onChange: (text: string) => void;
    clearable?: boolean;
}

const Text: FunctionComponent<TextProps> =  ({
  value,
  autoFocus = false,
  placeholder,
  onChange
}) => {
  const [isFocus, setFocus] = React.useState(autoFocus);
  const inputRef = useRef<TextInput>(null);

  const debouncedTextChange = useCallback(debounce((text: string) => onChange(text), 500), [ onChange ]);

  return (
    <View style={!isFocus ? {...styles.container, ...styles.viewBlured} : {...styles.container, ...styles.viewFocused}}>
      <TextInput
        ref={ inputRef }
        style={ styles.textContainer }
        defaultValue={ value }
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        autoFocus={ autoFocus }
        placeholder={ placeholder }
        onChangeText={ debouncedTextChange }
      />
    </View>
  );
}

export default Text;