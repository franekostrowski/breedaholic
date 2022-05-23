import { Disclosure, Popover } from "@headlessui/react";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { selectAreBreedsFiltered } from "common/redux/breeds";
import React from "react";
import { useSelector } from "react-redux";

import Category from "./Filters/Category";
// @ts-ignore
import ClearFiltersButton from "./Filters/ClearFiltersButton";
import LifeSpan from "./Filters/LifeSpan";
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
  {
    title: "Life span",
    component: <LifeSpan />,
  },
];

const Filter: React.FC = () => {
  const areBreedsFiltered = useSelector(selectAreBreedsFiltered());

  return (
    <Popover>
      <Popover.Button
        aria-label="Filter breeds"
        data-cy="breeds-filter-popover-toggle"
        className="rounded-lg bg-white p-2"
      >
        <AdjustmentsIcon className="h-6 w-6" />
      </Popover.Button>
      <Popover.Panel className="absolute inset-x-6 z-[100] mt-6 rounded-lg bg-gray-50 p-6 lg:inset-x-28">
        <>
          {filters.map((filter, id) => (
            <div key={filter.title}>
              <Disclosure defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-xl focus-visible:text-gray-400">
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
        {areBreedsFiltered && (
          <ClearFiltersButton customClasses="md:hidden text-base mt-6 float-right" />
        )}
      </Popover.Panel>
    </Popover>
  );
};

export default Filter;
