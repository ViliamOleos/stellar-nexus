////////////////////////////////////////// DCWS //////////////////////////////////////////

var dcws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
dcws.onclose = e => console.log(e);
var hbid = 0;

function dcws_shutdown() { clearInterval(hbid); dcws.close(); }

////////////////////////////////////////// LIBS //////////////////////////////////////////

function snore(ms){ const end = Date.now() + ms; while(Date.now() < end) { /* ... */ } }

////////////////////////////////////////// MAIN //////////////////////////////////////////

var seqnum = null;
var heartbeatACK = false;
var heartbeatInterval;

function heartbeat(){
	var json = new Object();
		json.op = 1;
		json.d = seqnum;
	dcws.send(JSON.stringify(json));
	console.log("Sent Heartbeat: ", json);
}

dcws.addEventListener("message", (content) => {
	var data = JSON.parse(content.data);
	seqnum = data.s;

	console.log(data);
	
	switch(data.op) {
        case 11: // ACK
			console.log("Discord acknowledged Heartbeat");
			heartbeatACK = true;
		break;

		case 10: // HELLO
			heartbeatInterval = data.d.heartbeat_interval;
			snore(Math.random() * heartbeatInterval); heartbeat();
			// setInterval will heartbeat every [heartbeatInterval]ms
			hbid = setInterval(() => heartbeat(), heartbeatInterval);
		break;

		case 1: // HB
			heatbeat();
		break;
			
		case 7: // RECONNECT
			console.log("Discord wants reconnect");
			dcws_shutdown();
		break;
	}
});

//////////////////////////////////////////////////////////////////////////////////////////
