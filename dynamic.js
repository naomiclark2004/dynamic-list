let output = document.querySelector(".output");
// console.log(output);
const url = "attraction.json";
let myList = [];
let localData = localStorage.getItem("myList");
// console.log(localData);

myList = JSON.parse(localStorage.getItem("myList"));
// console.log(myList);
jsloader();

function jsloader() {
    fetch(url)
        .then((rep) => rep.json())
        .then((data) => {
            myList = data;
            maker();
            savetoStorage();
            dynamic();
        });
}

// so maker doesn't run on second page
function maker() {
    if (document.body.contains(output)) {
        output.innerHTML = " ";
        myList.forEach((el, index) => {
            makeList(el, index);
        });
    }
    else {
        dynamic();
    }
}

// make each attraction content box
function makeList(item, index) {
    const box = document.createElement('div');
    box.className = "box";
    const div = document.createElement('div');
    div.className = "text";
    const img = document.createElement("img");
    img.src = `${item.image}`;
    img.style.width = "300px";
    img.className = "image";
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    h2.innerHTML = (index + 1) + ".  " + item.name;
    p.innerHTML = `${item.description}`;
    output.append(box);
    box.append(img);
    box.append(div);
    div.append(h2);
    div.append(p);
    savetoStorage();
}

function savetoStorage() {
    //   console.log(myList);
    localStorage.setItem("myList", JSON.stringify(myList));
}

// stores img elements in as a collection then use loop to add eventlistner to each to open second web page
function dynamic() {
    var images = document.getElementsByClassName("image");
    //   console.log(images);
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener("click", function () {
            if (images[i] === images[i]) {
                openInNewTab('locationMap.html');
                localStorage.setItem("map", i);
            }
        });
    }
}
// open map page when image is clicked
function openInNewTab(url) {
    const open = window.open(url, '_blank');
    open.focus();
}
