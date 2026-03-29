////////////////////////////////////////// DCWS //////////////////////////////////////////

var dcws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
dcws.onclose = e => console.log(e);
var hbid = 0; // heartbeat interval ID

function dcws_shutdown() { clearInterval(hbid); dcws.close(); }

////////////////////////////////////////// LIBS //////////////////////////////////////////

function snore(ms){ const end = Date.now() + ms; while(Date.now() < end) { /* ... */ } }

////////////////////////////////////////// MAIN //////////////////////////////////////////

var seqnum = null;
var heartbeatACK = true;
var heartbeatInterval;

function heartbeat(){
	if(!heartbeatACK) { 
		console.log("Heartbeat ACKnowledgment missing; shutting down DCWS.");
		dcws_shutdown(); return;
	} heartbeatACK = false;

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

		break; case 10: // HELLO

			heartbeatInterval = data.d.heartbeat_interval;

			// heartbeat after time
			snore(Math.random() * heartbeatInterval); heartbeat();

			// setInterval will heartbeat every [heartbeatInterval]ms
			hbid = setInterval(() => heartbeat(), heartbeatInterval);

			snore(1000);

					/*
			var json = new Object();
				json.op = 2;
				var d = new Object();
					d.token = "";
					d.intents = ;
				json.d = d;
					*/

		break; case 1: // HB

			heartbeat();

		break; case 7: // RECONNECT

			console.log("Discord wants reconnect ;(");
			dcws_shutdown();

		break;
	}
});

/// GAMEMAIN ///

main();

function main() {
	const GL = window.renderbuf.getContext("webgl");
	if(GL == null) {
		alert("Can't get WebGL for rendering. Perhaps Your browser doesn't support it?");
	}

	GL.clearColor(1.0, 0.0, 0.0, 1.0);
	GL.clear(gl.COLOR_BUFFER_BIT);
}

//////////////////////////////////////////////////////////////////////////////////////////
