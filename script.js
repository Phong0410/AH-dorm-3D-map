<!-- Use for Github Page Deployment -->

require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/GeoJSONLayer",
    "esri/layers/SceneLayer",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/request",
    "esri/symbols/FillSymbol3DLayer",
], function (
    Map,
    SceneView,
    GeoJSONLayer,
    SceneLayer,
    GraphicsLayer,
    Graphic,
    esriRequest,
    FillSymbol3DLayer
) {
    var createGraphic = function (data) {
        return new Graphic({
            geometry: data,
            symbol: data.symbol,
            attributes: data,
            popupTemplate: data.popupTemplate,
        });
    };

    const json_options = {
        query: {
            f: "json",
        },
        responseType: "json",
    };

    const map = new Map({
        basemap: "topo-vector",
    });

    const geojson_AH_BlockLayer = new GeoJSONLayer({
        // url: "./AH_data/loadblockdata.php",
        url: "./block.json",
        elevationInfo: {
            mode: "relative-to-ground",
        },
    });
    const geojson_AH_GlassLayer = new GeoJSONLayer({
        // url: "./AH_data/loadglassdata.php",
        url: "./glass.json",
        elevationInfo: {
            mode: "relative-to-ground",
        },
    });
    const geojson_AH_DoorLayer = new GeoJSONLayer({
        // url: "./AH_data/loaddoordata.php",
        url: "./door.json",
        elevationInfo: {
            mode: "relative-to-ground",
        },
    });
    const geojson_AH_RoofLayer = new GeoJSONLayer({
        // url: "./AH_data/loadroofdata.php",
        url: "./roof.json",
        elevationInfo: {
            mode: "relative-to-ground",
        },
    });
    const geojson_AH_BalconyLayer = new GeoJSONLayer({
        // url: "./AH_data/loadbalconydata.php
        url: "./balcony.json",
        elevationInfo: {
            mode: "relative-to-ground",
        },
    });

    geojson_AH_BlockLayer.renderer = {
        type: "simple",
        symbol: {
            type: "polygon-3d",
            symbolLayers: [
                {
                    type: "extrude",
                    material: {
                        color: [140, 155, 207, 1],
                    },
                    edges: {
                        type: "solid",
                        color: [35, 48, 92, 0.1],
                    },
                },
            ],
        },
        visualVariables: [
            {
                type: "size",
                axis: "height",
                valueExpression: "$feature['height']",
            },
        ],
    };
    geojson_AH_GlassLayer.renderer = {
        type: "simple",
        symbol: {
            type: "polygon-3d",
            symbolLayers: [
                {
                    type: "extrude",
                    material: {
                        color: [245, 240, 225, 0.5],
                    },
                    edges: {
                        type: "solid",
                        color: [50, 50, 50, 0.1],
                    },
                },
            ],
        },
        visualVariables: [
            {
                type: "size",
                axis: "height",
                valueExpression: "$feature['height']",
            },
        ],
    };
    geojson_AH_DoorLayer.renderer = {
        type: "simple",
        symbol: {
            type: "polygon-3d",
            symbolLayers: [
                {
                    type: "extrude",
                    material: {
                        color: [255, 255, 255, 0.7],
                    },
                    edges: {
                        type: "solid",
                        color: [50, 50, 50, 0.1],
                    },
                },
            ],
        },
        visualVariables: [
            {
                type: "size",
                axis: "height",
                valueExpression: "$feature['height']",
            },
        ],
    };
    geojson_AH_RoofLayer.renderer = {
        type: "simple",
        symbol: {
            type: "polygon-3d",
            symbolLayers: [
                {
                    type: "extrude",
                    material: {
                        color: [145, 145, 145, 1],
                    },
                    edges: {
                        type: "solid",
                        color: [50, 50, 50, 0.1],
                    },
                },
            ],
        },
        visualVariables: [
            {
                type: "size",
                axis: "height",
                valueExpression: "$feature['height']",
            },
        ],
    };
    geojson_AH_BalconyLayer.renderer = {
        type: "simple",
        symbol: {
            type: "polygon-3d",
            symbolLayers: [
                {
                    type: "extrude",
                    material: {
                        color: [140, 155, 207, 1],
                    },
                    edges: {
                        type: "solid",
                        color: [50, 50, 50, 0.1],
                    },
                },
            ],
        },
        visualVariables: [
            {
                type: "size",
                axis: "height",
                valueExpression: "$feature['height']",
            },
        ],
    };

    geojson_AH_BlockLayer.popupEnabled = false;
    geojson_AH_GlassLayer.popupEnabled = false;
    geojson_AH_DoorLayer.popupEnabled = false;
    geojson_AH_RoofLayer.popupEnabled = false;
    geojson_AH_BalconyLayer.popupEnabled = false;

    map.add(geojson_AH_BlockLayer);
    map.add(geojson_AH_GlassLayer);
    map.add(geojson_AH_DoorLayer);
    map.add(geojson_AH_RoofLayer);
    map.add(geojson_AH_BalconyLayer);

    const view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
            position: [106.810076, 10.882002, 100],
            heading: -110,
            tilt: 60,
        },
    });
});
