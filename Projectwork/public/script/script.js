let container = document.getElementById('container');

toggle = () => {
    container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
	document.querySelector("title").innerHTML = container.classList[1];
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200);