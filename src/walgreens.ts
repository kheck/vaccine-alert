import fetch,{Headers} from 'node-fetch';
import { VaccineQueryResult } from './vaccine-query-result';

interface WalgreensResponse {
    "appointmentsAvailable": boolean,
    "availabilityGroups": unknown[],
    "stateName":"Texas",
    "stateCode":"TX",
    "zipCode":"78757",
    "radius":25,
    "days":5
}

export async function isWalgreensAvailable(): Promise<VaccineQueryResult> {
    let result;
    try {
        result = await (await call()).json() as WalgreensResponse;
    }
    catch (error) {
        const tryAgain = await call();
        console.log(await tryAgain.text());
        console.log(error);
        throw error;
    }
    return {
        vaccinesAreAvailable: result.appointmentsAvailable,
        vendorName: "CVS",
        vendorResponse: result
    }
}

async function call() {
    return await fetch("https://www.walgreens.com/hcschedulersvc/svc/v1/immunizationLocations/availability", {
        "body": "{\"serviceId\":\"99\",\"position\":{\"latitude\":30.3568213,\"longitude\":-97.730807},\"appointmentAvailability\":{\"startDateTime\":\"2021-03-28\"},\"radius\":25}",
        "method": "POST",
        "headers": {
            "Host": "www.walgreens.com",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:84.0) Gecko/20100101 Firefox/84.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json; charset=utf-8",
            "X-XSRF-TOKEN": "aN74fVTWpgHO4g==.TT+faRm2g+31eVmqyPGHEe2QBvJzmAz6MQ5RzuM8aCc=",
            "Content-Length": "145",
            "Origin": "https://www.walgreens.com",
            "Connection": "keep-alive",
            "Referer": "https://www.walgreens.com/findcare/vaccination/covid-19/location-screening",
            "Cookie": "ak_bmsc=C578C1080B6FC74EFD3E1C997FD0BE16172F3B2FE0490000455F5F604B74F179~pl+n+qCs0P8PiHfvn1BSUNz9LOmKMzluX3y0EPpDwHViFBp8YAGb4MA9vzAOhh8ZgkN5watHTYKwf4SPSnhvB21htZSTVho5Hr2kFrkvAi+UmKQppDIG9aNtNPZiT+Cv6BAcNF3AawNi7UcuP/qxCDY0iUexa6umriK75JkzTAZBchQcNYfgkLcyAiD5ScWykqOTjNJB3A2b9GbgIFk5IW2t1mCVjKfbI5c31OQS41d70=; akavpau_walgreens=1616863955~id=adac2797263b794594e9795885c44153; bm_sz=2C50C71A4C3902B4473C9263A27CB8DC~YAAQLzsvF9jmBll4AQAAMCmMdAutRrC3TNkQIxrqB1GATbHr/Gjz2tUzej4KGRL4zPxrCWXaqM+lF7flBsi/PDDLsPYeWM3ZjpUZTIG4gVX+dwBJtdrV3RfUF6awAXkFlpi+95Dnc+mL+kxznvJ6wlYxu9ncc6r2LOqkUMPup6PUwet5UoZ7oJ7b/m7bg9I23TFN; _abck=2CF7B79B538A6D75D235B31C894080F3~0~YAAQKDsvFzl0CnJ4AQAAZXSVdAWP7vCylASksPDNTZ67fodGgrRHalCjfXIFhVHhEYxn3TYkOu39TMqA3O8l/8nX0MGNqNLvk71QpZFiv1Wc0EvhtolCGandB/JHaCqR0b8IyXkgrzaaVZLEFSXtkrMkYbebC0gByxwYp2su3vKx8Qpm5JQL9UvDao9CnV1dnFJJJ5iM+BZKl4n50e38nDDK2Oh5frHTKsdbqreJQdRSwAz3tyoKT/KDxCKGOCMQ2B0kcb4tH6LFigXjELvgstd2nNQyat7bZbGqG1UiHQeHzlrvevvdDcoG/8TuxAYk0egDlyPYwJEsmJpMpbhmO6tB2FueVvErx3pGCP1KM0DyDoVgWSjssHyRBhaQYH3h5GysF7daKgVdwBxarAIW+Q4aoISC/BdgyF/HKQ==~-1~-1~-1; wag_sid=opr91gtdanrx526n7i8dtt5n; uts=1616863046501; AMCV_5E16123F5245B2970A490D45%40AdobeOrg=-1124106680%7CMCIDTS%7C18714%7CMCMID%7C88677635337522108802634755757480570305%7CMCOPTOUT-1616870273s%7CNONE%7CvVersion%7C5.2.0; mbox=session#95dc4df03ef04a8590e610e423e93421#1616864907; at_check=true; session_id=341ee453-a2e2-47ec-9277-4c2391ce5a86; dtCookie=3$428672D765A8288D008BBBF692FAE10E|0eed2717dafcc06d|1; XSRF-TOKEN=B7F78lumNBxk+g==.KCm1RAYxKO4MIroayZ50RIwhm+FOERnel6QbeEdLFMI=; bm_sv=82E3301A64DDC70D7DAB792646CB162C~hPNcRB1rjCPyyKgB47M4Rmr/Ox2O9BFI029izlgvM7vTThWZBYAzp+rAcosryfT0wRVyxLfxhdbFtnt1bCJdVX2iy8S5K/JUO7RU5rb0vA5PUDl8BVVZXX/LyfMBHCupzmXdg5isP+P46nmq9d1mrQPBCcKhc1kxCFg/ihm7cSQ=; AMCVS_5E16123F5245B2970A490D45%40AdobeOrg=1; gRxAlDis=N; bm_mi=1FE1A10FB9EBA67BF2868D66630B45EC~iG2kxlR5TUCsK0M7/XMC8rJLjEgG8DXivzcB57a2ZsJGJKcrbuwIR4UunY6iQ86AK8sq75cOaatkooEjV7a6giPUzCINqtobiO15qK7Fb4cXdjiFW06A8ieQ7smGEbKv60/rHjMWClUF8wTHaWTkjjiq67OsgGyNa9hpa38sojLQONyDV4/nNwu829LhycCPkLUgf/cEvBxqkZ8L4Bx0RH8AH6/EopRdKWOj0F2+jpE+GUtveu+CadPTT0GN619Co9rJtace+bFbZ3ay7xQKwg==; fc_vnum=1; fc_vexp=true; firstVisit=fc_fVisit; USER_LOC=2%2BsKJSc9HtJ7n0Wp63Ft97Bloi7dEmLjHrNDHtTLIUck1eeLPJ6hd0ljDA5Jtoqd",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
        },
    });

}