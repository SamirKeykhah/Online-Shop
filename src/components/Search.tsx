export default function SearchComponent({
  onChange,
}: {
  onChange: (text: string) => void;
}) {
  return (
    <div className="flex items-center">
      <div className="flex space-x-1">
        <input
          type="text"
          className="block w-full px-4 py-2 bg-white border rounded-full focus:border-gray-200 focus:ring-gray-200 focus:outline-none focus:ring focus:ring-opacity-20"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder="Search..."
        />
      </div>
    </div>
  );
}
