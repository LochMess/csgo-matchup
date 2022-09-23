import {SlashCommand, CommandOptionType, CommandContext} from 'slash-create'
import clc from 'cli-color'
import {toJSON} from '../util'
import {topUpTokens} from '../services/token-service'
import {getGameUrl} from '../services/status-service'

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
        {
          type: CommandOptionType.STRING,
          name: 'tokens',
          description: 'Add more privacy pass tokens to the store',
        },
      ],
    })

    this.filePath = __filename
  }

  async run(ctx: CommandContext) {
    console.log(
      clc.green('Running csgo command for'),
      clc.red(`${ctx.user.username}#${ctx.user.discriminator}`),
    )

    try {
      console.log(toJSON(ctx))
    } catch (err) {
      console.error(err)
    }

    let message = ''

    if (ctx.options.status) {
      message += `<@${
        ctx.user.id
      }> here is your game! [csgostats.gg](${getGameUrl(ctx.options.status)})`
    }

    if (ctx.options.tokens) {
      topUpTokens(ctx.options.tokens)
    }

    return message
      ? message
      : `Sup, <@${ctx.user.id}>! Please provide a CSGO console status output for me to assess 👍`
  }
}
