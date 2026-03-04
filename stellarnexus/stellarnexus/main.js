var dcws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");

dcws.addEventListener("message", (msg) => {
	console.log("Message from Discord: ", msg.data)
});
