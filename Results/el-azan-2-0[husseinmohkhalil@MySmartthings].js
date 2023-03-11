
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Fajr', section => {
            section.deviceSetting('FajrTargets').capability(['musicPlayer']).name('Target Google Home Speakers or Groups');
            section.numberSetting('FajrVolume').name('Target Volume');
            section.booleanSetting('FajrIsActive').name('Is Active');
            section.enumSetting('FajrActiveDays').name('Active Days');

        });


        page.section('Zoher', section => {
            section.deviceSetting('ZoherTargets').capability(['musicPlayer']).name('Target Google Home Speakers or Groups');
            section.numberSetting('ZoherVolume').name('Target Volume');
            section.booleanSetting('ZoherIsActive').name('Is Active');
            section.enumSetting('ZoherActiveDays').name('Active Days');

        });


        page.section('Asr', section => {
            section.deviceSetting('AsrTargets').capability(['musicPlayer']).name('Target Google Home Speakers or Groups');
            section.numberSetting('AsrVolume').name('Target Volume');
            section.booleanSetting('AsrIsActive').name('Is Active');
            section.enumSetting('AsrActiveDays').name('Active Days');

        });


        page.section('Maghreb', section => {
            section.deviceSetting('MaghrebTargets').capability(['musicPlayer']).name('Target Google Home Speakers or Groups');
            section.numberSetting('MaghrebVolume').name('Target Volume');
            section.booleanSetting('MaghrebIsActive').name('Is Active');
            section.enumSetting('MaghrebActiveDays').name('Active Days');

        });


        page.section('Isa', section => {
            section.deviceSetting('IsaTargets').capability(['musicPlayer']).name('Target Google Home Speakers or Groups');
            section.numberSetting('IsaVolume').name('Target Volume');
            section.booleanSetting('IsaIsActive').name('Is Active');
            section.enumSetting('IsaActiveDays').name('Active Days');

        });


        page.section('Ramadan', section => {
            section.booleanSetting('IsRamadanModeActive').name('Is Ramadan');
            section.booleanSetting('EnableKidsMode').name('Enable Kids Mode');
            section.numberSetting('KidsIftarHour').name('Kids Iftar Hour');
            section.deviceSetting('KidsIftarTargets').capability(['musicPlayer']).name('Target Google Home Speakers or Groups');
            section.numberSetting('KidsIftarVolume').name('Target Volume');
            section.enumSetting('KidsActiveDays').name('Active Days');

        });


    })
