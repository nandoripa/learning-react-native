const apiURL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=a31fcc7403d9f6d8c9b8ab240e1b0692&format=json'

function getArtists() {
  return fetch(apiURL)
    .then(response => response.json())
    .then(data => data.topartists.artist)
    .then(artists => artists.map(artist => {
      return {
        name: artist.name,
        image: artist.image[3]['#text'],
        likes: 200,
        comments: 140
      }
    }))
}

export { getArtists }
