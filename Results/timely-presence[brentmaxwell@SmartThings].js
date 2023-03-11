
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Select Family Members...', section => {
            section.deviceSetting('presenceFm').capability(['presenceSensor']).name('Who...');
            section.textSetting('linkFm').name('Picture Folder URL');

        });


        page.section('['hideable': true, 'hidden': true], 'Timely Presence Advanced Options', section => {
            section.enumSetting('fontTo').name('Select Font Size');
            section.booleanSetting('colorTo').name('Font Color White');
            section.booleanSetting('formatTo').name('Time Format: 24hr');
            section.booleanSetting('ampmTo').name('Hide AM/PM');
            section.booleanSetting('timeTo').name('Hide Time');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('generateJson', (context, event) => {
        
        this.render(['contentType': 'application/json', 'data': "${this.jsonData()}"])
        

	})
