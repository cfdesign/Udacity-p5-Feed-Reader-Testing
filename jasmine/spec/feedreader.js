//**** Dear reviewer this is a student comment.
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined & not empty', function() {
            //**** check each item in the allFeeds array
            allFeeds.forEach(function(feedItem){
                //**** make sure the 'url' key exsists
                expect(feedItem.url).toBeDefined();
                //**** make sure the 'url' value exsists
                expect(feedItem.url.length).not.toBe(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined & not empty', function() {
            //**** check each item in the allFeeds array
            allFeeds.forEach(function(feedItem){
                //**** make sure the 'name' key exsists
                expect(feedItem.name).toBeDefined();
                //**** make sure the 'name' value exsists
                expect(feedItem.name.length).not.toBe(undefined);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        //**** the body is used to toggle a class for the menu.
        const body = document.querySelector('body');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('hidden by default', function() {
            //**** menu-hidden class contains CSS to hide the menu off canvas/screen.
            expect(body.classList.contains('menu-hidden')).toEqual(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when menu icon clicked', function() {
            //**** menu-icon-link class is an event listener toggle button.
            const target = document.querySelector('.menu-icon-link');

            //**** ensure each click will toggle the class, to show/hide the menu.
            target.click();
            expect(body.classList.contains('menu-hidden')).toEqual(false);

            target.click();
            expect(body.classList.contains('menu-hidden')).toEqual(true);
        });

    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            //**** app.js loadFeed will use 'done' callback to return a function
            loadFeed(0, done);
        });

        it('At least 1 entry within feed container', function(done) {
            //**** length will count the number of entries placed in the feed container
            expect(document.querySelectorAll('.feed .entry').length).not.toBeLessThan(1);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        //**** Will be used to store feed information & compare changes.
        let feedOne,
            feedTwo;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            //**** load feed ID #1
            loadFeed(1, function() {
                //**** Take the text of the first feed title
                feedOne = document.querySelector('.entry h2').innerHTML;
                //**** load feed ID #2
                loadFeed(2, done);
            });
        });

        it('Ensure new feed content changes', function(done) {
            //**** Take the text of the first feed title
            feedTwo = document.querySelector('.entry h2').innerHTML;
            //**** Compare the title text, make sure it has changed.
            expect(feedOne).not.toEqual(feedTwo);
            done();
        });
    });
}());