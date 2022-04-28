import { Disclosure, Popover } from "@headlessui/react";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React from "react";

import Category from "./Filters/Category";
import Size from "./Filters/Size";

const filters = [
  {
    title: "Category",
    component: <Category />,
  },
  {
    title: "Size",
    component: <Size />,
  },
];

const Filter: React.FC = () => {
  return (
    <Popover>
      <Popover.Button
        aria-label="Filter breeds"
        data-cy="breeds-filter-dialog-open"
        className="rounded-lg p-2"
      >
        <AdjustmentsIcon className="h-6 w-6" />
      </Popover.Button>
      <Popover.Panel className="absolute inset-x-6 z-[100] mt-6 rounded-lg bg-gray-50 px-6 py-4 lg:inset-x-28">
        <>
          {filters.map((filter, id) => (
            <div key={filter.title}>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-xl">
                      <span className="text-xl font-semibold">
                        {filter.title}
                      </span>
                      {open ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      )}
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-4">
                      {filter.component}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              {id !== filters.length - 1 && (
                <hr className="my-4 rounded-full" />
              )}
            </div>
          ))}
        </>
      </Popover.Panel>
    </Popover>
  );
};

export default Filter;
