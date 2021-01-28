# diamond-hands
A bot that uses the yahoo-finance npm module to track the statistics of user prescribed stock options.

Currently, the bot looks for a certain channel on my Discord server, and extracts the options to track from the topic of said channel.

It then uses the yahoo-finance API to check these options, returning a summary object.

This summary object is formatted into a `Discord.MessageEmbed()` object, which is then sent to the channel.

Currently, it runs on a 10 minute basis.

When a stock's market change is positive, it will turn Green. It will be Red if the inverse is true.

## Constraints
For now, the bot is specialised to my server. In future, I could have the bot sweep all the different servers its connected to, and find a `crypto-stonks` channel on each. Alternatively, I could add a command that lets users add a channel to push data to. 

The problem with this is the bot is hosted on heroku, and therefore ephemeral, so it would lose that binding when it is slept by the container service.

I could potentially push it to an AWS EC2, or store the server and channel in a DynamoDB table on AWS and keep the bot hosted @ heroku. Probably not going to do much more with this project though.

## Future Stuff

- Add graphs that export to the RichEmbed.
- Add the option for Crypto.
- Let users track their investments???