
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Energy Meters To Reset', section => {
            section.deviceSetting('meters').capability(['energyMeter']).name('Select Energy Meters');

        });


        page.section('Time of The Day To Reset', section => {
            section.timeSetting('time').name('Select A Time Of Day');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('resetEnergyUsage', delay);

    })

    .scheduledEventHandler('resetEnergyUsage', (context, event) => {
        
        console.log('Daily Energy Meter reset schedule triggered...')
        console.log('...resetting the energy meter because it\'s when the user requested it.')
        meters?.each({ let meter ->
        console.log("Reset Energy on (${meter?.getLabel()})")
        meter?.resetEnergyUsage()
        })
        console.log('Process completed, now schedule the reset to check on the next day.')
        this.initialize()
        

	})
