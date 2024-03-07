import React from 'react';
import { View, Text, Button } from 'react-native';
//import SpinningEarth from './SpinningEarth';
import { Link, router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { colors, commonStyles } from '../styles/commonStyles';

const LandingPage = () => {
  // const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 24, color: 'blue' }}>Town</Text>
        <Text style={{ fontSize: 24, color: 'green' }}>Trekkr</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Sign Up" />
        <Button title="Login" />
        <Link href="/users/1"></Link>
      </View>
    </View>
  );
};

export default LandingPage;
