import React, { useState, useEffect } from 'react';
import SearchIcon from '@/components/assets/img/search-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  searchListings,
  fetchCitiesByQuery,
} from '@/reduxstore/slices/listingSlice';
import Image from 'next/image';
import { Panel } from '@/components/ui/Panel';
import Link from 'next/link';

export const Searchbar = () => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  // const [city_name, setCity_name] = useState("")

  const { count, results } = useSelector(
    (state) => state.listings.searchResults
  );

  useEffect(() => {
    if (query.length > 1) {
      dispatch(searchListings(query)).then((result) => {
        if (result.payload) {
          setSearchResults(result.payload.results);
        }
      });

      console.log('query', query);
    } else {
      setSearchResults([]); // Clear suggestions if query is too short
    }
  }, [query, dispatch]);

  const handleCityInput = (e) => {
    setQuery(e.target.value);
    // setCity_name(e.target.value);
  };

  console.log({
    count: count,
    results: results,
  });

  return (
    <div className="frontpg-hero_searchbar">
      <Image
        src={SearchIcon}
        alt="search_icon"
        priority={true}
        className="search_icon"
      />
      <input
        type="text"
        placeholder="Search for your dream home"
        className="search_input"
        value={query}
        onChange={handleCityInput}
      />
      <button className="btn btn-primary-grad btnSearch">Search</button>
      {searchResults.length === 0 && query.length > 2 && (
        <Panel className="searchResults-list">
          <li>No results found</li>
        </Panel>
      )}
      {searchResults.length > 0 && (
        <Panel className="searchResults-list">
          {searchResults.map((result) => {

            let parameter = result.type === 'city' ? 
            `listings?page=1&loc=${result.id}` : 
            `listings?page=1&state=${result.id}`;

            return (
              <li
                key={result.id}
                onClick={() => {
                  setQuery(result.name);
                  // setCity_name(city.name);
                  setSearchResults([]);
                }}
              >
                <Link href={`${parameter}`}>{result.name}</Link>

                <span className="count">
                  {result.listings_count > 1
                    ? `${result.listings_count} listings`
                    : `${result.listings_count} listing`}
                </span>
              </li>
            );
          })}
        </Panel>
      )}
    </div>
  );
};
