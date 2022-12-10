export interface AppConfig {
    port: number;
}


export class AppConfiguration {
    static getConfig () : AppConfig {
        return {
            port: 5555
        }
    }
}
