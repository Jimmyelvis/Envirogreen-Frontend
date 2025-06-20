So another interesting issue has come up: this is the Blogcategory page that I posted earlier now updated with the code you gave me: import Layout from '@/components/ui/Layout';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { wrapper } from '@/reduxstore/store';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Panel } from '@/components/ui/Panel';
import { network } from '@/helpers/constants';
import { useRouter } from 'next/router';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import { Select } from '@/components/ui/select';
import { BlogCard } from '@/components/ui/cards/blogCard';
import { Pagination } from '@/components/ui/Pagination';
import { debounce } from '@/utils/debounce';
import {
  squareLoader,
  fadingDotsLoader,
  circleLoader,
} from '@/components/ui/Loaders';
import Search_icon from '@/components/assets/img/search-icon.svg';
import {
  setBlogs,
  fetchCategories,
  fetchFeaturedBlogs,
} from '@/reduxstore/slices/blogSlice';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import { CategoryPanel } from '@/components/pages/blog/CategoryPanel';

const Blogcategory = () => {
  const router = useRouter();
  const { id } = router.query; // Get category ID from the URL
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.blogs.categories);
  const blogs = useSelector((state) => state.blogs.blogs);

  const { posts, count, message, name } = blogs;

  const getBlogs = () => {
    if (posts) {
      let newPosts = [...posts];

      return newPosts
        .sort((a, b) => a.created_at - b.created_at)
        .map((post) => {
          return <BlogCard post={post} key={post.id} />;
        });
    } else {
      return <div className="loader">{circleLoader}</div>;
    }
  };

  useEffect(() => {
    if (!id) return; // Ensure the ID is present before fetching

    const fetchCategoryBlogs = async () => {
      try {
        const response = await fetch(`${network.api}blogs/categoryposts/${id}`);
        const data = await response.json();
        dispatch(setBlogs(data)); // Update Redux store with new category blogs
      } catch (error) {
        console.error('Error fetching category blogs:', error);
      }
    };

    fetchCategoryBlogs();
  }, [id, dispatch]); // Runs whenever category ID changes

  // useEffect(() => {
  //   if (!id) return; // Ensure ID is present before proceeding

  //   const fetchCategoryBlogs = async () => {
  //     try {
  //       dispatch(setBlogs({ posts: [], count: 0 })); // Clear old posts before fetching new ones

  //       const response = await fetch(`${network.api}blogs/categoryposts/${id}`);
  //       const data = await response.json();
  //       dispatch(setBlogs(data)); // Update Redux store with new category blogs
  //     } catch (error) {
  //       console.error('Error fetching category blogs:', error);
  //     }
  //   };

  //   fetchCategoryBlogs(); // Fetch blogs on initial render when ID is available

  //   const handleRouteChange = () => {
  //     dispatch(setBlogs({ posts: [], count: 0 })); // Clear old posts on route change
  //   };

  //   router.events.on('routeChangeComplete', handleRouteChange);

  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };

  // }, [id, dispatch, router.events]); // Runs when `id` changes or route updates

  return (
    <Layout>
      <div className="blogs-pg">
        <div className="feature-section">
          <Sectionheading_left_bar
            heading="Writings from our team"
            subheading={`${name} Category: ${count} blogs`}
          />
        </div>
        <div className="blogs-section">
          <TextFieldGroup
            placeholder="Search Blogs"
            name="search"
            value=""
            // onChange={() => {}}
            icon={Search_icon}
            iconPosition="right"
            classes={'search-input'}
          />

          <div className="blogs">{getBlogs()}</div>

          <div className="filters">
            <CategoryPanel />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.params;
    const response = await fetch(`${network.api}blogs/categoryposts/${id}`);
    const data = await response.json();

    console.log('data:', data);

    console.log('called');
    store.dispatch(setBlogs(data));
  }
);

export default Blogcategory;

If I click on my main navbar, after this page has loaded and go to my overall blogs page: import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import Layout from '@/components/ui/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs, fetchCategories, fetchFeaturedBlogs } from '@/reduxstore/slices/blogSlice';
import { wrapper } from '@/reduxstore/store';
import { network } from '@/helpers/constants';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import { Select } from '@/components/ui/select';
import { useRouter } from 'next/router';
import { BlogCard } from '@/components/ui/cards/blogCard';
import { Pagination } from '@/components/ui/Pagination';
import { debounce } from '@/utils/debounce';
import { Panel } from '@/components/ui/Panel';
import {
  squareLoader,
  fadingDotsLoader,
  circleLoader,
} from '@/components/ui/Loaders';
import Search_icon from '@/components/assets/img/search-icon.svg';
import { CategoryPanel } from '@/components/pages/blog/CategoryPanel';

const Blogs = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs.blogs);
  const featuredBlogs = useSelector((state) => state.blogs.featuredBlogs);
  const categories = useSelector((state) => state.blogs.categories);

  const { data, count, message, current_page, last_page, per_page } = blogs;

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchFeaturedBlogs());
  }, [dispatch]);

  const getFeatured = () => {
    const featuredPosts = featuredBlogs
      .filter((post) => post.featured > 0)
      .sort((a, b) => a.featured - b.featured);

    return (
      <div className="featured-posts">
        {featuredPosts.map((post) =>
          post.featured === 1 ? (
            <div className="featured-posts-first" key={post.id}>
              <BlogCard post={post} key={post.id} />
            </div>
          ) : post.featured === 2 ? (
            <div className="featured-posts-second" key={post.id}>
              <BlogCard post={post} key={post.id} />
            </div>
          ) : post.featured === 3 ? (
            <div className="featured-posts-third" key={post.id}>
              <BlogCard post={post} key={post.id} />
            </div>
          ) : post.featured === 4 ? (
            <div className="featured-posts-fourth" key={post.id}>
              <BlogCard post={post} key={post.id} />
            </div>
          ) : post.featured === 5 ? (
            <div className="featured-posts-fifth" key={post.id}>
              <BlogCard post={post} key={post.id} />
            </div>
          ) : null
        )}
      </div>
    );
  };

  const getBlogs = () => {

    if (!data) {
      return (
        <div className="loader">
          {circleLoader}
          <p>Loading blogs...</p>
        </div>
      );
    } else {

      return data
        .filter((post) => post.featured === 0)
        .sort((a, b) => a.created_at - b.created_at)
        .map((post) => <BlogCard post={post} key={post.id} />);
    }

  };

  // const getCategories = () => {
  //   return (
  //     <Panel className="categories-panel">
  //       <Sectionheading heading="Categories" />

  //       {categories.map((category) => (
  //         <li key={category.id}>
  //           <Link href={`/blogs/${category.id}`}>{category.category_name}</Link>

  //           <p className="count">
  //             {category.blog_posts_count}
  //             {category.blog_posts_count === 1 ? ' post' : ' posts'}
  //           </p>
  //         </li>
  //       ))}
  //     </Panel>
  //   );
  // };

  return (
    <Layout>
      <div className="blogs-pg">
        <div className="feature-section">
          <Sectionheading_left_bar
            heading="Writings from our team"
            subheading="The latest industry news, and resources"
          />

          {getFeatured()}
        </div>

        <div className="blogs-section">
          <TextFieldGroup
            placeholder="Search Blogs"
            name="search"
            value=""
            // onChange={() => {}}
            icon={Search_icon}
            iconPosition="right"
            classes={'search-input'}
          />

          <div className="blogs">{getBlogs()}</div>

          <div className="filters">
            <CategoryPanel categories={categories} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const response = await fetch(`${network.api}blogs`);
    const data = await response.json();

    console.log('data:', data);

    console.log('called');
    store.dispatch(setBlogs(data));
  }
);

export default Blogs;

The blogs on my main blog page don't get loaded, unless I do a hard refresh. If it helps her is my blogsSlice: import { network } from '@/helpers/constants';
import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAlert } from '@/reduxstore/slices/uiSlice';

// Async thunk for fetching blogs
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();

      const response = await fetch(`${network.api}blogs${queryParams ? `?${queryParams}` : ''}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching single blog
export const fetchSingleBlog = createAsyncThunk(
  'blogs/fetchSingleBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}blogs/${blogId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching all authors
export const fetchAuthors = createAsyncThunk(
  'blogs/fetchAuthors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}blogs/authors`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating a blog
export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}admin/blog/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(blogData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for editing a blog
export const editBlog = createAsyncThunk(
  'blogs/editBlog',
  async (blogData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${network.api}admin/blog/${blogData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(blogData),
      });
      if (!response.ok) {
        const data = await response.json();
        dispatch(createAlert(data.error, 'danger'));
        throw new Error(data.error)
      };
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a blog
export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${network.api}blogs/${blogId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return blogId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching featured blogs
export const fetchFeaturedBlogs = createAsyncThunk(
  'blogs/fetchFeaturedBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}blogs/featured`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching blogs that are NOT featured
export const fetchNonFeaturedBlogs = createAsyncThunk(
  'blogs/fetchNonFeaturedBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}blogs/notfeatured`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Async thunk for fetching count of blogs posts
export const fetchBlogsCount = createAsyncThunk(
  'blogs/fetchBlogsCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}blogs/count`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.count;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



//Async thunk for fetching all the Categories
export const fetchCategories = createAsyncThunk(
  'blogs/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}blogs/categories`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching latest blogs
export const fetchLatestBlogs = createAsyncThunk(
  'blogs/fetchLatestBlogs',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${network.api}blogs?${queryParams}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.posts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  } 
);

// Async thunk for adjusting featured blogs
export const adjustFeaturedBlogs = createAsyncThunk(
  'blogs/adjustFeaturedBlogs',
  async (blogData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${network.api}admin/blog/set-featured`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(blogData),
      });
      
        // Check if response is not okay
        if (!response.ok) {
          const errorData = await response.json(); // Await here to get the error details
          dispatch(createAlert(errorData.error, 'danger')); // Dispatch the error message
  
          if (errorData.errors) {
            errorData.errors.forEach((error) => {
              dispatch(createAlert(error, 'danger'));
            });
  
            return rejectWithValue(errorData.errors);
          }
  
          return rejectWithValue(errorData.error); // Reject the thunk with the error message
  
        }


      const data = await response.json();

      dispatch(createAlert(data.message, 'success'));

      return data;
    } catch (error) {
      console.error('Error occurred while adjusting featured blogs:', error);
      dispatch(createAlert('An unexpected error occurred.', 'danger')); // Dispatch a fallback error message
      return rejectWithValue(error.message); // Optionally reject with the error message
    }
  }
);


const initialState = {
  blogs: null,
  adminBlogs: [],
  singleBlog: null,
  status: 'idle',
  creationStatus: 'idle',
  editStatus: 'idle',
  featuredBlogs: [],
  fetchAuthorsStatus: 'idle',
  error: null,
  count: 0,
  categories: [],
  authors: [],
  createdBlog: null,
  latestBlogs: [],
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    clearSingleBlog: (state) => {
      state.singleBlog = null;
    },
    resetEditStatus: (state) => {
      state.editStatus = 'idle';
    },
    resetCreationStatus: (state) => {
      state.creationStatus = 'idle';
    },
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setBlog: (state, action) => {
      state.singleBlog = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.blogs,
        };
      })
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.adminBlogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchSingleBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singleBlog = action.payload.post;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.creationStatus = 'loading';
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.creationStatus = 'succeeded';
        state.createdBlog = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.creationStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(editBlog.pending, (state) => {
        state.editStatus = 'loading';
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.editStatus = 'succeeded';
        state.singleBlog = action.payload.post;
      })
      .addCase(editBlog.rejected, (state, action) => {
        state.editStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAuthors.pending, (state) => {
        state.fetchAuthorsStatus = 'loading';
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.fetchAuthorsStatus = 'succeeded';
        state.authors = action.payload.blog_authors;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.fetchAuthorsStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchFeaturedBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeaturedBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.featuredBlogs = action.payload.posts;
      })
      .addCase(fetchFeaturedBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchNonFeaturedBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNonFeaturedBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload.posts;
      })
      .addCase(fetchNonFeaturedBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchBlogsCount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogsCount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.count = action.payload;
      })
      .addCase(fetchBlogsCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchLatestBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLatestBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.latestBlogs = action.payload;
      })
      .addCase(fetchLatestBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(adjustFeaturedBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adjustFeaturedBlogs.fulfilled, (state, action) => {
        state.editStatus = 'succeeded';
        state.singleBlog = action.payload.post;
      })
      .addCase(adjustFeaturedBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action
      })
  }
});

export const { clearSingleBlog, resetEditStatus, resetCreationStatus, setBlog, setBlogs } = blogSlice.actions;

export default blogSlice.reducer;

and Reduxstore: import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import userReducer from './slices/userSlice';
import listings from './slices/listingSlice';
import staff from './slices/staffSlice';
import uiReducer from './slices/uiSlice';
import blogs from './slices/blogSlice';
import settings from './slices/settingsSlice';

const combinedReducer = combineReducers({
    user: userReducer,
    listings,
    staff,
    blogs,
    ui: uiReducer,
    settings,
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
        if (state.blogs) {
            nextState.blogs = {
                ...state.blogs,
                ...action.payload.blogs,
                status: 'loading',
                blogs: state.blogs.blogs || action.payload.blogs.blogs, // Preserve blogs
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
                modalContent: state.ui.modalContent || action.payload.ui.modalContent, // Preserve modal content
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


Answer: ----------------------------------

Your issue is likely happening because **Redux state is not resetting properly** when navigating between the **category page** and the **main blog page**. The **hydration process** in Next.js may be causing stale state issues.

### **🔍 What’s Happening?**

* When navigating from a **category page** to the **blogs page**, Redux **still holds the previous category data**.
* Since **getServerSideProps** is fetching new data but Redux is not cleared before, the state stays unchanged until a **hard refresh**.
* Your **category page loads fine**, but when switching to the main **blogs page**, it still holds old state until refreshed.

---

## ✅ **How to Fix It?**

You need to **clear the blog state** before fetching new data. Modify the `Blogs` component as follows:

### **1️⃣ Reset Redux State When Navigating to the Main Blogs Page**

Inside `Blogs.js`, use a `useEffect` hook to **clear the previous state** before fetching new blogs:

```jsx
useEffect(() => {
  dispatch(setBlogs({ data: [], count: 0 })); // Clear previous blogs before loading new ones
}, [dispatch]);
```

Now, **whenever the Blogs page is mounted**, it clears out the previous state.

---

### **2️⃣ Update Your `getServerSideProps` in `Blogs.js`**

Modify `getServerSideProps` to **fetch fresh data properly**:

```jsx
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    // Clear previous state before fetching
    store.dispatch(setBlogs({ data: [], count: 0 }));

    const response = await fetch(`${network.api}blogs`);
    const data = await response.json();

    store.dispatch(setBlogs(data)); // Load new data

    return { props: {} }; // Return empty props (data already in Redux)
  }
);
```

🔹 This ensures **Redux gets cleared first** before fetching fresh data.

---

### **3️⃣ Ensure Category Page Clears Redux on Route Change**

In `Blogcategory.js`, modify the `useEffect` hook to clear old state before fetching a new category:

```jsx
useEffect(() => {
  if (!id) return;

  dispatch(setBlogs({ posts: [], count: 0 })); // Reset blogs before fetching new ones

  const fetchCategoryBlogs = async () => {
    try {
      const response = await fetch(`${network.api}blogs/categoryposts/${id}`);
      const data = await response.json();
      dispatch(setBlogs(data)); // Update Redux store with new category blogs
    } catch (error) {
      console.error('Error fetching category blogs:', error);
    }
  };

  fetchCategoryBlogs();
}, [id, dispatch]);
```

🔹 Now, **when clicking different categories**, previous posts will **clear before new ones load**.

---

### **🚀 Expected Result**

* ✅ **Navigating between category pages works** without showing stale data.
* ✅ **Going from a category page to the main blogs page works** without needing a refresh.
* ✅ **Redux always holds fresh data** when navigating pages.

---

Give this a shot and let me know if you need more help! 🚀
