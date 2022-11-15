import { StyleSheet } from 'react-native';

export default GlobalStyles = StyleSheet.create(
{
    screenContainer: 
    {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15
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

    method:
    {
        alignSelf: 'flex-start',
        paddingLeft: 5,
        marginTop: 10
    },
    
    methodText:
    {
        fontSize: 40,
        fontWeight: 'bold',
    },
});