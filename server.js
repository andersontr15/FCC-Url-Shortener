let express = require('express');
let GoogleUrl = require('google-url');
let app = express();


app.get('/make-short/:url', (request, response) => {

	let googleUrl = new GoogleUrl({ key: 'AIzaSyDFG_0In4e59zAykr_7NE6V52hf-gMfKm8'});

	googleUrl.shorten(request.params.url, function(err, data) {
		if(err) {
			return response.status(400).send(err)
		}
		return response.status(200).json({
			original: request.params.url,
			shortened: data
		})
	})
});

app.get('/make-long', (request, response) => {
	let googleUrl = new GoogleUrl({ key: 'AIzaSyDFG_0In4e59zAykr_7NE6V52hf-gMfKm8'});

	googleUrl.expand(request.query.url, function(err, data) {
		if(err) {
			return response.status(400).send(err);
		}
		return response.status(200).json({
			shortened: request.query.url,
			fullUrl: data
		})
	})
});

app.get('*', (request, response) => {
	response.status(404).json({
		message: 'Try to navigate to /make-long?query=url or /make-short/:url to see the'
	})
})

app.listen(3000, () => console.log('Listening on port 3000'));