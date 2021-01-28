const Discord = require("discord.js");
const yahooFinance = require("yahoo-finance");

const client = new Discord.Client();

const getOptionQuote = async(option) => {
    const quote = await yahooFinance.quote(
        {
            symbol: option,
            modules: ["price"]
        }
    )

    const summary = {
        currentPrice: quote.price.regularMarketPrice,
        symbol: quote.price.symbol,
        shortName: quote.price.shortName,
        currency: quote.price.currency,
        currentSymbol: quote.price.currencySymbol,
        change: quote.price.regularMarketChange
    }

    return summary
}

const updateSummaries = async(options) => {
    const summaries = await Promise.all(options.map(getOptionQuote))
    return summaries
}

const updateChannel = async() => {
    client.guilds.fetch("365897841878761472").then(
        async(guild) => {
            const stockChannel = guild.channels.cache.find((channel) => channel.name === "crypto-stonks");
            const options = [...new Set(stockChannel.topic.replace(/(\r\n|\n|\r)/gm, "").split(","))]
            const summaries = await updateSummaries(options);
            summaries.map(
                (summary) => {
                    stockChannel.send(
                        new Discord.MessageEmbed().setColor(
                            summary.change > 0
                            ? "#00FF00"
                            : "#FF0000"
                        ).setTitle(summary.symbol).setDescription(summary.shortName).addFields(
                            {
                                name: "Current Price", value: summary.currentPrice
                            },
                            {
                                name: "Market Change", value: `${summary.change}%`
                            }
                        )
                    )
                }
            )
        }
    ).catch(err => console.log(err))
}


client.on("ready", ()=> {
    console.log("Diamond hands in the pot, pump et");
    setInterval(() => {
        updateChannel();
    }, 600000)
    updateChannel();
})

client.login(process.env.BOT_TOKEN)