// Layout.js
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {children}
      </div>
    </div>
  );
}