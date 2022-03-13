import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg'
import { carDTO } from '../../DTO/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccesoryIcon';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface carData {
  brand: string;
  name: string;
  rent: {
    period: string,
    price: string
  }
  thumbnail: string;
}

interface props extends RectButtonProps {
  data: carDTO;
}

export function Car({ data, ...rest } : props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return ( 
    <Container {...rest}>
        <Details>
            <Brand>{data.brand}</Brand>
            <Name>{data.name}</Name>
            
            <About>
                <Rent>
                    <Period>{data.rent.period}</Period>
                    <Price>{`R$ ${data.rent.price}`}</Price>
                </Rent>
                <Type>
                  <MotorIcon />
                </Type>
            </About>

            
        </Details>
        
        <CarImage 
          source={{ uri: data.thumbnail}}
          resizeMode="contain"
        />
    </Container>
  );
}