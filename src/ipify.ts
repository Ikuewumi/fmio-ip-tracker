import { z } from "zod";
import { getIpAdress } from "./ip";
import { ipifyKey } from "./main";

declare global {
    interface IpResponse {
    "ip": string,
    "location": {
        "country": string,
        "region": string,
        "city": string,
        "lat": number,
        "lng": number,
        "postalCode": string,
        "timezone": string,
        "geonameId": number
    },
    "domains": string[],
    "as": {
        "asn": number,
        "name": string,
        "route": string,
        "domain": string,
        "type": string
    },
    "isp": string
    }
}

export const checkString = (str: string) => {
    let ip: string;
    let isDomain = false;
    const ipRes = z.string().min(1).regex(/^([\d.]+)$/g).safeParse(str);
    if (!ipRes.success) { 
        // TODO: change to domain adress regex
        const domainRes = z.string().min(1).url().safeParse(str);
        if (!domainRes.success) throw Error('invalid string')
        isDomain = true
        ip = domainRes.data
    }
    else { ip = ipRes.data }

    return {ip, isDomain}
}


export const searchIp = async (ip: string, isDomain: boolean = false) => {
    let uIp: string;
    if(!ip) { uIp = await getIpAdress();} 
    else { uIp = ip }
    if (!uIp) throw Error('could not get any valid iP');


    const link = isDomain ? 
        `https://geo.ipify.org/api/v2/country,city?apiKey=${ipifyKey}&domain=${ip}`:
        `https://geo.ipify.org/api/v2/country,city?apiKey=${ipifyKey}&ipAddress=${ip}`;



    const res = await fetch(link)
    if (!res.ok) throw Error("could not get ip location")
    const json = await res.json() as IpResponse
    return json
}


export {}