const loadData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    const videos = data.data;
    displayCategory(videos);
}

loadData(1000);

const loadSortData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    const videos = data.data;
    function sort(videos) {
        return videos.sort((b, a) => parseFloat(a.others.views) - parseFloat(b.others.views));
    }
    const sortData = sort(videos);
    displayCategory(sortData);
    console.log(sortData);
}

const displayCategory = (videos) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    const notFound = document.getElementById('not-found');
    if (videos.length === 0) {
        notFound.classList.remove('hidden');
    }
    else {
        notFound.classList.add('hidden');
    }

    videos.forEach((video) => {
        let hour = 0;
        let minute = 0;
        function secondsToHourMinute(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            hour = hours;
            minute = minutes;
        }
        secondsToHourMinute(video.others.posted_date);
        //////////
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
            <div class="mb-5"> <!--Card-->
            <div class="mb-4 relative"> <!--img-->
                <img class="rounded-lg w-full h-48" src="${video.thumbnail}" alt="">
                    <div id="time"
                        <div class="absolute bg-zinc-600 rounded text-white right-3 bottom-3">
                            <p class="text-sm w-full"><span class="" id="hr">${video.others.posted_date ? `&nbsp&nbsp${hour} hrs ${minute} min ago &nbsp` : ''}</span><span id="min"></span></p>
                        </div>
                    </div>
            </div>
            <div class="flex gap-2">
                <div class=""> <!--profile pic-->
                    <img class="rounded-full h-10 w-10" src="${video.authors[0].profile_picture}" alt="">
                </div>
                <div class="">  <!--Title-->
                    <h4 class="font-bold">${video.title}</h4>
                </div>
            </div>
            <div class="ml-12"> <!--Name & views-->
                <div class="flex gap-1 w-full">
                    <h6 class="font-normal">${video.authors[0].profile_name} <span></span></h6>
                    <span>${video.authors[0].verified ? `<img src="./image/fi_10629607.png">` : ''}</span>
                </div>
                <p>${video.others.views}<span> views</span></p>
            </div>
            </div>
        `
        cardContainer.appendChild(videoCard);
    });
};

let sortId = 1000;
const handleBtnAll = (id) => {
    loadData(id);
    sortId = 1000;
}
const handleBtnMusic = (id) => {
    loadData(id);
    sortId = 1001;
}
const handleBtnComedy = (id) => {
    loadData(id);
    sortId = 1003;
}
const handleBtnDrawing = (id) => {
    loadData(id);
    sortId = 1005;
}
const sortBtn = () => {
    sortId = sortId;
    loadSortData(sortId);
}


const navContainer = document.getElementById('nav-container');
navContainer.innerHTML = `
    <div class="w-full flex justify-start"><img src="./image/Logo.png" alt="Logo.png"></div>
    <div class="w-full flex justify-center"><button onclick="sortBtn(1000)" class="bg-slate-200 hover:bg-slate-300 duration-75 text-black py-2 px-3 rounded">Sort by view</button></div>
    <div class="w-full flex justify-end"><a href="./page/blog.html" target="_blank"><button class="bg-[#ff4c64] hover:bg-[#ff203d] duration-75 text-white py-2 px-4 rounded">Blog</button></a></div>
`

const hrRuler = document.getElementById('hr-Ruler');
hrRuler.innerHTML = `<hr/ class="my-7 border-t-1 border-gray-300 mx-4 lg:mx-0">`

const categoryMenuButton = document.getElementById('category-btn-container');
categoryMenuButton.innerHTML = `
    <div class="flex justify-center gap-4">
        <button id="all" onclick="handleBtnAll('1000')" class="py-1 px-4 duration-75 rounded">All</button>
        <button id="music" onclick="handleBtnMusic('1001')" class="py-1 px-4 duration-75 rounded">Music</button>
        <button id="comedy" onclick="handleBtnComedy('1003')" class="py-1 px-4 duration-75 rounded">Comedy</button>
        <button id="drawing" onclick="handleBtnDrawing('1005')" class="py-1 px-4 duration-75 rounded">Drawing</button>
    </div>
`

const notFoundContainer = document.getElementById('not-found-container');
notFoundContainer.innerHTML = `
    <div id="not-found" class="text-center hidden">
    <div class="flex justify-center">
        <img src="./image/Icon.png" alt="">
    </div>
    <h2 class="text-3xl font-bold mt-4">Oops!! Sorry, There is no <br> content here</h2>
    </div>
`
