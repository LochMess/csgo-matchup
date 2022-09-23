# CSGO Matchup
Discord bot created with the [bun.sh](https://bun.sh/) JavaScript runtime using the [slash-create](https://www.npmjs.com/package/slash-create) template for discord interactions.  

This bot via the discord slash command API would accept the status output from the CSGO console to return to discord a correctly formatted [csgostats.gg](https://csgostats.gg/) multi player search link for the current game.  

If the [config/associates.json](config/associates-template.json) has been created it will place known associates on the left hand team to reduce the sorting required on the webpage.

To access more complete information the bot makes use of privacy pass to be able to load pages of the website. Currently there is no functionality that leverages this other than support via the slash command to provide the bot with privacy pass tokens it can then use.

## Incompatibilities
- bun.sh doesn't support package.json imports which limits which npm packages can be used ie [chalk](https://www.npmjs.com/package/chalk) cannot currently be used. [github: Implement package.json "#imports" field support](https://github.com/oven-sh/bun/issues/478)

## Running the project
- discord api setup
- bun version at time of writing

# Project files
- config
- env
- data
- src
# /create with Bun runtime

A [slash-create](https://npm.im/slash-create) template, using [Bun runtime](https://bun.sh).

## Getting Started

### Cloning the repo

```sh
bun create discord-interactions interactions-bot
```

### Development

To run this locally, rename `.env.example` to `.env` and fill in the variables, then run `bun run.js` to start a local dev environment and use something similar to [ngrok](https://ngrok.com/) or [cloudflare](https://www.cloudflare.com/) to tunnel it to a URL.
