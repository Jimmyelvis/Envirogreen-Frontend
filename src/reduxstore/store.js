import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import userReducer from './slices/userSlice';
import listings from './slices/listingSlice';
import staff from './slices/staffSlice';
import uiReducer from './slices/uiSlice';
import blogs from './slices/blogSlice';
import settings from './slices/settingsSlice';
import contactReducer from './slices/contactSlice';
import newsLetterReducer from './slices/newsLetterSlice';

const combinedReducer = combineReducers({
    user: userReducer,
    listings,
    staff,
    blogs,
    ui: uiReducer,
    settings,
    contact: contactReducer,
    newsLetter: newsLetterReducer,
});



const rootReducer = (state, action) => {


    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };

        // Preserve any state that is loaded client side now
        if (state.listings) {
            nextState.listings = {
                ...state.listings,
                ...action.payload.listings,
                status: 'loading',
                listings: state.listings.listings || action.payload.listings.listings, // Preserve listings
                cities: state.listings.cities || action.payload.listings.cities, // Preserve cities
                states: state.listings.states || action.payload.listings.states, // Preserve states/
                singleListing: action.payload.listings.singleListing ?? state.listings.singleListing,
                categories: state.listings.categories || action.payload.listings.categories, // Preserve categories
                userAgents: state.listings.userAgents || action.payload.listings.userAgents, // Preserve user agents
                searchResults: state.listings.searchResults || action.payload.listings.searchResults, // Preserve search results
            };
            
        }
        // if (state.blogs) {
        //     nextState.blogs = {
        //         ...state.blogs,
        //         ...action.payload.blogs,
        //         status: 'loading',
        //     };
        // }
        // if (state.contact) {
        //     nextState.contact = {
        //         ...state.contact,
        //         ...action.payload.contact,
        //         submitStatus: state.contact.submitStatus, // Preserve submit status during hydration
        //         blogs: action.payload.blogs.blogs ?? state.blogs.blogs, // Preserve blogs
        //         singleBlog: action.payload.blogs.singleBlog ?? state.blogs.singleBlog,
        //         categories: state.blogs.categories || action.payload.blogs.categories, // Preserve categories
        //         authors: state.blogs.authors || action.payload.blogs.authors, // Preserve authors
        //     };
        // }   
        if (state.blogs) {
            nextState.blogs = {
                ...state.blogs,
                ...action.payload.blogs,
                status: 'loading',
                blogs: state.blogs.blogs || action.payload.blogs.blogs,
                // blogs: action.payload.blogs.blogs ?? state.blogs.blogs, // Preserve blogs
                singleBlog: action.payload.blogs.singleBlog ?? state.blogs.singleBlog,
                categories: state.blogs.categories || action.payload.blogs.categories, // Preserve categories
                authors: state.blogs.authors || action.payload.blogs.authors, // Preserve authors
            };
        }  
        if (state.user) {
            nextState.user = {
                ...state.user,
                ...action.payload.user,
                user: state.user.user || action.payload.user.user, // Preserve user
                token: state.user.token || action.payload.user.token, // Preserve token
                status: state.user.status || action.payload.user.status, // Preserve status
            };
        }
        if (state.staff) {
            nextState.staff = {
                ...state.staff,
                ...action.payload.staff,
            };
        }
        if (state.ui) {
            nextState.ui = {
                ...state.ui,
                ...action.payload.ui,
                isModalOpen: state.ui.isModalOpen || action.payload.ui.isModalOpen, // Preserve modal state
                modalContent: state.ui.modalContent , // Preserve modal content
                mobileBgOn: state.ui.mobileBgOn || action.payload.ui.mobileBgOn, // Preserve mobile background
            };
        }
        if (state.settings) {
            nextState.settings = {
                ...state.settings,
                ...action.payload.settings,
                homepageHeader: state.settings.homepageHeader || action.payload.settings.homepageHeader, // Preserve homepage header
                featuredPostSlots: state.settings.featuredPostSlots || action.payload.settings.featuredPostSlots, // Preserve featured post slots
                featuredListingSlots: state.settings.featuredListingSlots || action.payload.settings.featuredListingSlots, // Preserve featured listing slots

            };
        }

        
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

// Create a function to retrieve the initial state from local storage
const getPersistedState = () => {
    if (typeof window !== 'undefined') {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        
        return {
            user: {
                user,
                token,
                status: 'idle',
                error: null
            }
        };
    }
    return {};
};



// Configure the Redux store
export const makeStore = () => configureStore({
    reducer: rootReducer,
    preloadedState: getPersistedState(), // Use the function to set the initial state
    // devTools: true
});

// Create the wrapper with the makeStore function
export const wrapper = createWrapper(makeStore,
    // { debug: true}
);
