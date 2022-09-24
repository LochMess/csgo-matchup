# CSGO Matchup

Discord bot created with the [bun.sh](https://bun.sh/) JavaScript runtime using
the [slash-create](https://www.npmjs.com/package/slash-create) template for
discord interactions.

This bot via the discord slash command API would accept the status output from
the CSGO console to return to discord a correctly formatted
[csgostats.gg](https://csgostats.gg/) multi player search link for the current
game.

If the [config/associates.json](config/associates-template.json) has been
created it will place known associates on the left hand team to reduce the
sorting required on the webpage.

To access more complete information the bot makes use of privacy pass to be able
to load pages of the website. Currently there is no functionality that leverages
this other than support via the slash command to provide the bot with privacy
pass tokens it can then use. For details on how to retrieve privacy pass tokens
see the python
[Privacy Pass repository](https://github.com/SergeBakharev/privacypass).

## Incompatibilities

- bun.sh doesn't support package.json imports which limits which npm packages
  can be used ie [chalk](https://www.npmjs.com/package/chalk) cannot currently
  be used.
  [github: Implement package.json "#imports" field support](https://github.com/oven-sh/bun/issues/478)

## Running the project

- Discord API setup
  1. Go to
     [discord.com/developers/applications](discord.com/developers/applications)
     and create a bot.
  1. Rename `.env.example` to `.env` and add the bot token to `.env`, along with
     the `Application ID` and `Public Key` from the `General Information`
     section of application screen in the discord developer portal.
  1. Add the bot to discord servers by going to `OAuth2 > URL Generator` and
     create a bot invite with read and send messages permissions.
  1. Add the `Interactions Endpoint URL` on the `General Information` screen,
     this is where your bot is hosted and discord can call when one of your
     slash commands is run.
- To run locally, `bun run.js` to start a local dev environment and use
  something similar to [ngrok](https://ngrok.com/) or
  [cloudflare](https://www.cloudflare.com/) to tunnel it to a URL.
- bun version at time of writing was 0.1.11
