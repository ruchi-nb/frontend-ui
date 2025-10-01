import { useState } from "react";

const AddressInformation = ({ isEditing }) => {
  const [street, setStreet] = useState("123 Main St");
  const [city, setCity] = useState("San Francisco");
  const [state, setState] = useState("CA");
  const [zip, setZip] = useState("94105");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Address Information</h2>
      <div className="space-y-4">
        {/* Street */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
          <input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            type="text"
          />
        </div>

        {/* City / State / Zip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            type="text"
          />
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            type="text"
          />
          <input
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="ZIP Code"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressInformation;
