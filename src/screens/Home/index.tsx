import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
//Para ver todos os icones do @expo/vector-icons acesse https://oblador.github.io/react-native-vector-icons/
import {Ionicons} from "@expo/vector-icons"

import { RFValue } from 'react-native-responsive-fontsize'

import { useNavigation } from '@react-navigation/native';

import Logo from "../../assets/logo.svg"; //Para adicionar intelisence ao import do Logo e retirar o warning é necessário fazer o que foi feito na pasta @types/svg
import  api  from '../../service/api';
import {carDTO} from "../../DTO/CarDTO";

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton
} from './styles';
import { useTheme } from 'styled-components';

export function Home() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<carDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  // const carData = {
  //   brand: 'Porshe',
  //   name: 'Panamera',
  //   rent: {
  //     period: 'AO DIA',
  //     price: '340',
  //   },
  //   thumbnail: 'https://www.webmotors.com.br/imagens/prod/347468/PORSCHE_PANAMERA_2.9_V6_EHYBRID_4_PDK_34746814472691347.png?s=fill&w=130&h=97&q=70&t=true)'
  // }

  function handleCarDetails(car: carDTO) {
    navigation.navigate('CarDetails', {car});
  }

  function handleOpenMycars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response =  await api.get('/cars');
        setCars(response.data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  },[])

  return (
    <Container>
        <StatusBar 
          barStyle="light-content" //letras do statusbar branco
          backgroundColor="transparent" //deixa a statusbar transparente
          translucent //Faz com que o header suba 
        />
        <Header>
          <HeaderContent>
            <Logo 
              width={RFValue(108)}
              height={RFValue(12)}
            />
            
            <TotalCars>Total de Carros: 12</TotalCars>
          </HeaderContent>
        </Header>

        { loading ? <Load/> : 

          <CarList
            data={cars}
            keyExtractor= {item => item.id}
            renderItem={({item}) => 
              <Car data={item} onPress={() => handleCarDetails(item)}/>}
          />
        }

        <MyCarsButton onPress={handleOpenMycars}>
          <Ionicons 
            name="ios-car-sport"
            size={32}
            color= {theme.colors.shape}
          />
        </MyCarsButton>
    </Container>
  );
}