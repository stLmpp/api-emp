import { Class } from 'type-fest';

import { MapProfile } from './map-profile';
import { MapProfileNotFoundError } from './map-profile-not-found-error';

export class MapperService {
  private readonly _profiles = new Map<Class<any>, Map<Class<any>, MapProfile<any, any>>>();

  private _getOrCreateProfiles<From, To>(from: Class<From>): Map<Class<any>, MapProfile<From, To>> {
    let mapProfiles = this._profiles.get(from);
    if (!mapProfiles) {
      mapProfiles = new Map();
      this._profiles.set(from, mapProfiles);
    }
    return mapProfiles;
  }

  private _getProfileOrFail<From, To>(from: Class<From>, to: Class<To>): MapProfile<From, To> {
    const mapProfile = this._profiles.get(from)?.get(to);
    if (!mapProfile) {
      throw new MapProfileNotFoundError(from, to);
    }
    return mapProfile;
  }

  create<From, To>(from: Class<From>, to: Class<To>): MapProfile<From, To> {
    const mapProfile = new MapProfile<From, To>(from, to, this);
    this._getOrCreateProfiles<From, To>(from).set(to, mapProfile);
    return mapProfile;
  }

  map<From, To>(from: Class<From>, to: Class<To>, value: From): To;
  map<From, To>(from: Class<From>, to: Class<To>, value: From[]): To[];
  map<From, To>(from: Class<From>, to: Class<To>, value: From | From[]): To | To[] {
    return this._getProfileOrFail(from, to).map(value);
  }

  has<From, To>(from: Class<From>, to: Class<To>): boolean {
    return !!from && !!to && !!this._profiles.get(from)?.has(to);
  }

  get<From, To>(from: Class<From>, to: Class<To>): MapProfile<From, To> {
    return this._getProfileOrFail(from, to);
  }
}

export const mapperService = new MapperService();
export const createMapperProfile = mapperService.create.bind(mapperService);
