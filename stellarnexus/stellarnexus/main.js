var dcws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");

function snore(ms) { return new Promise(res => setTimeout(res,ms)); }

/// MAIN ///

var seqnum = null;
function heartbeat(seqnum) {
	var json = new Object();
	json.op = 1;
	json.d = seqnum;
	console.log("sent heartbeat");
	dcws.send(JSON.stringify(json));
}

/// MSGS ///

dcws.addEventListener("message", async (content) => {
	var data = JSON.parse(content.data);

	seqnum = data.s;
	console.log(data);

	switch(data.op) {
		case 10: // HELLO
			await snore(heartbeat * Math.random());
			heartbeat(seqnum);
	}
});
