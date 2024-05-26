import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View, Text, } from 'react-native';
// import Picker from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
const ComSelect = (
    (
        {
            label,
            name,
            control,
            rules,
            ref,
            required,
            errors,
            options,
        },
        ...props
    ) => {
        const errorMessage = errors[name]?.message;
        return (
            <View>
                {label && (
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>{label}</Text>
                        {required && (
                            <Text style={styles.required}>*</Text>
                        )}
                    </View>
                )}

                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <View style={[
                            styles.input,
                            {
                                borderColor: errorMessage ? 'red' : '#33B39C'
                            }
                        ]}>
                            <Picker
                                selectedValue={value}
                                onValueChange={(itemValue, itemIndex) =>
                                    onChange(itemValue)
                                }
                                style={{backgroundColor: '#33B39C', color: 'white'}}
                                dropdownIconColor="white"
                                pickerStyleType={{ borderColor: "#000" }}

                            >
                                {options.map((option, index) => (
                                    <Picker.Item
                                        key={index}
                                        label={option.label}
                                        value={option.value}
                                    />
                                ))}
                            </Picker>
                        </View>
                    )}

                    name={name}
                    rules={rules}
                />
                {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            </View>
        )
    }
);

export default ComSelect;

const styles = StyleSheet.create({

    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    label: {
        color: '#000',
        fontWeight: 'bold',
        marginRight: 4,
    },
    required: {
        color: 'red',
        fontSize: 14,
    },
    input: {
        backgroundColor: '#fff',
        // height: 40,
        // padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'gray'
    },
    error: {
        color: 'red',
        marginTop: 4,
    },
});
