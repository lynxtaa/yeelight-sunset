import Yeelight from 'yeelight2'

export function getLight(): Promise<Yeelight.Light> {
	return new Promise(resolve => {
		Yeelight.discover(function (light) {
			this.close()
			resolve(light)
		})
	})
}
