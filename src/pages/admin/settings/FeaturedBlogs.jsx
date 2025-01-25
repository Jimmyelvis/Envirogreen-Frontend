import React, { useState, useEffect } from 'react';
import { DashLayout } from '@/components/pages/dashboard/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import {
  fetchFeaturedBlogs,
  fetchNonFeaturedBlogs,
  adjustFeaturedBlogs,
  resetEditStatus
} from '@/reduxstore/slices/blogSlice';
import Link from 'next/link';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import { BlogCard } from '@/components/ui/cards/blogCard';
import { Button } from '@/components/ui/buttons';
import { useModal } from '@/components/ui/Modal/hooks/useModal';
import { Panel } from '@/components/ui/Panel';
import { EntriesPanel } from '@/components/pages/dashboard/Settings/EntriesPanel';
import Modal from '@/components/ui/Modal';




const FeaturedBlogs = () => {

  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();

  const featuredBlogs = useSelector(
    (state) => state.blogs.featuredBlogs
  );

  const additionalBlogs = useSelector((state) => state.blogs.blogs);

  const editStatus = useSelector((state) => state.blogs.editStatus);

  const singleBlog = useSelector((state) => state.blogs.singleBlog);

  const { modalTarget, origin, openModalTarget, closeModalTarget } = useModal();

  const modalOpen = useSelector((state) => state.ui.isModalOpen);


  const [selectedEntry, setSelectedEntry] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const checkTarget = () => {
    if (modalTarget === 'additionalBlogs') {
      return (
        <EntriesPanel 
          heading="Additional Blogs"
        >

          <div className="additional-blogs">

            <div className="replaced-entry">

              <h3 className="heading-3">
                Blog You Are Replacing
              </h3>

              <h4 className="heading-4">
                Slot: <span className="index-num">{selectedIndex}</span>
              </h4>

              <BlogCard key={selectedEntry.id} post={selectedEntry} nohover={true} />
            </div>

            <div className="blogs">

              {additionalBlogs?.map((blog, index) => (
                <div className="entry" key={blog.id}>
                  <BlogCard key={blog.id} post={blog} />

                  <div className="hovered-overlay">

                    <div className="overlay">
                      <Button
                        classes="btn btn-primary-grad"
                        onClick={() => {
                          dispatch(adjustFeaturedBlogs({
                            featured: selectedIndex,
                            post_id: blog.id,
                          }));
                        }}
                      >
                        Replace
                      </Button>
                    </div>
                  </div>
                </div>
              ))}


              
          </div>

        </div>
        </EntriesPanel>
      )
    }

    return null;
  }

  useEffect(() => {
    dispatch(fetchFeaturedBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (editStatus === 'succeeded') {
      dispatch(fetchFeaturedBlogs());
      setSelectedEntry(singleBlog)
    }
  }, [editStatus, dispatch]);


  useEffect(() => {
    dispatch(resetEditStatus());
  }, [modalOpen]);



  return (
    <DashLayout>

      <div className="adjust-featured-blogs-pg">

        <Sectionheading heading="Featured Blogs" />

        <div className="adjust-indexes">
          <Sectionheading
            heading="Adjust Indexes"
            classes="adjust-indexes-heading"
          />

          <TextFieldGroup
            name="index"
            placeholder="Index"
            type="number"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
          />
        </div>

        <div className="featured-blogs">
          {featuredBlogs.map((blog, index) => (
            <div className="featured-blog" key={blog.id}>
              <h3 className="heading-3">
                Index: <span className="index-num">{index + 1}</span>
              </h3>
              <BlogCard key={blog.id} post={blog}  />

              <div className="hovered-overlay">
                <Button
                  classes="btn btn-primary-grad"
                  onClick={() => {
                    openModalTarget('additionalBlogs', 'additionalBlogs');
                    dispatch(fetchNonFeaturedBlogs());
                    setSelectedEntry(blog)
                    setSelectedIndex(index + 1)
                  }}
                >
                  Change
                </Button>

              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        modalTarget={modalTarget}
        origin={origin}
        selector={'#root_modal'}
        overlayColor={'rgb(255 255 255 / 88%)'}
        backdropFilter={'blur(11px) brightness(1)'}
      >
        {checkTarget()}
      </Modal>



  


    </DashLayout>
  )
}

export default FeaturedBlogs
