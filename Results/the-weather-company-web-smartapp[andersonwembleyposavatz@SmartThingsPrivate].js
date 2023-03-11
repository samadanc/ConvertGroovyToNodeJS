
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Alert Settings', section => {
            section.booleanSetting('twcsnowalert').name('Snow Alert');
            section.booleanSetting('twcstormalert').name('Storm Alert');
            section.booleanSetting('twctwcinalert').name('Rain Alert');
            section.numberSetting('twclowtempalert').name('Low temperature Alert (C or F)');
            section.numberSetting('twchightempalert').name('High temperature Alert (C or F)');

        });


        page.section('Switch On these on Snow Alert:', section => {
            section.deviceSetting('twcsnowon').capability(['switch']).name('');

        });


        page.section('Switch Off these on Snow Alert:', section => {
            section.deviceSetting('twcsnowoff').capability(['switch']).name('');

        });


        page.section('Switch On these on Rain Alert:', section => {
            section.deviceSetting('twcrainon').capability(['switch']).name('');

        });


        page.section('Switch Off these on Rain Alert:', section => {
            section.deviceSetting('twcrainoff').capability(['switch']).name('');

        });


        page.section('Switch On these on Storm Alert:', section => {
            section.deviceSetting('twcstormon').capability(['switch']).name('');

        });


        page.section('Switch Off these on Storm Alert:', section => {
            section.deviceSetting('twcstormoff').capability(['switch']).name('');

        });


        page.section('Switch On these on Low Temperature Alert:', section => {
            section.deviceSetting('twclowton').capability(['switch']).name('');

        });


        page.section('Switch Off these on Low Temperature Alert:', section => {
            section.deviceSetting('twclowtoff').capability(['switch']).name('');

        });


        page.section('Switch On these on High Temperature Alert:', section => {
            section.deviceSetting('twchighton').capability(['switch']).name('');

        });


        page.section('Switch Off these on High Temperature Alert:', section => {
            section.deviceSetting('twchightoff').capability(['switch']).name('');

        });


        page.section('Switch On these on Low Humidity Alert:', section => {
            section.deviceSetting('twclowhon').capability(['switch']).name('');

        });


        page.section('Switch Off these on Low Humidity Alert:', section => {
            section.deviceSetting('twclowhoff').capability(['switch']).name('');

        });


        page.section('Switch On these on High Humidity Alert:', section => {
            section.deviceSetting('twchighhon').capability(['switch']).name('');

        });


        page.section('Switch Off these on High Humidity Alert:', section => {
            section.deviceSetting('twchighhoff').capability(['switch']).name('');

        });


    })
