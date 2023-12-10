const initialState = { cards: [] }
const GET_CARDS = 'GET_CARDS'


export const CardsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CARDS:
          
          let cards = []
          let request = new XMLHttpRequest()
          request.open(
            'GET',
            `http://localhost:8000/cards/${action.collId}`,
            false
          ) // `false` makes the request synchronous
          request.send(null)
    
          if (request.status === 200) {
            const arrayOfCollections = JSON.parse(request.responseText)
            for (let card in arrayOfCollections) {
              cards.push(arrayOfCollections[card])
            }
          }
          console.log("cards", cards)
        return { ...state, cards: cards };
      default:
        return state;
    }
  };


export const getCards = (collId) => ({
    type: GET_CARDS,
    collId,
  });