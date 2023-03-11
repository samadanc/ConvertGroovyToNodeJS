
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Name this Shortcut'', section => {

        });


        page.section('''', section => {

        });


        page.section('''', section => {

        });


        page.section('''', section => {

        });


        page.section('''', section => {

        });


        page.section('''', section => {

        });


        page.section('''', section => {

        });


        page.section('', section => {
            section.textSetting('scResponse').name('Alexa responds with...');

        });


        page.section('', section => {
            section.textSetting('alias1').name('You can also say this...');
            section.textSetting('scResponse1').name('...and, Alexa responds with this');

        });


        page.section('', section => {
            section.textSetting('alias2').name('or, You can say this...');
            section.textSetting('scResponse2').name('...and, Alexa responds with this');

        });


        page.section('', section => {
            section.textSetting('alias3').name('or, You can say this...');
            section.textSetting('scResponse3').name('...and, Alexa responds with this');

        });


        page.section('', section => {
            section.textSetting('alias4').name('or, You can say this...');
            section.textSetting('scResponse4').name('...and, Alexa responds with this');

        });


        page.section('', section => {
            section.booleanSetting('mAlias').name('Do you need even more phrases?');

        });


        page.section('', section => {
            section.textSetting('alias5').name('or, You can say this...');
            section.textSetting('scResponse5').name('...and, Alexa responds with this');

        });


        page.section('', section => {
            section.textSetting('alias6').name('or, You can say this...');
            section.textSetting('scResponse6').name('...and, Alexa responds with this');

        });


        page.section('', section => {
            section.textSetting('alias7').name('or, You can say this...');
            section.textSetting('scResponse7').name('...and, Alexa responds with this');

        });


        page.section('', section => {
            section.textSetting('alias8').name('or, You can say this...');
            section.textSetting('scResponse8').name('...and, Alexa responds with this');

        });


        page.section('', section => {
            section.textSetting('alias9').name('and finally, You can say this...');
            section.textSetting('scResponse9').name('...and, Alexa responds with this');

        });


        page.section('''', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
