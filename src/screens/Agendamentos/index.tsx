import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns';

import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';

import { getPlatformDate } from '../../utils/getPlataformDate';
import ArrowSvg from "../../assets/arrow.svg"

import { Alert, StatusBar } from 'react-native';
import { Button } from '../../components/Button';


import { DateData } from 'react-native-calendars';
import { Calendar, MarkedDatesProps } from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { Params } from '../CarDetails';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles';

interface RentalPeriod{
    startFormatted: string;
    endFormatted: string;
} 

export function Agendamentos() {
    const [lastSelectedDate, setLastSelectedDate] = useState<DateData>({} as DateData);
    const [dateInterval, setDateInterval] = useState<MarkedDatesProps>({} as MarkedDatesProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
    
    const theme = useTheme();
    const navigation = useNavigation();

    const route = useRoute();
    const { car } = route.params as Params;

    // function handleGoBack() {
    //     navigation.navigate('CarDetails');
    // }

    function handleConfirmRental() {
        if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
            Alert.alert('Selecione as datas par alugar!')
        } else {
            navigation.navigate('SchedulingDetails',  {
                car,
                dates: Object.keys(dateInterval)
            })
        }
    }
    function handleGoBack() {
        navigation.goBack();
    } 

    function handleChangeDate (date: DateData) {
        let start = !lastSelectedDate?.timestamp ? date : lastSelectedDate;
        let end = date;
    
        
        if(start.timestamp > end.timestamp) {
            start = end
            end = start
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setDateInterval(interval);
        
        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
        })
    }

  return (
    <Container>
        <Header>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <BackButton 
                onPress={handleGoBack}
                color={theme.colors.shape}
            />

            <Title> 
                Escolha uma{'\n'} 
                data de inicio e{'\n'} 
                fim do aluguel
            </Title>
                
            <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue selected={!!rentalPeriod.startFormatted}>
                        {rentalPeriod.startFormatted}
                    </DateValue>
                </DateInfo>

                <ArrowSvg/>

                <DateInfo>
                    <DateTitle>ATE</DateTitle>
                    <DateValue selected={!!rentalPeriod.endFormatted}>
                        {rentalPeriod.endFormatted}
                    </DateValue>
                </DateInfo>
            </RentalPeriod>
        </Header>

        <Content>
            <Calendar 
                markedDates={dateInterval!}
                onDayPress={handleChangeDate}
            />
        </Content>

        <Footer>
            <Button title="Confirmar" onPress={handleConfirmRental}/>
        </Footer>
        
    </Container>
  );
}