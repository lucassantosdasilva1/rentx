import React from 'react';
import theme from '../../styles/theme';

import { Feather } from '@expo/vector-icons'

import { ptBR } from './localeConfig';

import {
    Calendar as CustomCalendar,
    DateData,
    LocaleConfig,
} from 'react-native-calendars'

//Aqui definimos uma nova linguagem que no caso é a pt-br
LocaleConfig.locales['pt-br'] = ptBR;

//setamos da linguagem padrao para nossa linguagem personalizada
LocaleConfig.defaultLocale = 'pt-br';

export interface MarkedDatesProps {
    [date: string] : {
        color: string;
        textColor: string;
        disabled?: boolean;
        disabledTouchEvent?: boolean;
    }
}

interface CalendarProps {
    markedDates: MarkedDatesProps;
    onDayPress: (date: DateData) => void;
}

export function Calendar({ markedDates, onDayPress } : CalendarProps) {
  return (
      //O nome aqui é CustomCalendar e nao Calendar pq nós definimos um apelido ou Alias
    <CustomCalendar

        //Alteramos as setas padrão para esse estilo de setas que queromos
        renderArrow={( direction ) => 
            <Feather
                size= {24}
                color={theme.colors.text}
                name={ direction == 'left' ? "chevron-left" : "chevron-right"}
            />
        }

        headerStyle={{
            backgroundColor: theme.colors.background_secondary,
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.text_detail,
            paddingBottom: 10,
        }}

        theme={{
            textDayFontFamily: theme.fonts.primary_400,
            textDayHeaderFontFamily: theme.fonts.primary_500,
            textDayHeaderFontSize: 10,
            textMonthFontFamily: theme.fonts.secondary_600,
            textMonthFontSize: 20,
            monthTextColor: theme.colors.title,
            arrowStyle: {
                marginHorizontal: -15
            }
        }}

        //Aqui podemos definir a data inicial que deve aparecer
        minDate={new Date().toString()}

        //Aqui definimos so primeiro dia da semana que vai de 0 a 6 sendo 0 o padrao que significa domingo e 1 signfica segunda e etc...
        firstDay={1}

        //Propriedade que vai definir qual o tipo de marcacao vc quer usar
        markingType='period'

        markedDates={markedDates}
        onDayPress={onDayPress}
    />
  );
}