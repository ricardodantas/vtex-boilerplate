casper.test.begin('[HOME] Verificar classes gerais',function suite(test) {
    casper.start("http://localhost:8080/templates/x-home.html", function() {


        test.assertExists('#x-header');
        test.assertExists('#x-footer');
        test.assertExists('.x-wrapper');
        test.assertExists('.x-main');
        test.assertExists('[id="header-tags"]','[<vtex:metaTags />] Vtex subtemplate included.');

    });

    casper.run(function() {
        test.done();
    });
});


casper.test.begin('[PRODUCT LIST] Verificar classes gerais',function suite(test) {
    casper.start("http://localhost:8080/templates/x-product-list.html", function() {

        test.assertExists('.x-breadcrumb');
        test.assertExists('#x-header');
        test.assertExists('#x-footer');
        test.assertExists('.x-wrapper');
        test.assertExists('.x-main');
        test.assertExists('[id="header-tags"]','[<vtex:metaTags />] Vtex subtemplate included.');
    });

    casper.run(function() {
        test.done();
    });
});


casper.test.begin('[PRODUCT] Verificar classes gerais',function suite(test) {
    casper.start("http://localhost:8080/templates/x-product.html", function() {

        test.assertExists('.x-breadcrumb');
        test.assertExists('#x-header');
        test.assertExists('#x-footer');
        test.assertExists('.x-wrapper');
        test.assertExists('.x-main');
        test.assertExists('[id="header-tags"]','[<vtex:metaTags />] Vtex subtemplate included.');

    });

    casper.run(function() {
        test.done();
    });
});


casper.test.begin('[STANDARD] Verificar classes gerais', function suite(test) {
    casper.start("http://localhost:8080/templates/x-standard.html", function() {

        test.assertExists('.x-breadcrumb');

        test.assertExists('#x-header');
        test.assertExists('#x-footer');
        test.assertExists('.x-wrapper');
        test.assertExists('.x-main');
        test.assertExists('[id="header-tags"]','[<vtex:metaTags />] Vtex subtemplate included.');

    });

    casper.run(function() {
        test.done();
    });
});
