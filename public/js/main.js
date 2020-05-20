if(document.location.href === 'http://localhost:3000/') {
    document.querySelector('.home-link').style.color = "rgb(255,190,0)";
} else if(document.location.href === 'http://localhost:3000/about') {
    document.querySelector('.about-link').style.color = "rgb(255,190,0)";
} else if(document.location.href === 'http://localhost:3000/projects') {
    document.querySelector('.projects-link').style.color = 'rgb(255,190,0)';
} else {
    document.querySelector('.contact-link').style.color = 'rgb(255,190,0)';
}