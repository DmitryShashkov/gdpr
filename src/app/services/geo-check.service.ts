import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Data that may (or may not) be returned
 * by IP-locating endpoint
 */
interface IpInfoResponse {
    city?: string;
    country?: string;
    hostname?: string;
    ip?: string;
    loc?: string;
    org?: string;
    region?: string;
}

/**
 * Service that allows to suggest user geo-position (country, for instance).
 * Important idea is that user shouldn't know his position is tracked,
 * so we don't use navigator.geolocation.getCurrentPosition (cause it will ask user's permission):
 * instead rely on position determined by user's IP address
 */
@Injectable()
export class GeoCheckService {
    // key in local storage to contain country data
    private readonly SUGGESTED_COUNTRY_KEY = 'country';

    // suggested country code
    private _suggestedUserCountry: string;

    public get suggestedUserCountry () : string {
        return this._suggestedUserCountry;
    }

    constructor (
        private http: HttpClient
    ) {
        // first check if we've got a suggestion already
        const storedCountry = localStorage.getItem(this.SUGGESTED_COUNTRY_KEY);

        if (storedCountry) {
            // if so, keep it
            this._suggestedUserCountry = storedCountry;
        } else {
            // otherwise, try to obtain user's country from 3rd party service
            this.http.get('https://ipinfo.io')
                .toPromise()
                .then((ipInfo: IpInfoResponse) => {
                    // const ipInfo: IpInfoResponse = res.json();

                    this._suggestedUserCountry = ipInfo.country;
                    localStorage.setItem(this.SUGGESTED_COUNTRY_KEY, this._suggestedUserCountry);
                });
        }
    }
}
