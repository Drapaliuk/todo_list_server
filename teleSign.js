var unirest = require("unirest");

var req = unirest("POST", "https://nexmo-nexmo-sms-verify-v1.p.rapidapi.com/send-verification-code");

req.query({
	"phoneNumber": "+380689308684",
	"brand": "'asdasdasd"
});

req.headers({
	"x-rapidapi-key": "6cc9f78614msh270138d55bee86dp1e9956jsn439cf77ae265",
	"x-rapidapi-host": "nexmo-nexmo-sms-verify-v1.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});