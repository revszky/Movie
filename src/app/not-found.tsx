import { IconAlertTriangleFilled, IconDoorEnter } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <IconAlertTriangleFilled className="w-16 h-16 lg:w-28 lg:h-28 text-white" />

        <h1 className="text-center text-lg lg:text-4xl text-white">Oops</h1>

        <div className="p-2">
          <p className="text-center text-sm lg:text-xl text-white">
            Don't look for something that doesn't exist.
          </p>

          <p className="text-center text-sm lg:text-xl text-white">
            Please just come back!!!
          </p>
        </div>

        <Link
          href="/"
          className="text-gray-500 hover:duration-500 hover:text-white p-4"
        >
          <IconDoorEnter className="w-8 h-8 lg:w-12 lg:h-12" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
