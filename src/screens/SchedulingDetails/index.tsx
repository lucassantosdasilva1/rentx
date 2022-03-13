import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { DateData } from 'react-native-calendars';
import { RFValue } from 'react-native-responsive-fontsize';

import { format } from 'date-fns';

import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';


import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import api from '../../service/api';
import { carDTO } from '../../DTO/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccesoryIcon';
import { getPlatformDate } from '../../utils/getPlataformDate';



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
  Acessories,
  RentalPeriod,
  CalendarIcon,
  Period,
  Price,

  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer

} from './styles';


interface RentalPeriod {
  start: string;
  end: string;
}

interface Params {
  car: carDTO,
  dates: string[]
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  
  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = dates.length * car.rent.price;

  async function handleConfirmRental() {
    
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ]
      //####POderia ser assim como a baixo  mas eu fiz com then catch
    // await api.put(`/schedules/${car.id}`, {
    //   id: car.id,
    //   unavailable_dates
    // })

    //Atualiza a lista de agendamento de carros pelo car.id
    await api.post(`/schedules_byuser/`, {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlatformDate(new Date(dates[dates.length-1])), 'dd/MM/yyyy')
    })


    await api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
    //Em caso de sucesso ao conectar e atualizar os dados da API a navigation segue para a tela 'SchedullingComplete'
    .then(() => {
      navigation.navigate('SchedullingComplete')
    })
    //Em caso de insucesso ao conectar ou atualizar os dados da API a navigation segue para a tela 'Home'
    .catch(() => {
      Alert.alert("Nao foi possível realizar a reserva"!);
      navigation.navigate('Home');
    })
    
  }
  function handleBack() {
    navigation.goBack();
  }

  useEffect( () => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length-1])), 'dd/MM/yyyy')
    })
  },[])

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
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
            car.accessories.map(acessory => 
              <Acessory 
                key={acessory.type}
                name={acessory.name} 
                icon={getAccessoryIcon(acessory.type)}
              />
              
              )
          }
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod!.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod!.end}</DateValue>
          </DateInfo>


        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Alugar agora" 
          color={theme.colors.success} 
          onPress={handleConfirmRental} 
        />
      </Footer>
    </Container>
  );
}