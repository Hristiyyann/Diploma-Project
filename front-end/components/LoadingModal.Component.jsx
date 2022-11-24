import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal } from '@ui-kitten/components';
import { useLoading } from '../contexts/index';
import Animation from './Lottie.Component';
import AnimationsPaths from '../assets/animations/AnimationsPaths';

export default function LoadingModal()
{
    const { isLoading } = useLoading();

    return(
        <Modal
            visible={isLoading}
            backdropStyle={styles.backdrop}
        >
            <Animation
                path = {AnimationsPaths.loading}
                style = {{width: 140}}
            />
        </Modal>
    )
}

const styles = StyleSheet.create(
{
    backdrop: 
    {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
})