// flickr api key - b6438575b68e06086eb468aedd4d2a67
// flickr api secret - f609f599f1171b16
// flickr user id - 137892914@N08

var allReturendPhotos, indexLast, indexFirst;
var picDiv = document.querySelector("#picPlace");
var bigPic = document.querySelector("#bigPic");
var allPhotosUrl=[];


function search(){
    picDiv.innerHTML = "";
    var inputSearchValue = document.querySelector("#searchInput").value;
    $.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b6438575b68e06086eb468aedd4d2a67&tags="+inputSearchValue+"&format=json&nojsoncallback=1",
        function(data, status){
            allReturendPhotos = data.photos.photo;
            displayPics();
            displayBigPic(allPhotosUrl[0]);
        });
}

function displayPics(){
    for(i=0;i<allReturendPhotos.length;i++){
        var pic = allReturendPhotos[i];
        allPhotosUrl[i] = "https://farm"+pic.farm+".staticflickr.com/"+pic.server+"/"+pic.id+"_"+pic.secret+".jpg";
    }
    for(j=0;j<9;j++){
        addPic(j);
    }
    indexFirst=0;
    indexLast=8;
    document.querySelector("#backBtn").style.display = '';
    document.querySelector("#nextBtn").style.display = '';
}

function displayBigPic(src){
    bigPic.style.display = '';
    bigPic.setAttribute("src", src);
}

function addPic(picIndex,firstPic){
    picIndex = mod(picIndex,100);
    var img = document.createElement("IMG");
     img.setAttribute("src", allPhotosUrl[picIndex]);
     img.setAttribute("class", "routatingPics");
     img.setAttribute("id", "pic"+picIndex);
     img.onclick = function(){
        displayBigPic(allPhotosUrl[picIndex]);
     };
     if(firstPic){
        picDiv.insertBefore(img,firstPic);
     }
     else{
        picDiv.appendChild(img);
     }
}

function removePic(picIndex){
    picIndex = mod(picIndex,100);
    pic = document.querySelector("#pic"+picIndex);
    picDiv.removeChild(pic);
}

function nextPic(){
    removePic(indexFirst++)
    addPic(++indexLast);
}

function previousPic(){
    removePic(indexLast--)
    firstPic = document.querySelector("#pic"+mod(indexFirst,100));
    addPic(--indexFirst,firstPic);
}

function mod(n, m) {
        return ((n % m) + m) % m;
}

