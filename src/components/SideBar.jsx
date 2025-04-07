export default function SideBar({
  categories,
  selectedCategory,
  handleSelectCategory,
}) {
  return (
    <div className="rounded-xl h-[97%] my-auto bg-slate-300 shadow-2xl">
      <ul className="space-y-1 p-4">
        <li className="text-2xl font-bold text-center text-black py-4">Categories</li>

        {!categories.length 
        ? (<li className="text-gray-500 text-center py-2 animate-pulse">No categories available</li>)
        : (<>
            <li
              className={`text-gray-700 p-3 rounded-lg transition-colors duration-200 cursor-pointer ${!selectedCategory ? "bg-slate-700 text-white shadow-2xl" : "hover:bg-slate-200"}`}
              onClick={() => handleSelectCategory('')}
            >
              All Categories
            </li>

            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`text-gray-700 p-3 rounded-lg transition-all duration-200 cursor-pointer ${selectedCategory === cat.id ? "bg-slate-700 text-white shadow-2xl" : " hover:bg-slate-200"}`}
                onClick={() => handleSelectCategory(cat.id)}
              >
                {cat.name}
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
