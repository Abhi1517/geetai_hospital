function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 rounded bg-slate-100 disabled:opacity-50"
      >
        Previous
      </button>
      <div className="text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 rounded bg-slate-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
