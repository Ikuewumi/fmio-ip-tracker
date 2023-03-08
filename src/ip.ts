import { getApiURL } from "./main";
const lsIp = "fmioIpTrackerIp";


export const getIpAdress = async () => {
    let ip = ""
    try {
        const res = await fetch(getApiURL)
        if (!res.ok) throw Error("unknown error while getting ip");
        const json = await res.json()
        ip = json.ip
    }
    catch(e) {
        const ls = localStorage.getItem(lsIp)
        if (ls) ip = ls! 
    }
    finally{
        localStorage.setItem(lsIp, ip)
        return ip
    }
}
