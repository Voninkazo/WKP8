console.log('it works');

let songs = [];
const myForm = document.querySelector('form');
const tableList = document.querySelector('table');

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
    }
    songs.push(newSong);
    console.log(songs);
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
}

const showLists = () => {
    const html = songs
        .map(song => {
            return `
        <tr>
            <td>
                <img src="${song.photo}" alt="This is the artist image">
            </td>
            <td class="spans">
                <span>${song.title}</span><br>
                <span>${song.style}</span>
            </td>
            <td class="spans">
                <span>${song.artist}</span><br>
                <span> ${song.length}</span>
            </td>
            <td>
                SCORE: 0
                <button class="score-btn"> +1 </button>
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

const handleDelete = e => {
    const deleteIcon = e.target.closest('button.delete');
    if (deleteIcon) {
        const id = Number(deleteIcon.value);
        deleteSong(id);
    }
}

const deleteSong = id => {
    songs = songs.filter(song => song.id !== id);
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
};

const initToLocalStorage = () => {
    const songList = JSON.parse(localStorage.getItem('songs'));
    if (!songList) {
        songs = [];
    } else {
        songs = songList;
    }
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
}

const updateLocalStorage = () => {
    localStorage.setItem('songs', JSON.stringify(songs));
}

myForm.addEventListener('submit', addSong);
tableList.addEventListener('listUpdated', showLists);
tableList.addEventListener('click', handleDelete);
tableList.addEventListener('listUpdated', updateLocalStorage);
initToLocalStorage();