console.log('it works');

let songs = [];
const myForm = document.querySelector('form');
const tableList = document.querySelector('table');

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
            //sort alphabeticaly by title
        songs.sort(function(a, b) {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return songs;
        });
        // push into the Mama object
        songs.push(newSong);
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
            <td class="score">
                <label for="number"> SCORE:</label>
                <input type="number" class="number" id="number" name="number" value="0">
                <button>
                    <input id="increase" type="button" value="+1"/>
                </button>
            </td>
            <td>
                <button value="${song.id}" class="delete" area-label="Delete the ${song.title} from the list">
                    <img src="./assets/icon.svg" alt="Delete ${song.title} from the list">
                </button>
            </td>
        `;
        }).join(' ');
    tableList.innerHTML = html;
    myForm.reset();
}

// increase the score of each song when clikcingon the plus button
const increaseScore = () => {
    const scoreInput = document.querySelector('.number');
    if (scoreInput) {
        let scoreValue = parseInt(scoreInput.value);
        scoreValue = isNaN(scoreValue) ? 0 : scoreValue;
        scoreInput.value++;
    }
    // tableList.dispatchEvent(new CustomEvent('listUpdated'));
}
window.addEventListener('click', e => {
    if (e.target.matches('[type="button"]')) {
        increaseScore(e.target.value);
    }
});

// handle delte icon to remove an item
const handleClick = e => {
    const deleteIcon = e.target.closest('button.delete');
    if (deleteIcon) {
        const id = Number(deleteIcon.value);
        deleteSong(id);
    }
}

// const handleScore = id => {
//     const songToUpdate = songs.find(song => song.id === id);
//     songToUpdate.score++;
//     tableList.dispatchEvent(new CustomEvent('listUpdated'));
// };

// get the id of the delted item and remove it totally
const deleteSong = id => {
    songs = songs.filter(song => song.id !== id);
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

initToLocalStorage();