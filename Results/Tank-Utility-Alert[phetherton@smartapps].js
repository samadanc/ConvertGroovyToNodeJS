
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('GasMeter').capability(['Energy Meter']).name('When This Gas Tank...');
            section.numberSetting('SystemHealthAlert').name('Hasn\');
            section.numberSetting('levelAlert').name('Gas Level...');

        });


        page.section('Send Notifications?', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery3Hours('initialize', delay);

    })

    .scheduledEventHandler('initialize', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.GasMeter, 'Energy Meter', currentValue)
    
        
        context.api.devices.sendCommands(context.config.GasMeter, 'Energy Meter', currentValue)
    
        console.log("The current value of the Gas Level is $GasValue")
        console.log("The curent value of the threshold is $levelAlert")
        console.log("The System Health Value is $HealthValue")
        console.log("recipients configured: $recipients")
        
        context.api.devices.sendCommands(context.config.levelAlert, 'number', toInteger)
    
        let GasintValue = GasValue.toInteger()
        let HealthintValue = HealthValue.toInteger()
        if (GasintValue < LevelintValue && HealthintValue == 1) {
        console.log('Both Values Screwed')
        let msg = "$GasMeter reported $GasValue  which is below your warning level of $levelAlert% and no update in over 24 hours."
        this.sendMessage(msg)
        }
        if (GasintValue < LevelintValue && HealthintValue == 0) {
        console.log('Gas Values Screwed')
        let msg = "$GasMeter reported $GasValue  which is Below your warning level of $levelAlert%."
        this.sendMessage(msg)
        }
        if (GasintValue > LevelintValue && HealthintValue == 1) {
        console.log('System Health Screwed')
        let msg = "$GasMeter reported $GasValue No Update in over 24 Hours"
        this.sendMessage(msg)
        }
        if (GasintValue > LevelintValue && HealthintValue == 0) {
        console.log('Everything is Awesome')
        }
        

	})
