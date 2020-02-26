const socket = new WebSocket("ws://ec2-34-193-186-211.compute-1.amazonaws.com:8080");
let socketOpen = false;
socket.onopen = function () {
	socketOpen = true;
};

socket.onmessage = function (message) {
	try {
		const parseMessage = JSON.parse(message.data);
		console.error(parseMessage);
		appendImg(parseMessage)
	} catch (e) {
		console.error(e);
	}
};

socket.onerror = function (event) {
	console.log(event);
};

function appendImg(data) {
	const imgContainer = document.createElement('div');
	imgContainer.className = "imgContainer";
	const img = document.createElement('img');
	img.className = "img";
	img.src = 'data:image/jpeg;base64,' + data.image;
	if (data.landscape) {
		imgContainer.className += " landscape";
	}
	const name = document.createElement('div');
	name.innerText = data.username;
	name.className = "name";
	imgContainer.appendChild(img);
	imgContainer.appendChild(name);
	const imgArea = document.getElementsByClassName('imgArea')[0];
	imgArea.appendChild(imgContainer);
}

function announce() {
	const textArea = document.getElementById('textarea');
	const message = JSON.stringify({type: 'announcement', content: textArea.value});
	textArea.value = "";
	if (socketOpen) {
		socket.send(message);
	} else {
		socket.onopen = function () {
			socket.send(message);
		};
	}
}

function selfie() {
	const message = JSON.stringify({type: 'selfie'});
	if (socketOpen) {
		socket.send(message);
	} else {
		socket.onopen = function () {
			socket.send(message);
		};
	}
}

// setTimeout(()=> {
// 	appendImg(mockData[0]);
// 	appendImg(mockData[1]);
// },1000);
//
