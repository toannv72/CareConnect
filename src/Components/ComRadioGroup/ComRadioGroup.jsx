import React from 'react';
import { View, Text } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

const ComRadioGroup= ({  radioButtons, onPress, selectedId }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPress}
            selectedId={selectedId}
            layout='row'
        />

    </View>
  );
};

export default ComRadioGroup;
