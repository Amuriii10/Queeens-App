    const myCarouselElement = document.querySelector('#heroCarousel');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const bar = document.getElementById('bar');
    
    let isPaused = false;
    let progress = 0;
    let carouselInstance;

    function updateNavbar() {
        const urlParams = new URLSearchParams(window.location.search);
        let userName = urlParams.get('user') || localStorage.getItem("userName");
        let isLoggedIn = localStorage.getItem("isLoggedIn") || (urlParams.get('user') ? "true" : "false");

        const loggedOutView = document.getElementById("logged-out-view");
        const loggedInView = document.getElementById("logged-in-view");
        const nameDisplay = document.getElementById("user-name-display");

        if (isLoggedIn === "true" && userName) {
            if(loggedOutView) loggedOutView.style.setProperty("display", "none", "important");
            if(loggedInView) loggedInView.style.setProperty("display", "flex", "important");
            if(nameDisplay) nameDisplay.innerText = userName;
            
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userName", userName);
        }
    }

    function updateTimers() {
        const now = new Date();
        
        const dailyEl = document.getElementById("countdown");
        if (dailyEl) {
            let h = 23 - now.getHours();
            let m = 59 - now.getMinutes();
            let s = 59 - now.getSeconds();
            dailyEl.innerText = `${h < 10 ? '0'+h : h}:${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
        }

        let dayDiff = (7 - now.getDay()) % 7;
        const nextSunday = new Date();
        nextSunday.setDate(now.getDate() + dayDiff);
        nextSunday.setHours(23, 59, 59);
        const diff = nextSunday - now;

        if (diff > 0) {
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);

            if(document.getElementById("days")) document.getElementById("days").innerText = d < 10 ? "0"+d : d;
            if(document.getElementById("hours")) document.getElementById("hours").innerText = h < 10 ? "0"+h : h;
            if(document.getElementById("minutes")) document.getElementById("minutes").innerText = m < 10 ? "0"+m : m;
            if(document.getElementById("seconds")) document.getElementById("seconds").innerText = s < 10 ? "0"+s : s;
        }
    }

    function logout() {
        localStorage.clear();
        window.location.href = "index.html";
    }

    document.addEventListener('DOMContentLoaded', () => {
        updateNavbar();
        setInterval(updateTimers, 1000);

        if (myCarouselElement) {
            carouselInstance = new bootstrap.Carousel(myCarouselElement, { 
                interval: 5000, 
                pause: false 
            });
            
            if (playPauseBtn) {
                playPauseBtn.addEventListener('click', function() {
                    if (isPaused) {
                        carouselInstance.cycle(); 
                        this.innerText = '⏸';
                    } else {
                        carouselInstance.pause(); // 
                        this.innerText = '▶';
                    }
                    isPaused = !isPaused;
                });
            }

            if (bar) {
                setInterval(() => {
                    if (!isPaused) {
                        progress += 1;
                        if (progress > 100) progress = 0;
                        bar.style.width = progress + '%';
                    }
                }, 50);
            }

            myCarouselElement.addEventListener('slide.bs.carousel', () => { 
                progress = 0; 
            });
        }
    });
myCarouselElement.addEventListener('slid.bs.carousel', () => { 
    progress = 0; 
});
   
document.addEventListener("DOMContentLoaded", function() {
    checkLoginStatus();
});

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userName = localStorage.getItem("userName") || "User";
    
    const loggedOutView = document.getElementById("logged-out-view");
    const loggedInView = document.getElementById("logged-in-view");
    const userNameDisplay = document.getElementById("user-name-display");

    if (isLoggedIn) {
        if(loggedOutView) loggedOutView.setAttribute("style", "display: none !important;");
        if(loggedInView) loggedInView.setAttribute("style", "display: block !important;"); 
        if(userNameDisplay) userNameDisplay.innerText = userName;
    } else {
        if(loggedOutView) loggedOutView.setAttribute("style", "display: flex !important;");
        if(loggedInView) loggedInView.setAttribute("style", "display: none !important;");
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    window.location.reload(); 
}
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    
    window.location.href = "index.html"; 
}