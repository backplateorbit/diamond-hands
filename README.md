# diamond-hands
A bot that uses the yahoo-finance npm module to track the statistics of user prescribed stock options.

Currently, the bot looks for a certain channel on my Discord server, and extracts the options to track from the topic of said channel.

It then uses the yahoo-finance API to check these options, returning a summary object.

This summary object is formatted into a `Discord.MessageEmbed()` object, which is then sent to the channel.

Currently, it runs on a 10 minute basis.

When a stock's market change is positive, it will turn Green. It will be Red if the inverse is true.