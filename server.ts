import { ngExpressEngine, NgSetupOptions } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { Express, Response, Request, NextFunction } from 'express';
import { enableProdMode } from '@angular/core';
import { join } from 'path';
import * as express from 'express';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

// important: leave this as require(), cause this file is built dynamically
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

(new class {
    private readonly PORT: number = process.env.PORT || 4224;

    private readonly DIST_FOLDER: string = join(process.cwd(), 'dist');
    private readonly VIEW_FOLDER: string = join(this.DIST_FOLDER, 'browser');

    private readonly USE_BROWSER_AUTH: boolean = process.env.USE_BROWSER_AUTH
        ? !!JSON.parse(process.env.USE_BROWSER_AUTH)
        : false;

    private readonly TESTER_USERNAME: string = process.env.TESTER_USERNAME || 'tester';
    private readonly TESTER_PASSWORD: string = process.env.TESTER_PASSWORD || 'password';

    private readonly templateEngine: string = 'html';
    private readonly engineSetupOptions: NgSetupOptions = {
        bootstrap: AppServerModuleNgFactory,
        providers: [
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    };

    private readonly expressApp: Express = express();

    constructor () {
        // makes server renders faster
        enableProdMode();

        this.expressApp.engine (
            this.templateEngine,
            ngExpressEngine(this.engineSetupOptions)
        );

        this.expressApp.set('view engine', this.templateEngine);
        this.expressApp.set('views', this.VIEW_FOLDER);

        if (this.USE_BROWSER_AUTH) {
            this.expressApp.use(this.customAuth.bind(this));
        }

        this.expressApp.get('*', this.handleRequests.bind(this));

        this.expressApp.listen(this.PORT, this.startCallback.bind(this));
    }

    private startCallback () : void {
        console.log(`Listening on ${this.PORT}`);
    }

    private handleRequests (req: Request, res: Response) : void {
        const view: string = 'index';
        const options: Object = { req };
        return res.render(view, options);
    }

    private getCredentials (authHeader: string) : { username: string, password: string } {
        const BEARER_SEPARATOR: string = ' ';
        const CREDENTIALS_SEPARATOR: string = ':';

        const BUFFER_ENCODING: string = 'base64';
        const STRING_ENCODING: string = 'ascii';

        const bearerString: string = authHeader.split(BEARER_SEPARATOR).pop();

        const decodedCredentials: string = new Buffer(bearerString, BUFFER_ENCODING).toString(STRING_ENCODING);
        const credentialComponents: string[] = decodedCredentials.split(CREDENTIALS_SEPARATOR);

        return {
            username: credentialComponents[0],
            password: credentialComponents[1]
        };
    }

    private customAuth (req: Request, res: Response, next: NextFunction) : Response | void {
        const UNAUTHORIZED_CODE: number = 401;
        const FORBIDDEN_CODE: number = 403;

        const authHeader: string = req.get('authorization');

        if (!authHeader) {
            res.set('WWW-Authenticate', 'Basic realm=\"Authorization Required\"');
            return res.status(UNAUTHORIZED_CODE).send('Authorization Required');
        } else {
            const credentials = this.getCredentials(authHeader);

            if ((credentials.username === this.TESTER_USERNAME && credentials.password === this.TESTER_PASSWORD)) {
                return next();
            } else {
                return res.status(FORBIDDEN_CODE).send('Access Denied (incorrect credentials)');
            }
        }
    }
});
