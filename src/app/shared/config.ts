import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'http://127.0.0.1:';
    defaultPort='5000';
    // public ApiUrl = 'api/';
    public ServerWithPort = this.Server + this.defaultPort;
}
