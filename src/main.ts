import "./style.scss";
import "./markUp";

import { searchIp } from "./ipify";
import { fillIpFields, message } from "./markUp";
import { drawMap } from "./leaflet";

export const ipifyKey = "at_vMArNRp952hx9ffFgRluPiUUCTPQb";
export const getApiURL = "https://api.ipify.org?format=json";

export const loadIp = async (ipAddress: string, isDomain = false) => {
    try {
        message('loading the input ip adress')
        const ipInfo = await searchIp(ipAddress, isDomain)
        fillIpFields(ipInfo)
        drawMap(ipInfo.location.lat, ipInfo.location.lng)
        message()
    }
    catch(e) {
        message("something went wrong! could not find your ip adress!")
    }
}


export const setup = () => {
    message('loading your current ip adress')
    loadIp("")
}


setup()
