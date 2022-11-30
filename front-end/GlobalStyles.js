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
        marginTop:5,
        marginBottom:5,
    },

    input:
    {
        borderRadius: 15,
        borderWidth: 0,
        backgroundColor: '#D9D9D9',
    },

    textInputStyle:
    {
        minHeight: 40
    },

    button:
    {
        alignItems: 'center',
        width: '80%',
        padding: 12,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
    },

    telephoneContainer:
    {
        width: '100%',
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
    },
    
    telephoneText:
    {
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
    },

    inputColor:
    {
        color: '#ec6165',
    },

    codeStyle:
    {
        color: '#73423f'
    }
});