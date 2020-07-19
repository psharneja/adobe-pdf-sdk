let viewerConfig = {
		"defaultViewMode": "FIT_PAGE",
		"embedMode": "IN_LINE"
};

function loadPdf(file) {
        var adobeDCView = new AdobeDC.View({clientId: "c2278857841a4abb87ed00c92e18f3ba", divId: "loader"});
        var reader = new FileReader();
		reader.onloadend = function (e) {
			var filePromise = Promise.resolve(e.target.result);
			adobeDCView.previewFile({
				content: {
					promise: filePromise
				},
				metaData: {
					fileName: file.name
				}
			}, viewerConfig)
		};
		reader.readAsArrayBuffer(file);
        
}
    var fileToLoad = document.querySelector('#file-upload');
    fileToLoad.addEventListener('change', ev => {
        console.log(fileToLoad.files);
        document.querySelector('#navi-bar').classList.add('hidden');
        document.querySelector('#loader').classList.remove('hidden');
        loadPdf(fileToLoad.files[0]);
    })
