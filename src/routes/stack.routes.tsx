import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Agendamentos } from '../screens/Agendamentos'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { SchedullingComplete } from '../screens/SchedullingComplete'
import { MyCars } from '../screens/MyCars';

const { Navigator, Screen} = createStackNavigator();

export function StackRoutes(){
    return (
        <Navigator screenOptions={{
            headerShown: false,
            // tabBarActiveTintColor: theme.colors.secondary,
            // tabBarInactiveTintColor: theme.colors.text,
            // tabBarLabelPosition: 'beside-icon',
            // tabBarStyle: {
            //     height: 55,
            //     paddingVertical: Platform.OS === 'ios' ? 20 : 0,
            // }
        }}>
            <Screen 
                name="Home"
                component={Home}
                
            />
            <Screen 
                name="CarDetails"
                component={CarDetails}
            />
            <Screen 
                name="Agendamentos"
                component={Agendamentos}
            />
            <Screen 
                name="SchedulingDetails"
                component={SchedulingDetails}
            />
            <Screen 
                name="SchedullingComplete"
                component={SchedullingComplete}
            />
            <Screen 
                name="MyCars"
                component={MyCars}
            />
        </Navigator>
    )
}