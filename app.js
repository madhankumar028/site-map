"use strict";

import utilService from "./src/utils/util";

let appContainer = {
    
    mockData: {},
    
    render: async () => {
        let view = ``;
        return view;
    },

    afterRender: async () => {
        const vacations = appContainer.getVacations();
        const destinations = appContainer.getDestinations();

        console.log(vacations);
        console.log(destinations);
    },
    
    getDestinations: () => {

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
    
    getVacations: () => {
        return appContainer.mockData['vacations'].map(vacation => {
            return vacation.text;
        });
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

function filterUniqueList(list) {

}

async function init() {
    await getMockData();
    let view = await appContainer.render();
    await appContainer.afterRender();

}

window.addEventListener('load', init);

export default appContainer;
