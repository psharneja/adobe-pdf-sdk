document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
    var adobeDCView = new AdobeDC.View({clientId: "c2278857841a4abb87ed00c92e18f3ba", divId: "adobe-dc-view"});
    adobeDCView.previewFile({
        content:{location: {url: "./archi.pdf"}},
        metaData:{fileName: "archi.pdf"}
    }, {});
});