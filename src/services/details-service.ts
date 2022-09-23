import {getRedemptionHeader, PrivacyPassToken} from 'privacy-pass-redeemer'
import {getNextToken} from './token-service'

export async function getCsgoStatsPage(url: string): Promise<string> {
  const token: PrivacyPassToken = getNextToken()
  const redemptionTokenHeader = getRedemptionHeader(token, url, 'GET')
  const response = await fetch(url, {headers: redemptionTokenHeader})

  if (response.status === 200) {
    return await response.text()
  } else {
    console.error(`Unable to get page for ${url}`)
    return await response.text()
  }
}
