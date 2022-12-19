import React from "react";
import { Text } from '@ui-kitten/components';
import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import { useShowError } from '../contexts/index'; 
import  Animation from '../components/Lottie.Component';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function ServerErrorModal()
{
  const { serverError, setServerError} = useShowError();

  return (
      <Modal
        animationType = 'fade'
        visible={serverError ? true : false}
      >
        <View style={styles.modal}>
            <Animation
                path = {AnimationsPaths.error}
                style = {{width: 250}}
            />

            <Text
                category = 'h5'
                status = 'primary'
                style = {GlobalStyles.centeredText}
            >
                {serverError}
            </Text>

            <Text
                category = 'h5'
                status = 'primary'
                style = {GlobalStyles.centeredText}
            >
                Please, try again later
            </Text>

            <TouchableOpacity
                style = {GlobalStyles.button}
                onPress = {() => setServerError(null)}
            >
                <Text>Cancel</Text>
            </TouchableOpacity>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create
({
    modal: 
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
    }
});