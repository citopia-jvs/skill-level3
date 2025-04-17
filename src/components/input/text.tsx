import React, { FunctionComponent, useCallback, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
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

  const debouncedTextChange = useCallback(debounce((text: string) => onChange(text), 750), [ onChange ]);

  const containerStyle = React.useMemo(() => {
    return isFocus 
      ? StyleSheet.compose(styles.container, styles.viewFocused) 
      : StyleSheet.compose(styles.container, styles.viewBlured);
  }, [ isFocus ]);

  return (
    <View style={ containerStyle }>
      <TextInput
        ref={ inputRef }
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