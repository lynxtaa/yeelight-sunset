/* eslint-disable no-console */
import { ScheduledTask } from 'node-cron'

import { getLight } from './getLight.js'
import { getSunsetTime } from './getSunsetTime.js'
import { schedulePromise } from './schedulePromise.js'

let mainTask: ScheduledTask
let turnOnLightTask: ScheduledTask

console.log('Service is running...')

async function runTask() {
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

	if (!mainTask) {
		mainTask = schedulePromise('0 10 * * *', runTask)
	}

	console.log(`Set schedule for ${hours}:${minutes} UTC`)
}

await runTask()
