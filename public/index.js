var fileToLoad = document.querySelector('#file-upload');
const clientID = "c2278857841a4abb87ed00c92e18f3ba";

let fileLoad;

const profile = {
	userProfile: {
		name: 'Prabhsimran Singh',
		firstName: 'Prabhsimran',
		lastName: 'Singh',
		email: 'psharneja+adobeChallenge@googlemail.com',
	}
}

function loadPdf(adobeDCView, viewerConfig) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
            	var filePromise = Promise.resolve(e.target.result);
            	adobeDCView.previewFile({
            		content: {
            			promise: filePromise
            		},
            		metaData: {
            			fileName: fileLoad.name
            		}
            	}, viewerConfig)
            };
            reader.readAsArrayBuffer(fileLoad);
        
}

    fileToLoad.addEventListener('change', ev => {
        document.querySelector('#navi-bar').classList.add('hidden');
        document.querySelector('#viewer').classList.remove('hidden');
        fileLoad = fileToLoad.files[0];
        displayPdfInFullWindowView();

    })

    /** To view PDF in Full window  */
$('#full-window-btn').click(function () {
	displayPdfInFullWindowView();
	
});

/** To view PDF in Sized container  */
$('#sized-container-btn').click(function () {
	displayPdfInSizedContainerView();
	
});

/** To view PDF in Inline view */
$('#in-line-btn').click(function () {
	displayPdfInLineView();
	
});

function trackPdfEvents(adobeDCView) {
	adobeDCView.registerCallback(AdobeDC.View.Enum.CallbackType.EVENT_LISTENER, function (event) {
		switch (event.type) {
			case "DOCUMENT_OPEN":
				gtag('event', 'DOCUMENT_OPEN', {
					'event_label': 'DOCUMENT_OPEN'
				});
				break;
			case 'PAGE_VIEW':
				gtag('event', 'PAGE_VIEW', {
					'event_label': 'PAGE_VIEW'
				});
				break;
			case 'DOCUMENT_DOWNLOAD':
				gtag('event', 'DOCUMENT_DOWNLOAD', {
					'event_label': 'DOCUMENT_DOWNLOAD'
				});
				break;
			case 'TEXT_COPY':
				gtag('event', 'TEXT_COPY', {
					'event_label': 'TEXT_COPY'
				});
				break;
		}
	}, {
		enablePDFAnalytics: true
	});
}


function displayPdfInSizedContainerView() {
    $('#adobe-dc-sized-container').show();
	$('#adobe-dc-sized-container').siblings().hide();
	const viewerConfig = {
		"embedMode": "SIZED_CONTAINER"
	};
	var adobeDCView = new AdobeDC.View({
		clientId: clientID,
		divId: "adobe-dc-sized-container",
	});	
    loadPdf(adobeDCView, viewerConfig);
    trackEvents(adobeDCView);

};

function displayPdfInLineView() {
	$('#adobe-dc-in-line').show();
	$('#adobe-dc-in-line').siblings().hide();
	const viewerConfig = {
		"defaultViewMode": "FIT_PAGE",
		"embedMode": "IN_LINE"
	};
	var adobeDCView = new AdobeDC.View({
		clientId: clientID,
		divId: "adobe-dc-in-line",
	});	
    loadPdf(adobeDCView, viewerConfig);
    trackEvents(adobeDCView);

};

function displayPdfInFullWindowView() {
    $('#adobe-dc-full-window').show();
	$('#adobe-dc-full-window').siblings().hide();
	const viewerConfig = {
		"defaultViewMode": "FIT_PAGE",
		"embedMode": "FULL_WINDOW",
		"showLeftHandPanel": false
	};
	var adobeDCView = new AdobeDC.View({
		clientId: clientID,
		divId: "adobe-dc-full-window",
	});
	
	loadPdf(adobeDCView, viewerConfig);
	trackEvents(adobeDCView);
	
	adobeDCView.registerCallback(
		AdobeDC.View.Enum.CallbackType.GET_USER_PROFILE_API,
		function () {
			return new Promise((resolve, reject) => {
				resolve({
					code: AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
					data: profile
				})
			})
		});
};