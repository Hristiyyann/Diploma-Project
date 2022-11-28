import * as SecureStore from 'expo-secure-store';

async function saveItem(key, value) 
{
  await SecureStore.setItemAsync(key, value);
  console.log("successfully");
}

async function getItemValue(key) 
{
  let result = await SecureStore.getItemAsync(key);
  if (result) { return result } 
  else { return null }
}

async function deleteItem(key) 
{
  await SecureStore.deleteItemAsync(key);
}

async function hasTokens()  
{
  const accessToken = await getItemValue('accessToken');
  const refreshToken = await getItemValue('refreshToken');

  if(accessToken == null || refreshToken == null) { return false; }
  return refreshToken;
}

export { saveItem, getItemValue, deleteItem, hasTokens }