import fs from 'fs'
const path = require('path')

const BASE_URL = 'https://csgostats.gg/player/multi?'

const ASSOCIATES_FILE = 'config/associates.json'

class Player {
  name: string
  id: string
  ping: number

  constructor(name: string, id: string, ping: number) {
    this.name = name
    this.id = id
    this.ping = ping
  }

  static CreatePlayer(
    name: string | undefined,
    id: string | undefined,
    ping: string | undefined,
  ): Player {
    const parsedPing = Number(ping)
    if (name === undefined || id === undefined || parsedPing === NaN)
      throw Error(
        `Invalid player properties name: ${name}, id: ${id}, ping: ${ping} `,
      )
    return new Player(name, id, parsedPing)
  }

  toString(): string {
    return `${this.name}, ${this.id}, ${this.ping}`
  }
}

const playerNameAndId: RegExp =
  /"(.+?)"\s(STEAM_\d+:\d+:\d+)\s\d{2}:\d{2}\s(\d+)/g

function parseStatusToPlayers(statusOutput: string): Player[] {
  return [...statusOutput.matchAll(playerNameAndId)].map(playerMatch =>
    Player.CreatePlayer(playerMatch[1], playerMatch[2], playerMatch[3]),
  )
}

type Associate = {
  name: string
  steamId: string
}

function getAssociates(): Associate[] {
  try {
    const data = fs.readFileSync(ASSOCIATES_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Something went wrong reading associates file: ', error)
    throw error
  }
}

function teamPlayers(players: Player[]): Player[] {
  const associates = getAssociates()
  return [...players].sort((a: Player, b: Player): number => {
    const aExists: boolean =
      associates.find(associate => associate.steamId === a.id) !== undefined
    const bExists: boolean =
      associates.find(associate => associate.steamId === b.id) !== undefined

    if ((aExists && bExists) || (!aExists && !bExists)) {
      return 0
    } else if (aExists) {
      return -1
    } else if (bExists) {
      return 1
    }
    return 0
  })
}

/**
 * Order of players in query parameters determines teams
 * @param players
 * @returns URI encoded string of players as query parameters
 */
function playersToQueryParams(players: Player[]): string {
  const sortedPlayers = teamPlayers(players)
  return encodeURI(
    sortedPlayers
      .map(
        (player, index) =>
          `data[${index}][0]=${player?.name}&data[${index}][2]=${player?.ping}&data[${index}][1]=${player?.id}`,
      )
      .join('&'),
  )
}

export function getGameUrl(statusOutput: string): string {
  return `${BASE_URL}${playersToQueryParams(
    parseStatusToPlayers(statusOutput),
  )}`
}
