console.log('it works');

let songs = [];
const myForm = document.querySelector('form');
const tableList = document.querySelector('table');

const filterByScore = () => {
        songs.sort((a, b) => a.score - b.score);
    }
    // create a new object of a new song
const addSong = e => {
        e.preventDefault();
        const formElm = e.currentTarget;
        const newSong = {
                title: formElm.title.value,
                artist: formElm.artist.value,
                style: formElm.style.value,
                length: formElm.length.value,
                id: Date.now(),
                photo: formElm.photo.value,
                score: 0,
            }
            // push into the Mama object
        songs.push(newSong)
            //sort alphabeticaly by title
        filterByScore();
        // create dispatch event
        tableList.dispatchEvent(new CustomEvent('listUpdated'));
    }
    // show song list
const showLists = () => {
    const html = songs
        .map(song => {
            return `
        <tr>
            <td>
                <img src="${song.photo}" alt="This is the artist image">
            </td>
            <td>
                <span>${song.title}</span><br>
                <span>${song.style}</span>
            </td>
            <td>
                <span>${song.artist}</span><br>
                <span> ${song.length}</span>
            </td>
            <td class="score">Score: ${song.score}</td>
            <td>
                <button class="increase-score" area-label="increase score" value="${song.id}">+1</button>
            </td>
            <td>
                <button value="${song.id}" class="delete" area-label="Delete the ${song.title} from the list">
                    <img src="./assets/icon.svg" alt="Delete ${song.title} from the list">
                </button>
            </td>
        </tr>
        `;
        }).join(' ')
    tableList.innerHTML = html;
    myForm.reset();
}

// handle increase button 
const increaseScore = id => {
    let scoreToIncrease = songs.find(song => song.id === id);
    console.log(scoreToIncrease);
    scoreToIncrease.score++;
    // filter by score again
    filterByScore();
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
}

// handle delte icon to remove an item
const handleClick = e => {
    // handle increament button
    const btnIncreament = e.target.closest('button.increase-score');
    if (btnIncreament) {
        const id = Number(btnIncreament.value);
        increaseScore(id);
    }

    // handle the delete button
    const deleteIcon = e.target.closest('button.delete');
    if (deleteIcon) {
        const id = Number(deleteIcon.value);
        deleteSong(id);
    }
}

// get the id of the delted item and remove it totally
const deleteSong = id => {
    songs = songs.filter(song => song.id !== id);
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
};

// filter by style when choosing the dropdown
const songToFilter = document.querySelector('#song-style');
const filterByStyle = e => {
    // filter song
    let filterSong = songToFilter.value; // we grab the value from the select input
    let choosenStyle; // decare a variable to store that value and filter it
    choosenStyle = songs.filter(song => song.style.toLowerCase() === filterSong.toLowerCase());
    // generate the filtered songs
    const html = choosenStyle
        .map(song => {
            return `
            <tr>
            <td>
                <img src="${song.photo}" alt="This is the artist image">
            </td>
            <td>
                <span>${song.title}</span><br>
                <span>${song.style}</span>
            </td>
            <td>
                <span>${song.artist}</span><br>
                <span> ${song.length}</span>
            </td>
            <td class="score">Score: ${song.score}</td>
            <td>
                <button class="increase-score" area-label="increase score" value="${song.id}">+1</button>
            </td>
            <td>
                <button value="${song.id}" class="delete" area-label="Delete the ${song.title} from the list">
                    <img src="./assets/icon.svg" alt="Delete ${song.title} from the list">
                </button>
            </td>
        </tr>
    `;
        }).join('')
        // sort again once it's filtered by style
    filterByScore();
    tableList.innerHTML = html;
};

// handle filter by title when enering any title in the input
const inputTitle = document.querySelector('#name');
const filterByTitle = e => {
    // filter song
    let filterTitle = inputTitle.value; // we grab the value from the input
    let chooseTitle; // declare a variable to store that value and filter it
    chooseTitle = songs.filter(song => song.title.toLowerCase().includes(filterTitle.toLowerCase()));
    // generate the filtered songs
    const html = chooseTitle
        .map(song => {
            return `
            <tr>
            <td>
                <img src="${song.photo}" alt="This is the artist image">
            </td>
            <td>
                <span>${song.title}</span><br>
                <span>${song.style}</span>
            </td>
            <td>
                <span>${song.artist}</span><br>
                <span> ${song.length}</span>
            </td>
            <td class="score">Score: ${song.score}</td>
            <td>
                <button class="increase-score" area-label="increase score" value="${song.id}">+1</button>
            </td>
            <td>
                <button value="${song.id}" class="delete" area-label="Delete the ${song.title} from the list">
                    <img src="./assets/icon.svg" alt="Delete ${song.title} from the list">
                </button>
            </td>
        </tr>
    `;
        }).join('')
        // sort again once it's filtered by style
    filterByScore();
    tableList.innerHTML = html;
};

// reset the filtered list and show all songs
const buttonFilter = document.querySelector('#reset'); // btn reset
const resetFilter = e => {
    let mySong = songs;
    mySong;
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
};

// save in the local storage
const initToLocalStorage = () => {
    const songList = JSON.parse(localStorage.getItem('songs'));
    if (!songList) {
        songs = [];
    } else {
        songs = songList;
    }
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
}

// update local storage after deleting items
const updateLocalStorage = () => {
    localStorage.setItem('songs', JSON.stringify(songs));
}


myForm.addEventListener('submit', addSong);
tableList.addEventListener('listUpdated', showLists);
tableList.addEventListener('click', handleClick);
tableList.addEventListener('listUpdated', updateLocalStorage);
songToFilter.addEventListener('change', filterByStyle);
buttonFilter.addEventListener('click', resetFilter);
inputTitle.addEventListener('keyup', filterByTitle);

initToLocalStorage();