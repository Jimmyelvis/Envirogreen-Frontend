import { Avatar } from '@/components/ui/avatar';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import Image from 'next/image';
import { formatPrice, formatPhoneNumber } from '@/utils/formatInfo';
// Icons ------
import FaceebookIcon from '@/components/assets/img/facebook-icon.svg';
import TwitterIcon from '@/components/assets/img/twitter-icon.svg';
import EmailIcon from '@/components/assets/img/email-icon.svg';
import PhoneIcon from '@/components/assets/img/phone-icon.svg';

export const AgentCard = ({
  singleListing,
}) => {
  return (
    <div className="agent">
                <Avatar avatar={singleListing.user_photo_path} classes="avatar" />
    
                <Sectionheading_left_bar
                  heading={singleListing.user?.name}
                  subheading={singleListing.user_role}
                />
    
                <ul className="agent_socials">
                  {singleListing.user?.facebook && (
                    <li>
                      <Image
                        src={FaceebookIcon}
                        alt="Facebook icon"
                        width={500}
                        height={500}
                        layout="responsive"
                      />
    
                      <p>{singleListing.user?.facebook}</p>
                    </li>
                  )}
    
                  {singleListing.user?.twitter && (
                    <li>
                      <Image
                        src={TwitterIcon}
                        alt="Twitter icon"
                        width={500}
                        height={500}
                        layout="responsive"
                      />
    
                      <p>{singleListing.user?.twitter}</p>
                    </li>
                  )}
    
                  {singleListing.user?.email && (
                    <li>
                      <Image
                        src={EmailIcon}
                        alt="Email icon"
                        width={500}
                        height={500}
                        layout="responsive"
                      />
    
                      <p>{singleListing.user?.email}</p>
                    </li>
                  )}
    
                  {singleListing.user?.phone && (
                    <li>
                      <Image
                        src={PhoneIcon}
                        alt="Phone icon"
                        width={500}
                        height={500}
                        layout="responsive"
                      />
    
                      <p>{formatPhoneNumber(singleListing.user?.phone)}</p>
                    </li>
                  )}
                </ul>
              </div>

    // <>
    //   card
    // </>
  )
}
