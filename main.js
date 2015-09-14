window.onload = function() {
    var vizjson_url = 'https://team.cartodb.com/u/aureliamoser/api/v2/viz/44acbe86-5970-11e5-8b9a-0e018d66dc29/viz.json'; // <-- Paste viz.json URL between quotes

    var options = {
           sql: "SELECT * FROM skorea_provinces",
           // cartocss: ""
       }

       var sublayers = [];

       // instantiate map object from Leaflet
       var mapObj = new L.Map(map, {  // <-- Replace map_id with your #id for rendering
           center: [36.5500, 126.9667], // Seoul, South Korea
           zoom: 7 // zoom projection to adjust starting point zoom
       });

       // add basemap tiles
       L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
           attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       }).addTo(mapObj);

       // add data tile layers here (if you have multiple layers, you can manipulate them in js here)
       cartodb.createLayer(mapObj,vizjson_url)
           .addTo(mapObj)
           .done(function(layer) {
               console.log("Map successfully created.");
               sublayers[0] = layer.getSubLayer(0);
               sublayers[0].set(options); // altering the SQL and CartoCSS; see above
           })
           .error(function(err) {
               console.log("Map not created: " + err);
           });
    }