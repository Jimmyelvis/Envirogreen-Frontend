import React, { useState, useEffect, useCallback } from 'react';
import { DashLayout } from '@/components/pages/dashboard/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, fetchAuthors } from '@/reduxstore/slices/blogSlice';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/buttons';
import { openModal } from '@/reduxstore/slices/uiSlice';
import Modal from '@/components/ui/Modal';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import { useRouter } from 'next/router';
import { Pagination } from '@/components/ui/Pagination';
import { debounce } from '@/utils/debounce';
import { Avatar } from '@/components/ui/avatar';
import { SelectListGroup } from '@/components/ui/form/SelectListGroup';
import { Filters } from '@/components/pages/dashboard/Blogs/Filters';
import { squareLoader, fadingDotsLoader } from '@/components/ui/Loaders';
import { BlogCard } from '@/components/ui/cards/blogCard';
import { useModal } from '@/components/ui/Modal/hooks/useModal';
import { Panel } from '@/components/ui/Panel';

const AdminBlogs = () => {
  const dispatch = useDispatch();
  const limit = 115;
  const [scrolled, setScrolled] = useState(false);

  const { status } = useSelector((state) => state.blogs);
  const { data, current_page, last_page, total } = useSelector(
    (state) => state.blogs.adminBlogs
  );

  const { authors } = useSelector((state) => state.blogs);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [sort, setSort] = useState('latest (desc)');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [perPage, setPerPage] = useState(8);

  const { modalTarget, origin, openModalTarget, closeModalTarget } = useModal();
  const modalOpen = useSelector((state) => state.ui.isModalOpen);

  const router = useRouter();

  const paginate = (pageNumber) => {
    router.push({
      pathname: '/admin/blog',
      query: {
        page: pageNumber,
        sort,
        author: selectedAuthor,
      },
    });
  };

  const debouncedRouterPush = useCallback(
    debounce((query) => {
      router.push({
        pathname: 'blog',
        query,
      });
    }, 500),
    []
  );

  const selectSortMethod = (sortValue) => {
    setSort(sortValue);

    debouncedRouterPush({
      ...router.query,
      page: 1,
      sort: sortValue,
    });
  };

  const sort_options = [
    {
      value: 'latest-(desc)',
      label: 'latest-(desc)',
    },
    {
      value: 'earliest-(asc)',
      label: 'earliest-(asc)',
    },
  ];

  useEffect(() => {
    const filters = {
      page: router.query.page || 1,
      sort,
      perpage: perPage,
      author: selectedAuthor,
    };

    dispatch(fetchBlogs(filters));
  }, [router.query]);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const getBlogs = () => {
    return data?.map((post) => {
      return (
        <>
          {status === 'loading' && (
            <div className="loading">{fadingDotsLoader()}</div>
          )}

          <BlogCard post={post} admin />
        </>
      );
    });
  };

  const checkTarget = () => {
    if (modalTarget === 'mobile_filters') {
      return (
        <Panel
          className="mobile-filters-display"
        >
          <Sectionheading
            heading={` ${total} Blogs`}
            subheading={`Showing ${data?.length} of ${total} blogs`}
          />

          <Filters
            router={router}
            debouncedRouterPush={debouncedRouterPush}
            perpage={perPage}
            setPerPage={setPerPage}
            authors={authors}
            selectedAuthor={selectedAuthor}
            setSelectedAuthor={setSelectedAuthor}
            dispatch={dispatch}
          />
        </Panel>
      );
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', () => changeBg(setScrolled));

    return () => {
      window.removeEventListener('scroll', () => changeBg(setScrolled));
    };
  }, []);

  return (
    <DashLayout>
      <div className="admin-blogs">
        <div
          className={
            scrolled
              ? 'mobile-filters mobile-filters-scrolled'
              : 'mobile-filters'
          }
        >
          <button
            className="btn btn-primary-grad mobile-filters-btn"
            onClick={() => {
              openModalTarget('mobile_filters', 'mobile_filters');
            }}
          >
            Filters
          </button>
        </div>

        <div className="top">
          {status === 'succeeded' && (
            <Sectionheading
              heading={` ${total} Blogs`}
              subheading={`Showing ${data?.length} of ${total} blogs`}
            />
          )}

          <SelectListGroup
            default_value={sort}
            value={sort}
            onChange={(e) => {
              selectSortMethod(e.target.value);
            }}
            options={sort_options}
            name="sort"
            id="sort"
            classes="sort-select"
          />
        </div>

        <Filters
          router={router}
          debouncedRouterPush={debouncedRouterPush}
          perpage={perPage}
          setPerPage={setPerPage}
          authors={authors}
          selectedAuthor={selectedAuthor}
          setSelectedAuthor={setSelectedAuthor}
          dispatch={dispatch}
        />

        <div className="blogs">{getBlogs()}</div>

        <Pagination
          lastPage={last_page}
          currentPage={current_page}
          paginate={paginate}
        />

        <Modal
          modalTarget={modalTarget}
          origin={origin}
          selector={'#root_modal'}
        >
          {checkTarget()}
        </Modal>
      </div>
    </DashLayout>
  );
};

export default AdminBlogs;
