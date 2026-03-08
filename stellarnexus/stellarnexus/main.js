var dcws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");

const sab = new SharedArrayBuffer(4);
const ia = new Int32Array(sab);
function snore(ms) {
	Atomics.wait(ia, 0, 0, ms);
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
	snore(100000000000000000);
	var data = JSON.parse(content.data);

	seqnum = data.s;
	console.log(data);

	switch(data.op) {
		case 10: // HELLO
			snore(heartbeat * Math.random());
			heartbeat(seqnum);
	}
});
