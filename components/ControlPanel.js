// import React, { useCallback } from "react";

// const ControlPanel = ({ categories, onCategoryChange }) => {
//   const handleCategoryChange = useCallback(
//     (e) => {
//       onCategoryChange(e.target.value || null);
//     },
//     [onCategoryChange]
//   );

//   return <div className="control-panel marker-clustering-control-panel"></div>;
// };

// export default ControlPanel;

import React, { useCallback, useState } from "react";

const ControlPanel = ({ categories, onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = useCallback(
    (e) => {
      const value = e?.target?.value; // Ensure e.target exists
      setSelectedCategory(value || null);
      onCategoryChange(value || null);
    },
    [onCategoryChange]
  );

  return (
    <div className="w-full max-w-xs mt-2 mx-auto">
      <div className="relative">
        <select
          id="category"
          className="block w-full border border-gray-300 bg-slate-900 text-white rounded-md p-2"
          onChange={handleCategoryChange}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.key} value={category.key}>
              {`${category.label} (${category.count})`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ControlPanel;
