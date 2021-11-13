/* eslint-disable no-console */
import isWsl from 'is-wsl'
import Yeelight from 'yeelight2'

if (isWsl) {
	console.warn('Warning: Running in WSL may cause issues with lightbulb discovery')
}

export function getLight(): Promise<Yeelight.Light> {
	return new Promise(resolve => {
		Yeelight.discover(function (light) {
			this.close()
			resolve(light)
		})
	})
}
