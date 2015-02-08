var phantom = require('phantom');

phantom.create(function(ph) {
    url = "http://www.cricbuzz.com/live-cricket-scores/13848/england-vs-india-3rd-match-india-and-england-in-australia-tri-series-2015";
    ph.createPage(function(page) {
            return page.open(url, function(status) {
                console.log("opened site? ", status);
                page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
                    //jQuery Loaded.
                    //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
                    setTimeout(function() {
                        return page.evaluate(function() {
                            //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
                            var h2Arr = [],
                                pArr = [];
                            $('.batteamdesc').find('td').each(function() {
                                h2Arr.push($(this).html());
                            });
                            $('p').each(function() {
                                pArr.push($(this).html());
                            });

                            return {
                                h2: h2Arr,
                                p: pArr
                            };
                        }, function(result) {
                            console.log(result);
                            ph.exit();
                        });
                    }, 5000);

                });
            });
        });
});