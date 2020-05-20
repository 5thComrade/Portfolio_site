if(document.location.href === 'http://localhost:3000/' || document.location.href === 'https://helloantony.herokuapp.com/' || document.location.href === 'http://helloantony.herokuapp.com/') {
    document.querySelector('.home-link').style.color = "rgb(255,190,0)";
} else if(document.location.href === 'http://localhost:3000/about' || document.location.href === 'https://helloantony.herokuapp.com/about' || document.location.href === 'http://helloantony.herokuapp.com/about') {
    document.querySelector('.about-link').style.color = "rgb(255,190,0)";
} else if(document.location.href === 'http://localhost:3000/projects' || document.location.href === 'https://helloantony.herokuapp.com/projects' || document.location.href === 'http://helloantony.herokuapp.com/projects') {
    document.querySelector('.projects-link').style.color = 'rgb(255,190,0)';
} else {
    document.querySelector('.contact-link').style.color = 'rgb(255,190,0)';
}