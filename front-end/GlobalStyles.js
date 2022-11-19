import { StyleSheet } from 'react-native';

export default GlobalStyles = StyleSheet.create(
{
    screenContainer: 
    {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },

    inputContainer: 
    {
        alignSelf: 'stretch',
        marginTop:10,
    },

    input:
    {
        borderRadius: 15,
        borderWidth: 0,
        backgroundColor: '#D9D9D9',
    },

    button:
    {
        alignItems: 'center',
        width: '80%',
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
    },
});