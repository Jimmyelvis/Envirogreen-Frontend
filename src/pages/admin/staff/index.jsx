import React, { useEffect, useState } from 'react';
import { DashLayout } from '@/components/pages/dashboard/Layout';
import { SelectListGroup } from '@/components/ui/form/SelectListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { network } from '@/helpers/constants';
import { fetchAllStaff, fetchRoles } from '@/reduxstore/slices/staffSlice';
import { Staff_Card } from '@/components/pages/dashboard/Staff/Staff_Card';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import User_Icon from '@/components/assets/img/user-icon-green.svg';
import { squareLoader, fadingDotsLoader } from '@/components/ui/Loaders';

const Staff = () => {
  const dispatch = useDispatch();
  const { staff, count } = useSelector((state) => state.staff.staff);
  // const { roles } = useSelector((state) => state.staff.roles);
  const roles = useSelector((state) => state.staff.roles?.roles || []);

  const [rolesOptions, setRolesOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState('All'); // Default to 'All'

  const [staffMembers, setStaffMembers] = useState([]);
  const [filteredName, setFilteredName] = useState(null);

  useEffect(() => {
    dispatch(fetchAllStaff());
    dispatch(fetchRoles());
  }, []);

  useEffect(() => {
    if (staff) {
      setStaffMembers(staff);
    }

    if (roles.length > 0) {
      const roleOptions = roles.map((role) => ({
        label: role.name,
        value: role.name, // Use role.name if you're filtering by role name
      }));

      // Add the 'All' option at the beginning
      setRolesOptions([{ label: 'All', value: 'All' }, ...roleOptions]);
    }
  }, [staff, roles]);

  const getStaffMembers = () => {
    if (!staffMembers.length) {
      return <div className="loading">{fadingDotsLoader()}</div>;
    } else {
      return staffMembers
        .filter((member) => {
          if (selectedRole  === 'All') {
            return member;
          } else {
            return member.role_name === selectedRole ;
          }
        })
        .filter((member) => {
          if (filteredName) {
            return member.name
              .toLowerCase()
              .includes(filteredName.toLowerCase());
          } else {
            return member;
          }
        })
        .map((member) => <Staff_Card key={member.id} staff={member} />);
    }
  };

  return (
    <DashLayout>
      <div className="admin_staff ">
        <div className="top">
          <div className="top_heading">
            <h1 className="heading-1 heading-staff">Staff</h1>
            <p className="subheading">Manage your staff members</p>
          </div>

          <div className="top_actions">
            <SelectListGroup
              options={rolesOptions}
              onChange={(e) => {
                setSelectedRole(e.target.value);
              }}
              name="roles"
              value={selectedRole}
              extraClasses={'roles-select'}
              icon={User_Icon}
            />
          </div>

          <div className="filter-names">
            <TextFieldGroup
              placeholder="Filter by name"
              name="filter"
              classes={'filter-names-input'}
              value={filteredName}
              onChange={(e) => setFilteredName(e.target.value)}
            />
          </div>
        </div>

        <div className="adminPg-staff-members">
          {getStaffMembers()}
        </div>
      </div>
    </DashLayout>
  );
};

export default Staff;
