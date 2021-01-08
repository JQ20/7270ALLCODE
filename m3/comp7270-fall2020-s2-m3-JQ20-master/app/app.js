import Vue from 'nativescript-vue';

import HelloWorld from './components/HelloWorld';

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;
global.baseUrl = "https://a1af688de992.ngrok.io";
global.username = "";
global.password = "";
global.gender = "";
global.age = 0;
global.coins = 0;
global.avatar = "ad";
global.malls= [
    {
      mall: "IFC Mall",
      latitude: 22.2849,
      longitude: 114.158917,
    },
    {
      mall: "Pacific Place",
      latitude: 22.2774985,
      longitude: 114.1663225,
    },
    {
      mall: "Times Square",
      latitude: 22.2782079,
      longitude: 114.1822994,
    },
    {
      mall: "Elements",
      latitude: 22.3048708,
      longitude: 114.1615219,
    },
    {
      mall: "Harbour City",
      latitude: 22.2950689,
      longitude: 114.1668661,
    },
    {
      mall: "Festival Walk",
      latitude: 22.3372971,
      longitude: 114.1745273,
    },
    {
      mall: "MegaBox",
      latitude: 22.319857,
      longitude: 114.208168,
    },
    {
      mall: "APM",
      latitude: 22.3121738,
      longitude: 114.22513219999996,
    },
    {
      mall: "Tsuen Wan Plaza",
      latitude: 22.370735,
      longitude: 114.111309,
    },
    {
      mall: "New Town Plaza",
      latitude: 22.3814592,
      longitude: 114.1889307,
    },
  ],
new Vue({

    template: `
        <Frame>
            <HelloWorld />
        </Frame>`,

    components: {
        HelloWorld
    }
}).$start();