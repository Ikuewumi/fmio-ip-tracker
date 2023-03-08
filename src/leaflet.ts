declare global {
    interface Window {
        L: any
    }
}

const L = window.L! as unknown as any;
const mapEl = document.querySelector('main#map')! as HTMLDivElement;
let globalMap : any;





export const drawMap = (lat: number, long: number) => {

    if (globalMap) {
        mapEl.classList.remove(...mapEl.className.split(' '))
        mapEl.innerHTML = ``
        globalMap.remove()
        globalMap = null
    }

    globalMap  = L.map('map').setView([lat, long], 13);
    // console.log(globalMap)
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(globalMap);
    
    
    L.marker([lat, long]).addTo(globalMap);
} 


