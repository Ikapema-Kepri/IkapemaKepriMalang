"use client";

import AddMemberForm from '@/components/UI/AddMemberForm';
import ImageUploader from '@/components/UI/ImageUploader';
import MemberList from '@/components/UI/MemberList';
import ProtectedRoute from '@/components/UI/ProtectedRoute';
import AdminHeader from '@/components/UI/AdminHeader';

const AdminPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form di kiri, 1/3 layar */}
            <div className="w-full lg:w-1/3">
              <AddMemberForm />
              <ImageUploader />
            </div>
            {/* List member di kanan, 2/3 layar */}
            <div className="w-full lg:w-2/3">
              <MemberList />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;
