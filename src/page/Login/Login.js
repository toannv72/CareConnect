import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ComInput from '../../Components/ComInput/ComInput';
import ComSelect from '../../Components/ComInput/ComSelect';

export default function LoginScreen() {
    const loginSchema = yup.object().shape({
        email: yup.string().trim().email('Invalid email format').required("vui long nhap "),
        password: yup.string().required("vui long nhap mk"),
        chon: yup.string().required("vui long nhap mk"),
    });

    const methods = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            password: '',
            email: 'toan@gmail.com',
        },
    });


    const { control, handleSubmit, register, formState: { errors }, } = methods;

    const handleLogin = (data) => {
        // Xử lý đăng nhập với dữ liệu từ data
        console.log(data);
    };
    const data = [
        {
            value: "",
            label: "toàn"
        }, {
            value: '2',
            label: "toàn1"
        }, {
            value: '3',
            label: "toàn2"
        }, {
            value: '3',
            label: "toàn2"
        }, {
            value: '3',
            label: "toàn2"
        }, {
            value: '3',
            label: "toàn2"
        }, {
            value: '3',
            label: "toàn2"
        }, {
            value: '3',
            label: "toàn2"
        }
    ]

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <FormProvider {...methods}>
                    <View style={{ width: '80%' }}>
                        <ComInput
                            label="email"
                            name="email"
                            control={control}
                            keyboardType="default" // Set keyboardType for First Name input
                            errors={errors} // Pass errors object
                            required

                        // secureTextEntry
                        />
                        <ComInput
                            label="Last name"
                            name="password"
                            control={control}
                            // keyboardType="visible-password" // Set keyboardType for Last Name input
                            errors={errors} // Pass errors object
                            password
                        />
                        <ComSelect
                            label="Last name"
                            name="chon"
                            control={control}
                            // keyboardType="visible-password" // Set keyboardType for Last Name input
                            errors={errors} // Pass errors object
                            options={data}
                        />

                        <Button
                            title="Login"
                            style={{margin: 100,}}
                            onPress={handleSubmit(handleLogin)}
                        />
                    </View>
                </FormProvider>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 5,
    },
});
