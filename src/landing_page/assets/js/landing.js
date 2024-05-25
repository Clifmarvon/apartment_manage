const mainContainer = document.querySelector(".main");
const mainTitle = document.querySelector(".tTitle");
const contentContainer = document.querySelector(".content");
const leftContent = document.querySelector(".left-content");
const rightContent = document.querySelector(".right-content");
const footerRollersWrapper = document.querySelectorAll(".footer-roolers .footer-wrapper");
const burgerBar = document.querySelector(".fa-bars ");
const navContainer = document.querySelector(".navigation-links  ");

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
fetch("src/landing_page/assets/data/data.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then(async (data) => {

        setFooter(data);
        setMain(data);
        setImages(data);
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
    });

async function setMain(data) {
    while (data) {
        let main = data.main;
        console.log(main);
        for (i of main) {

            let t = `
                     <h1 id="tTTitle" style=" animation: typing ${i.title.length / 2}s steps(${i.title.length + 5}), cursor ${i.title.length * 0.03}s step-end alternate infinite;">${i.title}</h1>`;
            mainTitle.innerHTML = t;
            setTimeout(() => {
                let k = document.getElementById("tTTitle");
                k.style.border = "none";
            }, i.title.length * 600);
            for (j of i.sub) {
                let subtitle = j.title;
                let subtitleContent = j.content;
                let subtitleButton = j.button;
                let subtitleButtonClass = j.class;


                let ht = `

                          <h2>${subtitle}</h2>
                          <p>
                           ${subtitleContent}
                          </p>
                          <button class="btn ${subtitleButtonClass}" type="button">${subtitleButton}</button>


                     `;
                leftContent.innerHTML = ht;
                await delay(30000);
            }


        }
    }
}

async function setImages(data) {
    while (data) {
        const { other } = data;
        const totalImages = other.length;

        for (let index = 0; index < totalImages; index++) {
            const imageSrc = other[index];

            let navPoints = '';
            for (let i = 0; i < totalImages; i++) {
                navPoints += `<div class="point ${i === index ? 'active' : ''}"></div>`;
            }
            const content = `
                               <div class="wrapper">
                                 <img src="${imageSrc}" />
                               </div>
                               <div class="nav-points">
                                 ${navPoints}
                               </div>
                             `;

            rightContent.innerHTML = content;

            await delay(10000);
        }

    }
}


async function setFooter(data) {
    footerRollersWrapper.innerHTML = "";
    for (let i of data.contents) {

        let k = ` <div class="item">
    <p>${i.content}</p>
  </div>`;
        footerRollersWrapper.forEach((item) => {
            item.innerHTML += k;
        })



    }

}

burgerBar.addEventListener('click', () => {
    if (navContainer.style.display === "none") {
        navContainer.style.display = "flex"

    } else {
        navContainer.style.display = "none"
    }
});