var dcws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");

function snore(ms){
	const end = Date.now() + ms;
	while (Date.now() < end) { /* wait or something */ }
}

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

dcws.addEventListener("message", (content) => {
	snore(1000);
	var data = JSON.parse(content.data);

	seqnum = data.s;
	console.log(data);

	switch(data.op) {
		case 10: // HELLO
			snore(heartbeat * Math.random());
			heartbeat(seqnum);
	}
});
