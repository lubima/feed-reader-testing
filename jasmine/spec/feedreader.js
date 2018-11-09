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
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* The test makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* The test ensures the allFeeds object has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* The test ensures the allFeeds object has a name defined
         * and that the name is not empty.
         */
        it('name defined', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* New test suite named "The menu" */
    describe('The menu', function() {

        /* The test ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function(){
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         /* The test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('displays on and off', function(){
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        }); 
    });
    /* New test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* The test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0,done);
        });
        it('contain at least one entry',function() {
            const entries = document.querySelector('.feed').querySelectorAll('.entry');
            expect(entries.length).toBeGreaterThan(0);
        });
    });
    /* New test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        const feed = document.querySelector('.feed');
        const newFeed = [];
        /* The test ensures that when a new feed is loaded
         * by the loadFeed function the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0);
            Array.from(feed.children).forEach(function(entry){
                newFeed.push(entry.innerText);
            });
            loadFeed(1,done);
        });
        it('content changes',function() {
            Array.from(feed.children).forEach(function(entry,index){
                expect(entry.innerText === newFeed[index]).toBe(false);
            });
        });
    });
}());
