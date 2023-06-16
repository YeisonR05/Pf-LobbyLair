import { 
    GET_ALL_GAMES,
    GET_GAMES_BY_NAME,
    GET_GAME_BY_ID,
    POST_GAME,
    GET_USER_BY_ID,
    GET_USER_BY_NAME,
    GET_USER_BY_EMAIL,
    CREATE_USER,
    LOG_OUT,
    DELETE_USER,
    UPDATE_USER,
    GET_GAMES_WITH_PAGINATION,
    GET_POST_BY_USER_ID,
    DELETE_POST
} from './action-types';

const initialState = {
    games: [],
    game: [],
    post: [],
    pageGames:[],
    user: [],
    acces: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                games: action.payload,
            }
        case GET_GAME_BY_ID:
            return {
                ...state,
                game: action.payload,
            }
        case GET_GAMES_BY_NAME:
            return {
                 ...state,
                 games: action.payload,
                }
        case GET_GAMES_WITH_PAGINATION:
            return {
                ...state,
                pageGames: action.payload
            }

        case CREATE_USER:
            return {
                ...state,
                user: action.payload
            }
        case GET_USER_BY_ID:
            return {
              ...state,
                user: action.payload,
            }
        case GET_USER_BY_NAME:
            return {
              ...state,
                user: action.payload,
            }
        case GET_USER_BY_EMAIL:
            return {
             ...state,
                user: action.payload,
            }
        case LOG_OUT:
            return {
                ...state,
                user: action.payload,
            }
        case  DELETE_USER:
            return {
              ...state,
                user: action.payload,
            }   
        case UPDATE_USER:
            return {
             ...state,
                user: action.payload,
            }    
        case GET_POST_BY_USER_ID:
            return {
              ...state,
                post: action.payload
            }    
        case DELETE_POST:
            return {
              ...state,
                post: action.payload
            }    
        case POST_GAME:
            return {
              ...state,
                game: action.payload
            }    
        default:
                return {
                    ...state
                };
    }
};

export default reducer;
