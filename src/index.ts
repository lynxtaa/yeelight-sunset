/* eslint-disable no-console */
import { ScheduledTask } from 'node-cron'

import { getLight } from './getLight.js'
import { getSunsetTime } from './getSunsetTime.js'
import { schedulePromise } from './schedulePromise.js'

let turnOnLightTask: ScheduledTask

console.log('Service is running...')

schedulePromise('0 10 * * *', async () => {
	const date = await getSunsetTime({
		lat: process.env.LATITUDE,
		lng: process.env.LONGITUDE,
	})

	const minutes = date.getUTCMinutes()
	const hours = date.getUTCHours()

	if (turnOnLightTask) {
		turnOnLightTask.stop()
	}

	turnOnLightTask = schedulePromise(`${minutes} ${hours} * * *`, async () => {
		const light = await getLight()
		await light.set_power('on')
		light.exit()
	})

	console.log(`Set schedule for ${hours}:${minutes} UTC`)
})
