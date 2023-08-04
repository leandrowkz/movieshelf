import { BrowserAgent } from '@newrelic/browser-agent/loaders/browser-agent'

export type NewRelicProps = {
  agentID: string
  accountID: string
  applicationID: string
  licenseKey: string
  trustKey: string
}

export function useNewRelic({
  agentID,
  accountID,
  applicationID,
  licenseKey,
  trustKey,
}: NewRelicProps) {
  const initialize = () => {
    if (!agentID || !accountID || !applicationID || !licenseKey || !trustKey) {
      console.warn(
        'This application uses NewRelic for monitoring but the required info was not found. Check your .env file and add them.'
      )
      return
    }

    const options = {
      init: {
        distributed_tracing: { enabled: true },
        privacy: { cookies_enabled: true },
        ajax: { deny_list: ['bam.eu01.nr-data.net'] },
      },
      info: {
        sa: 1,
        beacon: 'bam.eu01.nr-data.net',
        errorBeacon: 'bam.eu01.nr-data.net',
        licenseKey,
        applicationID,
      },
      loader_config: {
        accountID,
        trustKey,
        agentID,
        licenseKey,
        applicationID,
      },
    }

    new BrowserAgent(options)
  }

  return { initialize }
}
