// import { z } from "zod";
import { checkString } from "./ipify";
import { loadIp } from "./main";

const header = document.querySelector('header')! as HTMLElement;
const form = header.querySelector('form')! as HTMLFormElement;
const formIp = form.querySelector('input')! as HTMLInputElement;

const section = header.querySelector('section')! as HTMLDivElement;
const location = section.querySelector('[data-location]>span')! as HTMLSpanElement;
const ip = section.querySelector('[data-ip]>span')! as HTMLSpanElement;
const timezone = section.querySelector('[data-timezone]>span')! as HTMLSpanElement;
const isp = section.querySelector('[data-isp]>span')! as HTMLSpanElement;


const fig = document.querySelector('figure')! as HTMLDivElement;

export const message = (msg = "") => {
    if (msg) {
        fig.classList.add('active')
        fig.textContent = msg
    }
    else {
        fig.classList.remove('active')
    }
} 



form.addEventListener('submit', (e) => {
    e.preventDefault()
    const {ip, isDomain} = checkString(formIp.value);
    loadIp(ip, isDomain)
})







export const fillIpFields = (info: IpResponse) => {
    const markUpData = {
        location: `${info.location.region}, ${info.location.country} ${info.location.geonameId}`,
        ip: info.ip,
        timezone: info.location.timezone,
        isp: info.isp
    }


    location.textContent = markUpData.location
    ip.textContent = markUpData.ip
    timezone.textContent = `UTC ${markUpData.timezone}`
    isp.textContent = markUpData.isp
}


// fillIpFields()




export {}