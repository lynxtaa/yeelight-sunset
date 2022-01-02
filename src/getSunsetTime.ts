import SuncCalc from 'suncalc'

// eslint-disable-next-line @typescript-eslint/require-await
export async function getSunsetTime({
	lat,
	lng,
}: {
	lat: string
	lng: string
}): Promise<Date> {
	const times = SuncCalc.getTimes(new Date(), Number(lat), Number(lng))

	return times.sunsetStart
}
