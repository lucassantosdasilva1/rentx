import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'

import { getAccessoryIcon } from '../../utils/getAccesoryIcon';
import { carDTO } from '../../DTO/CarDTO';

import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container, 
  Header,
  CarImages,
  Content,
  Details,
  Descriptions,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Acessories,
  Footer,
} from './styles';

export interface Params {
  car: carDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate('Agendamentos', {car})
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
        <Header>
          <BackButton onPress={handleBack}/>
        </Header>

        <CarImages>
          <ImageSlider 
            imageUrl={car.photos}
          />
        </CarImages>

        <Content>
          <Details>
            
            <Descriptions>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Descriptions>

            <Rent>
              <Period>{car.rent.period}</Period>
              <Price>R$ {car.rent.price}</Price>
            </Rent>

          </Details>


          <Acessories>
            {
              car.accessories.map( accesory => (
                <Acessory 
                  key={accesory.type}
                  name={accesory.name} 
                  icon={getAccessoryIcon(accesory.type)}
                />
              ))
              
            }
          </Acessories>
          
          <About>{car.about}</About>
        </Content>

        <Footer>
          <Button title="Escolher Período do Aluguel" onPress={handleConfirmRental}/>
        </Footer>
    </Container>
  );
}