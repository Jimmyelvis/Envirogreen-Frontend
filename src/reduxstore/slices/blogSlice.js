import { network } from '@/helpers/constants';
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
