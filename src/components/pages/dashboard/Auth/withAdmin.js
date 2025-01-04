import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { selectIsAuthenticated, selectCurrentUser } from '@/reduxstore/slices/userSlice';

// Helper function to get the display name of the wrapped component
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withAdmin = (WrappedComponent) => {


  const allowedRoles = [
    "Admin",
    "SuperAdmin",
    "Sales",
    "Agent",
    "Founder"
  ]

  const WithAdmin = (props) => {

    /*
      Check to see if if the component has mounted on the client.
      Before the component mounts (hasMounted is false), we render null.
    */
    const [hasMounted, setHasMounted] = useState(false);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentUser = useSelector(selectCurrentUser);
    const router = useRouter();

    /*
      Set this to true after this component has mounted
    */
    useEffect(() => {
      setHasMounted(true);
    }, []);

    useEffect(() => {

      /*
        Only use Redux-tool kit to check for auth status after 
        setHasMounted(true) to prevent Hydration errors
      */
      if(hasMounted) {

        if (!isAuthenticated) {
          router.push('/');
        } 
        
        if (!allowedRoles.includes(currentUser?.role?.name)) {
          router.push('/');
        }
    
      }
      

    }, [isAuthenticated, currentUser, router, hasMounted]);

    if (!hasMounted) {
      return <div>Loading...</div>;
    }
    

    // if (!isAuthenticated || currentUser?.role?.name !== 'Admin') {
    //   return null; // Prevent rendering the component if not authorized
    // }

    if (!isAuthenticated || !allowedRoles.includes(currentUser?.role?.name)) {
      router.push('/');
    }
    


    return <WrappedComponent {...props} />;
  };

  // Set the display name for debugging purposes
  WithAdmin.displayName = `withAdmin(${getDisplayName(WrappedComponent)})`;

  return WithAdmin;
};

export default withAdmin;
