import SpeedSvg from '../assets/speed.svg'
import AccelerationSvg from '../assets/acceleration.svg'
import ForceSvg from '../assets/force.svg'
import GasolineSvg from '../assets/gasoline.svg'
import HybridSvg from '../assets/hybrid.svg'
import EnergySvg from '../assets/energy.svg'
import ExchangeSvg from '../assets/exchange.svg'
import PeopleSvg from '../assets/people.svg'


export function getAccessoryIcon(type: string) {
    switch (type) {
        case 'speed':
            return SpeedSvg;
        case 'acceleration':
            return AccelerationSvg;
        case 'turning_diameter':
            return ForceSvg;
        case 'hybrid_motor':
            return HybridSvg;
        case 'electric_motor':
            return EnergySvg;
        case 'gasoline_motor':
            return GasolineSvg;
        case 'exchange':
            return ExchangeSvg;
        case 'seats':
            return PeopleSvg;

        default:
            return SpeedSvg;
    }
}