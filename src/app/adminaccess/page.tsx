"use client";

import AddMemberForm from '@/components/UI/add-member-form';
import ImageUploader from '@/components/UI/image-uploader';
import MemberList from '@/components/UI/member-list';
import ProtectedRoute from '@/components/UI/protected-route';

const DashboardPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form di kiri, 1/3 layar */}
        <div className="w-full lg:w-1/3 space-y-6">
          <AddMemberForm />
          <ImageUploader />
        </div>
        {/* List member di kanan, 2/3 layar */}
        <div className="w-full lg:w-2/3">
          <MemberList />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
