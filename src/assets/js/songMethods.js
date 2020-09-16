export {
    getSongArtists
}
let getSongArtists = function(artistsArr) {
    let nameArr = artistsArr.map(item => item.name)
    return nameArr.join("/")
}