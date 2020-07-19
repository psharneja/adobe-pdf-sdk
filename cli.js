#!/usr/bin/env node
const PDFToolsSdk = require('@adobe/documentservices-pdftools-node-sdk');



    if(process.argv.length < 4){
    console.warn('MISSING ARGUMENTS: Exception encountered while executing operation, missing arguments');
    process.exit(1)
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
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });
} catch (err) {
    console.log('Exception encountered while executing operation', err);
}
