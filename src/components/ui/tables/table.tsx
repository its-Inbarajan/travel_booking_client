import React from "react";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className="overflow-x-auto rounded-sm shadow-md">
      <table
        className={`min-w-full divide-y dark:divide-gray-600 divide-gray-200 dark:bg-gray-800 bg-white ${className}`}
      >
        {children}
      </table>
    </div>
  );
};

export default Table;
