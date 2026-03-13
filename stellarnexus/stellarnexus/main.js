var dcws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
var hbid = 0;

function dcws_shutdown() { 
	clearInterval(hbid);
	dcws.close();
}

function snore(ms){
	const end = Date.now() + ms;
	while (Date.now() < end) { /* wait or something */ }
}

/// MAIN ///
var seqnum = null;
var heartbeatACK;
var heartbeat_interval = 41250;

function heartbeat(seqnum){
    if(dcws.readyState === WebSocket.OPEN){  // only send if open
        var json = new Object();
        json.op = 1;
        json.d = seqnum;
        console.log("sent heartbeat");
        dcws.send(JSON.stringify(json));
    } else {
        console.log("can not send heartbeat due to being offline")
   }
}

/// MSGS ///
dcws.addEventListener("message", (content) => {
	snore(1000);
	var data = JSON.parse(content.data);

	seqnum = data.s;
	console.log(data);
/// SHUTTING DOWN ///
dcws.onclose = e => console.log("Offline:", e);
// I was gonna add something more here but i forgot what lowk
	
/// CASES ///
	switch(data.op) {
		case 10: // HELLO
			snore(Math.random() * heartbeat_interval);
			heartbeat(seqnum);
			setInterval(() => heartbeat(seqnum), heartbeat_interval);
		break;
			
        case 11: // HEARTBEATACK
			console.log("heartbeat ACK");
			heartbeatACK = true;
		break;
			
		case 7: // RECONNECT
			console.log("server wants reconnect :d");
			dcws_shutdown();
		break;

		
	}
});
