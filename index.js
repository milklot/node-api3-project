// require your server and launch it

const server = require("./api/server");

const port = process.env.PORT || 4000;

server.listen(port, () => {
	console.log("server running at http:/localhost:4000");
	console.log(`${process.env.COHORT}`)
});