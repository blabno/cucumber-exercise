var q = require('q');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
/*jshint -W079 */
var expect = chai.expect;
var fragments = require('./fragments.js');

module.exports = function ()
{
    'use strict';

    this.Then(/the title should equal "([^"]*)"$/, function (text, callback)
    {
        expect(browser.getTitle()).to.eventually.equal(text).and.notify(callback);
    });

    this.Then(/^the current URL should be "([^"]*)"$/, function (url, callback)
    {
        browser.waitForAngular().then(function ()
        {
            browser.getCurrentUrl().then(function (browserUrl)
            {
                expect(browserUrl.split('#')[1]).to.equal(url);
                callback();
            });
        });
    });

    this.Given(/^I am an anonymous user$/, function (callback)
    {
        browser.manage().deleteAllCookies();
        callback();
    });


    this.When(/^I browse to the "([^"]*)"$/, function (url, callback)
    {
        browser.get('/#' + url).then(callback);
    });

    function clearAndType(webElement, text)
    {
        text = text.replace(/\\n/g, protractor.Key.ENTER);
        return webElement.getAttribute('type').then(function (type)
        {
            if ('date' !== type) {
                return webElement.clear().then(function ()
                {
                    return webElement.sendKeys(text);
                });
            } else {
                return webElement.sendKeys(text);
            }
        });
    }

    this.When(/^I enter "(.*)" into "(.*)" field$/, function (text, name, callback)
    {
        var webElement = fragments(name)();
        clearAndType(webElement, text).then(callback);
    });


    this.When(/^I click "([^"]*)"$/, function (name, callback)
    {
        browser.actions().mouseMove(fragments(name)()).perform().then(function ()
        {
            fragments(name)().click().then(function ()
            {
                return browser.waitForAngular();
            }).then(callback);
        });
    });


    this.Then(/^I should be directed to "([^"]*)"$/, function (url, callback)
    {
        expect(browser.getCurrentUrl()).to.eventually.match(new RegExp(url.replace('/', '\/').replace('?', '\\?') + '$')).and.notify(callback);
    });

    this.Then(/^I should see the "([^"]*)" element$/, function (name, callback)
    {
        expect(fragments(name)().getWebElement().isDisplayed()).to.eventually.be.true.and.notify(callback);
    });

    this.Then(/^I should not see the "([^"]*)" element$/, function (name, callback)
    {
        fragments(name)().isPresent().then(function (result)
        {
            if (result) {
                expect(fragments(name)().isDisplayed()).to.eventually.be.false.and.notify(callback);
            } else {
                expect(q.when(result)).to.eventually.be.false.and.notify(callback);
            }
        });
    });


    this.Then(/^pause$/, function (callback)
    {
        browser.pause();
        callback();
    });

    this.When(/^I should see "([^"]*)" in "([^"]*)" input$/, function (expectedText, name, callback)
    {
        expect(fragments(name)().getAttribute('value')).to.eventually.equal(expectedText).and.notify(callback);
    });

    this.Then(/^I should see "(.*)" in "([^"]*)"$/, function (expectedText, element, callback)
    {
        expect(fragments(element)().getText()).to.eventually.equal(expectedText).and.notify(callback);
    });


    this.Then(/^I should see \/(.*)\/ in "([^"]*)"$/, function (expectedText, element, callback)
    {
        expect(fragments(element)().getText()).to.eventually.match(new RegExp(expectedText)).and.notify(callback);
    });
};
