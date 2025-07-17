import AddMemberForm from '@/components/UI/AddMemberForm';
import ImageUploader from '@/components/UI/ImageUploader';
import MemberList from '@/components/UI/MemberList';


const addMemberPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <main className="max-w-7xl mx-auto px-">
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
  );
};

export default addMemberPage;
