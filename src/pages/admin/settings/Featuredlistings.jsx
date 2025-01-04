import React, { useState, useEffect } from 'react';
import { DashLayout } from '@/components/pages/dashboard/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import {
  fetchFeaturedListings,
  fetchNonFeaturedListings,
  adjustFeaturedListings,
  resetEditStatus
} from '@/reduxstore/slices/listingSlice';
import Link from 'next/link';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import { ListingCard } from '@/components/ui/cards/listingCard';
import { Button } from '@/components/ui/buttons';
import { useModal } from '@/components/ui/Modal/hooks/useModal';
import { Panel } from '@/components/ui/Panel';
import { EntriesPanel } from '@/components/pages/dashboard/Settings/EntriesPanel';
import Modal from '@/components/ui/Modal';

const Featuredlistings = () => {
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();
  const featuredListings = useSelector(
    (state) => state.listings.featuredListings
  );
  const additionalListings = useSelector((state) => state.listings.listings);

  const editStatus = useSelector((state) => state.listings.editStatus);

  const singleListing = useSelector((state) => state.listings.singleListing);

  const { modalTarget, origin, openModalTarget, closeModalTarget } = useModal();
  const modalOpen = useSelector((state) => state.ui.isModalOpen);


  const [selectedEntry, setSelectedEntry] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const checkTarget = () => {
    if (modalTarget === 'additionalListings') {
      return (
        <EntriesPanel 
          heading="Additional Listings"
        >

          <div className="additional-listings">

            <div className="replaced-entry">

              <h3 className="heading-3">
                Listing You Are Replacing
              </h3>

              <h4 className="heading-4">
                Slot: <span className="index-num">{selectedIndex}</span>
              </h4>

              <ListingCard key={selectedEntry.id} listing={selectedEntry} nohover={true} />
            </div>

            <div className="listings">
              {additionalListings?.map((listing, index) => (
                <div className="entry" key={listing.id}>
                  <ListingCard key={listing.id} listing={listing} nohover={true} />

                  <div className="hovered-overlay">

                    <div className="overlay">
                      <Button
                        classes="btn btn-primary-grad"
                        onClick={() => {
                          // closeModalTarget();
                          dispatch(adjustFeaturedListings({
                            featured: selectedIndex,
                            id: listing.id,
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
      );
    }

    return null;
  };

  useEffect(() => {
    dispatch(fetchFeaturedListings());
  }, [dispatch]);

  useEffect(() => {
    if (editStatus === 'succeeded') {
      dispatch(fetchFeaturedListings());
      setSelectedEntry(singleListing)
      // closeModalTarget();
    }
  }, [editStatus, dispatch]);

  useEffect(() => {
    dispatch(resetEditStatus());
  }, [modalOpen]);

  return (
    <DashLayout>
      <div className="adjust-featured-listings-pg">
        <Sectionheading heading="Featured Listings" />

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

        <div className="featured-listings">
          {featuredListings.map((listing, index) => (
            <div className="featured-Listing" key={listing.id}>
              <h3 className="heading-3">
                Index: <span className="index-num">{index + 1}</span>
              </h3>
              <ListingCard key={listing.id} listing={listing} nohover={true} />

              <div className="hovered-overlay">
                <Button
                  classes="btn btn-primary-grad"
                  onClick={() => {
                    openModalTarget('additionalListings', 'additionalListings');
                    dispatch(fetchNonFeaturedListings());
                    setSelectedEntry(listing)
                    setSelectedIndex(index + 1)
                  }}
                >
                  Change
                </Button>

                <div className="overlay"></div>
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
  );
};

export default Featuredlistings;
