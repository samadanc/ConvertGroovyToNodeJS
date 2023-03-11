
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('Control lights...', section => {
            section.deviceSetting('lights').capability(['switch']).name('Lights...');
            section.deviceSetting('dimmerLights').capability(['switchLevel']).name('Dimmable Lights...');
            section.deviceSetting('switches').capability(['switch']).name('Switches...');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Dimmable Switches...');
            section.deviceSetting('momentaries').capability(['momentary']).name('Momentary Switches...');
            section.deviceSetting('themeLights').capability(['switch']).name('Theme Lights...');

        });


        page.section('Control thermostats...', section => {
            section.deviceSetting('thermostatsHeat').capability(['thermostat']).name('Heating Thermostats...');
            section.deviceSetting('thermostatsCool').capability(['thermostat']).name('Cooling Thermostats...');

        });


        page.section('Control things...', section => {
            section.deviceSetting('locks').capability(['lock']).name('Locks...');
            section.deviceSetting('music').capability(['musicPlayer']).name('Music Players...');
            section.deviceSetting('camera').capability(['imageCapture']).name('Cameras (Image Capture)...');

        });


        page.section('View state of things...', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Presence Sensors...');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact Sensors...');
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Sensors...');
            section.deviceSetting('temperature').capability(['temperatureMeasurement']).name('Temperature...');
            section.deviceSetting('humidity').capability(['relativeHumidityMeasurement']).name('Hygrometer...');
            section.deviceSetting('water').capability(['waterSensor']).name('Water Sensors...');
            section.deviceSetting('battery').capability(['battery']).name('Battery Status...');
            section.deviceSetting('energy').capability(['energyMeter']).name('Energy Meters...');
            section.deviceSetting('power').capability(['powerMeter']).name('Power Meters...');
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Vibration Sensors...');
            section.deviceSetting('luminosity').capability(['illuminanceMeasurement']).name('Luminosity Sensors...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperature, 'temperatureMeasurement', 'temperature', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handler')

        context.api.schedules.runEvery15Minutes('updateStateTS', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatsCool, 'thermostat', 'coolingSetpoint', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatsCool, 'thermostat', 'temperature', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.energy, 'energyMeter', 'energy', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.themeLights, 'switch', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.lights, 'switch', 'level', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.themeLights, 'switch', 'switch.on', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatsHeat, 'thermostat', 'thermostatOperatingState', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.themeLights, 'switch', 'level', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.lights, 'switch', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.power, 'powerMeter', 'power', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'trackDescription', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatsHeat, 'thermostat', 'heatingSetpoint', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.humidity, 'relativeHumidityMeasurement', 'humidity', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmerLights, 'switchLevel', 'level', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.water, 'waterSensor', 'water', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'mute', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'level', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'level', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmerLights, 'switchLevel', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.luminosity, 'illuminanceMeasurement', 'luminosity', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.lights, 'switch', 'switch.on', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.themeLights, 'switch', 'switch.off', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatsHeat, 'thermostat', 'thermostatFanMode', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.momentaries, 'momentary', 'switch.on', 'handler')

        context.api.schedules.runEvery30Minutes('weatherRefresh', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.battery, 'battery', 'battery', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatsHeat, 'thermostat', 'temperature', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatsCool, 'thermostat', 'thermostatFanMode', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.acceleration, 'accelerationSensor', 'acceleration', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.music, 'musicPlayer', 'status', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.lights, 'switch', 'switch.off', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatsCool, 'thermostat', 'thermostatOperatingState', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("event from: ${e.displayName}, value: ${e.value}, source: ${e.source}, description: ${e.description}")
        this.updateStateTS()
        

	})

    .scheduledEventHandler('weatherRefresh', (context, event) => {
        
        console.log('refreshing weather')
        weather?.refresh()
        

	})

    .scheduledEventHandler('updateStateTS', (context, event) => {
        
        console.log('updating TS')
        state.ts = this.now()
        

	})
