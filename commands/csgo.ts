import {SlashCommand, CommandOptionType} from 'slash-create'
import clc from 'cli-color'

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

/**
 * Order of players in query parameters determines teams
 * @param players
 * @returns URI encoded string of players as query parameters
 */
function playersToQueryParams(players: Player[]): string {
  return encodeURI(
    players
      .map(
        (player, index) =>
          `data[${index}][0]=${player?.name}&data[${index}][2]=${player?.ping}&data[${index}][1]=${player?.id}`,
      )
      .join('&'),
  )
}

const baseUrl = 'https://csgostats.gg/player/multi?'

export default class CsgoCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'csgo',
      description: 'Gets ranks of players in game.',
      options: [
        {
          type: CommandOptionType.STRING,
          name: 'status',
          description: 'Output of "status" command from CSGO console',
        },
      ],
    })

    this.filePath = __filename
  }

  async run(ctx) {
    console.log(
      clc.green('Running csgo command for'),
      clc.red(`${ctx.user.username}#${ctx.user.discriminator}`),
    )
    return ctx.options.status
      ? `<@${
          ctx.user.id
        }> here is your game! [csgostats.gg](${baseUrl}${playersToQueryParams(
          parseStatusToPlayers(ctx.options.status),
        )})`
      : `Sup, <@${ctx.user.id}>! Please provide a CSGO console status output for me to assess 👍`
  }
}
