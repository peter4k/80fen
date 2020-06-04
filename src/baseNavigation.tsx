import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Parse from 'parse/react-native';

import AuthContext from './authContext';

import Login from './views/login/login';
import Signup from './views/login/signup';
import MainMenu from './views/menu/mainMenu';
import CreateGame from './views/createGame/createGame';
import Game from './views/game/game';

const Stack = createStackNavigator();

export default function App() {

    const [isSignedIn, setIsSignedIn] = React.useState(true);

    // Parse.User.logOut();

    checkUser();

    return (
        <AuthContext.Provider value={(signedIn: boolean) => setIsSignedIn(signedIn)}>
            <NavigationContainer>
                <Stack.Navigator>
                    {
                        isSignedIn ?
                            <>
                                <Stack.Screen name="mainmenu" component={MainMenu} options={{ headerShown: false }} />
                                <Stack.Screen name="createGame" component={CreateGame} options={{ headerShown: false }} />
                                <Stack.Screen name="game" component={Game} options={{ headerShown: false }} />
                            </>
                            :
                            <>
                                <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                                <Stack.Screen name="signup" component={Signup} options={{ headerShown: false }} />
                            </>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )

    async function checkUser() {
        const user = await Parse.User.currentAsync();
        setIsSignedIn(!!user);
    }
};