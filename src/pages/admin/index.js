import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withAdmin from "@/components/pages/dashboard/Auth/withAdmin"
import { DashLayout } from '@/components/pages/dashboard/Layout';
import { CitiesListings } from '@/components/pages/dashboard/Home_widgets/info_badge/CitiesListings';
import { Blogs_Badge } from '@/components/pages/dashboard/Home_widgets/info_badge/Blogs';
import { States_badge } from '@/components/pages/dashboard/Home_widgets/info_badge/States_badge';
import { Staff_badge } from '@/components/pages/dashboard/Home_widgets/info_badge/Staff_badge';
import { Listings_badge } from '@/components/pages/dashboard/Home_widgets/info_badge/Listings_badge';
import { Cities_most_listings } from '@/components/pages/dashboard/Home_widgets/info_panels/Cities_most_listings';
import { Latest_listings } from '@/components/pages/dashboard/Home_widgets/info_panels/Latest_listings';
import { Latest_Blog_Posts } from '@/components/pages/dashboard/Home_widgets/info_panels/Latest_Blog_Posts';
import { Most_Expensive } from '@/components/pages/dashboard/Home_widgets/info_panels/Most_Expensive';



const AdminIndex = () => {
    return (
        <DashLayout>
            
            <div className="admin-home">

                <div className="info-badges">
                    <CitiesListings />
                    <Blogs_Badge />
                    <States_badge />
                    <Staff_badge />
                    <Listings_badge />
                </div>

                <div className="info-panels">
                    <Cities_most_listings
                      classname="city-most-listings"
                    />

                    <Latest_listings
                        classname="latest-listings"
                    />

                    <Latest_Blog_Posts
                        classname="latest-blog-posts"
                    />

                    <Most_Expensive
                        classname="most-expensive"
                    />
                </div>

            </div>
            
        </DashLayout>
    )
}


export default withAdmin(AdminIndex);