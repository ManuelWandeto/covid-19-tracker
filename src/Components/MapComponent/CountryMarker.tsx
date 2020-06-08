import React from 'react';
import { StateData } from '../../shared/interfaces';
import { CircleMarker } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import CountryPopup from './Popup/Popup';
import {scaleSqrt} from 'd3-scale';

//TODO: Find a better way to implement state/country flags

function CountryMarker (props: {currentZoom: number, highestTotalCase: number, country: StateData}) {
    const markerStyles = {
        fillOpacity: .1,
        weight: 2,
        fillColor: '#EE2934',
        color: '#EE2934',
        opacity: .8
    }
    const {country, currentZoom, highestTotalCase} = props;
    if(country.states && currentZoom > 3.8) {
        return <>
            {country.states.map(state => {
                const latLng: LatLngExpression = [state.latLng.latitude, state.latLng.longitude];
                return <CircleMarker 
                key = {state.name}
                center = {latLng}
                radius = {calculateMarkerRadius(state.confirmed, highestTotalCase)}
                {...markerStyles}
                >
                    <CountryPopup 
                    {...state}
                    />
                </CircleMarker>
            })}
        </>
    } else {
        const latLng: LatLngExpression = [country.latLng.latitude, country.latLng.longitude]
        return (
            <CircleMarker 
                key = {country.name}
                center = {latLng}
                radius = {calculateMarkerRadius(country.confirmed, highestTotalCase)}
                {...markerStyles}
                >
                    <CountryPopup 
                    {...country}
                    />
                </CircleMarker>
        );
    }
}

function calculateMarkerRadius(confirmed: number, highestTotalCase: number): number {
    const interpolate =  scaleSqrt()
                        .domain([1, highestTotalCase])
                        .range([10, 50]);

    return interpolate(confirmed);
}

export default CountryMarker;