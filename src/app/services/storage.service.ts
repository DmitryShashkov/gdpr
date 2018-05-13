import {Injectable} from "@angular/core";

@Injectable()
export class StorageService {
    // noinspection JSMethodCanBeStatic
    public save (key: string, value: any) : void {
        const stringValue: string = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
    }
    
    // noinspection JSMethodCanBeStatic
    public read<T> (key: string) : T {
        const stringValue: string = localStorage.getItem(key);

        if (!stringValue) { return null; }

        return JSON.parse(stringValue);
    }
}
