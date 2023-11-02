import Api from '../Api';
import {urlApi} from '../../../config/ApiConfig';

export let estatesWS = {
  createEstate: async function (
    street,
    addressNumber,
    floor,
    neighborhood,
    state,
    country,
    estateType,
    coveredSquareMeters,
    semiUncoveredSquaremeters,
    uncoveredSquareMeters,
    roomsAmount,
    bathroomsAmount,
    bedroomsAmount,
    terrace,
    balcony,
    garage,
    storage,
    frontOrBack,
    antiquity,
    orientation,
    amenites,
    status,
    price,
    currency,
    latitude,
    longitude,
    realEstateId,
    pictures,
  ) {
    return await Api.post(urlApi.estate.createEstate, {
      street,
      addressNumber,
      floor,
      neighborhood,
      state,
      country,
      estateType,
      coveredSquareMeters,
      semiUncoveredSquaremeters,
      uncoveredSquareMeters,
      roomsAmount,
      bathroomsAmount,
      bedroomsAmount,
      terrace,
      balcony,
      garage,
      storage,
      frontOrBack,
      antiquity,
      orientation,
      amenites,
      status,
      price,
      currency,
      latitude,
      longitude,
      realEstateId,
      pictures,
    });
  },
  getEstatesByUserId: async function (id) {
    return await Api.get(urlApi.estate.getEstateByUser + id);
  },
};