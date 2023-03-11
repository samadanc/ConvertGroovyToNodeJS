
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Alert Settings', section => {
            section.booleanSetting('wusnowalert').name('Snow Alert');
            section.booleanSetting('wustormalert').name('Storm Alert');
            section.booleanSetting('wurainalert').name('Rain Alert');
            section.numberSetting('wulowtempalert').name('Low temperature Alert (C or F)');
            section.numberSetting('wuhightempalert').name('High temperature Alert (C or F)');

        });


        page.section('Switch On these on Snow Alert:', section => {
            section.deviceSetting('wusnowon').capability(['switch']).name('');

        });


        page.section('Switch Off these on Snow Alert:', section => {
            section.deviceSetting('wusnowoff').capability(['switch']).name('');

        });


        page.section('Switch On these on Rain Alert:', section => {
            section.deviceSetting('wurainon').capability(['switch']).name('');

        });


        page.section('Switch Off these on Rain Alert:', section => {
            section.deviceSetting('wurainoff').capability(['switch']).name('');

        });


        page.section('Switch On these on Storm Alert:', section => {
            section.deviceSetting('wustormon').capability(['switch']).name('');

        });


        page.section('Switch Off these on Storm Alert:', section => {
            section.deviceSetting('wustormoff').capability(['switch']).name('');

        });


        page.section('Switch On these on Low Temperature Alert:', section => {
            section.deviceSetting('wulowton').capability(['switch']).name('');

        });


        page.section('Switch Off these on Low Temperature Alert:', section => {
            section.deviceSetting('wulowtoff').capability(['switch']).name('');

        });


        page.section('Switch On these on High Temperature Alert:', section => {
            section.deviceSetting('wuhighton').capability(['switch']).name('');

        });


        page.section('Switch Off these on High Temperature Alert:', section => {
            section.deviceSetting('wuhightoff').capability(['switch']).name('');

        });


        page.section('Switch On these on Low Humidity Alert:', section => {
            section.deviceSetting('wulowhon').capability(['switch']).name('');

        });


        page.section('Switch Off these on Low Humidity Alert:', section => {
            section.deviceSetting('wulowhoff').capability(['switch']).name('');

        });


        page.section('Switch On these on High Humidity Alert:', section => {
            section.deviceSetting('wuhighhon').capability(['switch']).name('');

        });


        page.section('Switch Off these on High Humidity Alert:', section => {
            section.deviceSetting('wuhighhoff').capability(['switch']).name('');

        });


    })
