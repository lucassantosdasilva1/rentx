import { eachDayOfInterval, format } from "date-fns";

import { MarkedDatesProps } from ".";
import { DateData } from 'react-native-calendars'

import theme from "../../styles/theme"

import {getPlatformDate} from "../../utils/getPlataformDate"



export function generateInterval(start: DateData, end: DateData){
    let interval: MarkedDatesProps = {}


    //eachDayOfInterval gera um array (ele espera uma data inicial e uma data final)
    //getPlatformDate adiciona + 1 dia a dataBuscadaNoCalendario. A dataBuscadaNoCalendario por algum motivo estava retornando com 1 dia de atraso. Por isso foi preciso esse arranjo
    //o new Date foi usado pra converter o timestamp pois o getPlataformDate espera formato Date e os parametros do eachDayOfInterval tbm são formato Date
    const intervalwithDays = eachDayOfInterval({ start: getPlatformDate(new Date(start.timestamp)), end: getPlatformDate(new Date(end.timestamp))});

    //Pegamos a variavel que é um array e esta com o intervalo de dias armazenado dentro dela, aplicamos o forEach para percorrer cada dia
    intervalwithDays.forEach( (item) => {
        const date = format(item, 'yyyy-MM-dd');

        interval = {
            ...interval,
            //cada dia funciona como uma chave e cada dia possui as propriedades que esta em MarkedDatesProps (ou seja cada dia tem sua propria cor)
            [date]: {
                color: start.dateString === date || end.dateString === date ? theme.colors.main : theme.colors.main_light,
                textColor: start.dateString === date || end.dateString === date ? theme.colors.main_light : theme.colors.main  
            }
        }
    })
    
    return interval;
}