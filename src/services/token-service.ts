import {PrivacyPassToken} from 'privacy-pass-redeemer'
import fs from 'fs'

const TOKEN_FILE = 'data/tokens.json'

const tokenRegExp: RegExp =
  /input":\[([\d,\,]+).+factor":"(0x[\d, a-z]+)","blindedPoint":"([\w\d, \=, \+, /]+)","unblindedPoint":"([\w\d, \=, \+, /]+).+"blindedPoint":"([\w\d, \=, \+, /]+).+unblindedPoint":"([\w\d, \=, \+, /]+)/g

function parse(input: string[]): PrivacyPassToken[] {
  return input.map(s => {
    const matches = s.matchAll(tokenRegExp)
    const token: PrivacyPassToken = [...matches].map(m => ({
      input: JSON.parse('[' + m[1] + ']'),
      factor: m[2],
      blindedPoint: m[3],
      unblindedPoint: m[4],
      signed: {
        blindedPoint: m[5],
        unblindedPoint: m[6],
      },
    }))[0]
    if (token === undefined)
      console.error('Could not find privacy pass token in:', s)
    return token
  })
}

function storeTokens(tokens: PrivacyPassToken[]) {
  try {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2))
  } catch (error) {
    console.error('Something went wrong writing tokens to file: ', error)
  }
}

function retrieveTokens(): PrivacyPassToken[] {
  try {
    const data = fs.readFileSync(TOKEN_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Something went wrong reading token file: ', error)
    throw error
  }
}

export function topUpTokens(input: string[]) {
  storeTokens(retrieveTokens().concat(parse(input)))
}

export function getNextToken(): PrivacyPassToken {
  const [token, ...remainingTokens] = retrieveTokens()
  storeTokens(remainingTokens)
  return token
}
