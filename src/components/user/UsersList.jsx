import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCheck, UserX } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { user_active_status_action } from '@/features/userActions';
import { user_active_status } from '@/redux/userSlice';

const UserList = () => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleUserStatus =  async (userId) => {
    await user_active_status_action(userId);
    dispatch(user_active_status(userId));
  };



  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="grid gap-4">
        {users?.filter(user => !user.is_staff).map(user => (
          <Card key={user.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {user.profile_url ? (
                    <img 
                      src={user.profile_url} 
                      alt={user.full_name || 'User profile'} 
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="40">${user.full_name?.charAt(0) || user.email.charAt(0)}</text></svg>`;
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl text-gray-500">
                        {user.full_name?.charAt(0) || user.email.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">
                    {user.full_name || 'No name provided'}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>

                <Button
                  onClick={() => toggleUserStatus(user.id)}
                  variant={user.is_active ? "destructive" : "default"}
                  className="flex items-center gap-2"
                >
                  {user.is_active ? (
                    <>
                      <UserX className="w-4 h-4" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      Activate
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserList;