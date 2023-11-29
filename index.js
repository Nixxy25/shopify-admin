
document.addEventListener('DOMContentLoaded', function() {
    const notificationImg = document.getElementById('notification-img');
    const notificationText = document.getElementById('notification-text');

    const menuName = document.getElementById('menu-page');
    const menuText = document.getElementById('menu-text');
    let toggleOn = false;



    notificationImg.addEventListener('click', function() {
        toggleOn = !toggleOn;
        notificationText.style.display = toggleOn ? "block" : "none";
    });

    menuName.addEventListener('click', function() {
        toggleOn = !toggleOn;
        menuText.style.display = toggleOn ? "block" : "none";
    });
    
});

function closeTrial() {
    const trialText = document.querySelector('.trial-container');
    trialText.style.display= "none";
}

function openDiv() {
    const container = document.querySelector(".main-text");
    const imgUp = document.querySelector('.img-up')
    const imgdown = document.querySelector('.img-down')
    container.style.display = "block";
    imgUp.style.display = "none"
    imgdown.style.display = "block";
}

function closeDiv() {
    const container = document.querySelector(".main-text");
    const imgdown = document.querySelector('.img-down')
    const imgUp = document.querySelector('.img-up')
    container.style.display = "none";
    imgdown.style.display ="none";
    imgUp.style.display ="block";
}
function check() {
    const HIDDEN = "hidden";
    const MARKED = "checkbox-box";
    const progressBar = document.querySelector("#progress-bar");
    const checkBtns = document.querySelectorAll(".check-btn");
    const emptyBtns = document.querySelectorAll(".not-completed");
    const completeBtns = document.querySelectorAll(".completed");
    const loading = document.querySelectorAll(".loading");
    const domainItems = document.querySelectorAll(".domain-items");

    const completionStatus = document.querySelector(".completion-status");

    let count = 0;
    let currentIndex = 10; // Keep track of the current open container index

    function updateCompletionStatus() {
        completionStatus.textContent = `${count}/5 completed`;
    }

    function closePreviousContainer() {
        if (currentIndex < domainItems.length) {
            // Close the previous domain-items container
            domainItems[currentIndex].classList.add(HIDDEN);
        }
    }

    function handleCheck(index) {
        closePreviousContainer(); // Close the previous domain-items container
        emptyBtns[index].classList.add(HIDDEN);
        loading[index].classList.remove(HIDDEN);

        setTimeout(() => {
            loading[index].classList.add(HIDDEN);
            completeBtns[index].classList.remove(HIDDEN);

            checkBtns[index].ariaLabel = checkBtns[index].ariaLabel.replace(
                'done',
                'not yet done'
            );
            checkBtns[index].classList.add(MARKED);

            domainItems[index].classList.remove(HIDDEN); // Open the new domain-items container

            const currentProgress = parseFloat(progressBar.style.width) || 0;
            const newProgress = Math.min(currentProgress + 20, 100);
            progressBar.style.width = newProgress + "%";

            count++;
            updateCompletionStatus();
            currentIndex = index; // Update the current open container index
        }, 1000);
    }

    function handleUncheck(index) {
        closePreviousContainer(); // Close the previous domain-items container
        completeBtns[index].classList.add(HIDDEN);
        loading[index].classList.remove(HIDDEN);

        setTimeout(() => {
            loading[index].classList.add(HIDDEN);
            emptyBtns[index].classList.remove(HIDDEN);

            checkBtns[index].ariaLabel = checkBtns[index].ariaLabel.replace(
                'not yet done',
                'done'
            );
            checkBtns[index].classList.remove(MARKED);

            domainItems[index].classList.remove(HIDDEN); // Open the new domain-items container

            const currentProgress = parseFloat(progressBar.style.width) || 0;
            const newProgress = Math.max(currentProgress - 20, 0);
            progressBar.style.width = newProgress + "%";

            count--;
            updateCompletionStatus();
            currentIndex = index; // Update the current open container index
        }, 1000);
    }

    function handleCheckOrUnchecked(event) {
        const index = Array.from(checkBtns).indexOf(event.currentTarget);
        const checkMarked = checkBtns[index].classList.contains(MARKED);

        if (checkMarked) {
            handleUncheck(index);
        } else {
            handleCheck(index);
        }
    }

    checkBtns.forEach(btn => {
        btn.addEventListener("click", handleCheckOrUnchecked);
    });
}

check();

