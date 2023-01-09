import React from "react";
import { Text } from '@ui-kitten/components';
import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import { useShowError } from '../contexts/index'; 
import Animation from './Animation.component';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../utils/GlobalStyles';

export default function ServerErrorModal()
{
  const { serverError, setServerError} = useShowError();

  return (
      <Modal
        animationType = 'fade'
        visible={Object.keys(serverError).length != 0 ? true : false}
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
                Error status {serverError.status}: {serverError.message}
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
                onPress = {() => setServerError({})}
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