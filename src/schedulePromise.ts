/* eslint-disable no-console */
import { schedule, ScheduledTask } from 'node-cron'

export function schedulePromise(
	cronExpression: string,
	fn: () => Promise<void>,
): ScheduledTask {
	return schedule(cronExpression, () => {
		fn().catch(err =>
			console.error(`Failed task: ${err instanceof Error ? err.message : String(err)}`),
		)
	})
}
