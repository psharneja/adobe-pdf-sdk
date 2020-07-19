(function pdfViewer() {

})()
document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
    var adobeDCView = new AdobeDC.View({clientId: "9465614f4e134b7b8d74adda76d48c46", divId: "adobe-dc-view"});
    adobeDCView.previewFile({
        content:{location: {url: "./archi.pdf"}},
        metaData:{fileName: "archi.pdf"}
    }, {});
});