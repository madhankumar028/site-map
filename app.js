"use strict";

import utilService from "./src/utils/util";

const destinationContainer  = null || document.getElementById('destination');
const vacationContainer     = null || document.getElementById('vacation');

let appContainer = {
    
    mockData: {},
    
    async render() {
        destinationContainer.innerHTML = appContainer.getView('Destinations', appContainer.getDestinations());
        vacationContainer.innerHTML = appContainer.getView('Themed vacations', appContainer.mockData['vacations']);
    },

    async afterRender() {
        const destinations = appContainer.getDestinations();
        const vacations = appContainer.mockData['vacations'];
        await appContainer.render();
    },
    
    getDestinations() {

        let destinations = appContainer.mockData['destinations'];
        const distinctDestinations = Array.from(new Set(destinations.map(destination => destination.text)))
            .map(item => {
                return {
                    text: item,
                    url: destinations.find(destionationName => destionationName.text === item).url
                }
            });

        return distinctDestinations;
    },

    getView(containerName, containerObjects) {
        let view = /*HTML*/`
            <h5 class="title container-title">${containerName}</h5>
            <div class="container">
                ${containerObjects.map(object => {
                    return `
                        <ul class="list">
                            <li class="item">
                                <a class="url" href=${object.url} target="blank">${object.text.toLowerCase()}</a>
                            </li>
                        </ul>
                    `
                }).join('')}
            </div>
        `;

        return view;
    }
}

async function getMockData() {
    let requestData = {
        url: `./src/utils/db.json`,
        method: 'GET',
    }
    await utilService.httpClient(requestData)
        .then(res => {
            appContainer.mockData = res;
        });
}

async function init() {
    await getMockData();
    await appContainer.afterRender();
}

window.addEventListener('load', init);

export default appContainer;
