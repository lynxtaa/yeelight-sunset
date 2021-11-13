import got from 'got'
import { z } from 'zod'

const responseSchema = z.object({
	status: z.literal('OK'),
	results: z.object({
		sunrise: z.string(),
		sunset: z.string(),
		day_length: z.number(),
	}),
})

export async function getSunsetTime({
	lat,
	lng,
}: {
	lat: string
	lng: string
}): Promise<Date> {
	const json = await got('https://api.sunrise-sunset.org/json', {
		searchParams: { lat, lng, formatted: '0' },
		timeout: 30000,
		retry: 5,
	}).json()

	const { results } = responseSchema.parse(json)

	return new Date(results.sunset)
}
