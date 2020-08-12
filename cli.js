#!/usr/bin/env node

const PDFToolsSdk = require('@adobe/documentservices-pdftools-node-sdk');
    if(process.argv.length < 4) {
        showError(1000)
}  
  const [,, ...argv] = process.argv;

//setting pdf configs
const pdfConfigs = (htmlToPDFOperation) => {
    const pageLayout = new PDFToolsSdk.CreatePDF.options.PageLayout();
    pageLayout.setPageSize(8, 16);

    const htmlToPdfOptions = new PDFToolsSdk.CreatePDF.options.html.CreatePDFFromHtmlOptions.Builder()
        .includesHeaderFooter(true)
        .withPageLayout(pageLayout)
        .build();
    htmlToPDFOperation.setOptions(htmlToPdfOptions);
};

function showError(error = 999) {
    let msg;
    if(error === 400) {
        msg = 'Please make sure there is an "index.html" and static assets  present in the zip file you passed';
    } else if (error === 999) {
        msg = `There seems to be an issue. The filename you passed doesn't exist. consider doing a spellcheck once.`;
    } else if (error === 1000){
        msg = 'Please pass the path to zip file containing html and pdf save location as arguments 1 and 2 respectively';
    } else {
        msg = error;
    }
    console.warn(`ERROR: ${msg}`);
    process.exit(0);

}

try {
    // create credentials instance.
    const credentials =  PDFToolsSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile(`${__dirname}/config/pdftools-api-credentials.json`)
        .build();

    // Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFToolsSdk.ExecutionContext.create(credentials),
        htmlToPDFOperation = PDFToolsSdk.CreatePDF.Operation.createNew();

    // Set operation input from a source file.
    const input = PDFToolsSdk.FileRef.createFromLocalFile(argv[0]);
    htmlToPDFOperation.setInput(input);

    // Provide any custom configuration options for the operation.
    pdfConfigs(htmlToPDFOperation);

    // Execute the operation and Save the result to the specified location.
    htmlToPDFOperation.execute(executionContext)
        .then(result => result.saveAsFile(argv[1]))
        .catch(err => {
            if(err instanceof PDFToolsSdk.Error.ServiceApiError
                || err instanceof PDFToolsSdk.Error.ServiceUsageError) {
                showError(err.statusCode);
            } else {
                showError(err.statusCode);
            }
        });
} catch (err) {
    showError(err)
}
