function sanitizeInput(input) {
	const element = $('<div>').text(input);
	if (element.html() !== element.text()) {
		throw new Error('Invalid input');
	}
	return element.html();
}

function writeCookie() {
	try {
		const tempo = sanitizeInput(prompt("What would it be?"));
		if (tempo) {
			const currentCookies = document.cookie.split(";")[0];
			const newCookie = currentCookies ? `${currentCookies}|${tempo}` : tempo;
			document.cookie = newCookie;
			addTodoToDOM(tempo);
		}
	}
	catch (e) {
		alert(e.message);
	}
}

function addTodoToDOM(todoText) {
	const todoList = $('#ft_list');
	const todoDiv = $('<div>').html(todoText);
	todoDiv.on('click', function () {
		if (confirm(`Do you want to remove "${todoText}"?`)) {
			removeCookie(todoText);
			todoDiv.remove();
		}
	});
	todoList.prepend(todoDiv);
}

function removeCookie(todoText) {
	const currentCookies = document.cookie.split(";")[0];
	
	if (currentCookies === todoText) {
		console.log("removed");
		document.cookie = "|";
		return;
	}
	
	const updatedCookies = currentCookies.split('|').filter(item => item !== todoText).join('|');
	document.cookie = updatedCookies;
}

function showCookies() {
	const saver = document.cookie.split(";")[0];
	if (saver) {
		const todos = saver.split("|");
		todos.forEach(todo => {
			if (todo) {
				addTodoToDOM(todo);
			}
		});
	}
}

$(document).ready(function () {
	showCookies();
});