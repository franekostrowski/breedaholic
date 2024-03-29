import {
  CheckIcon,
  InformationCircleIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import SEO from "common/components/SEO";
import useFetch from "common/hooks/useFetch";
import DefaultLayout from "common/layouts/Default";
import { selectBreeds } from "common/redux/breeds";
import { BREED_IMAGE_URL } from "common/utils/api";
import getBreedGroupEmoji from "common/utils/getBreedGroupEmoji";
import FeatureCard from "modules/Breed/FeatureCard";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Breed: NextPage = () => {
  const [isSeeMore, setIsSeeMore] = useState<boolean>(false);
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  const breeds = useSelector(selectBreeds());

  // @ts-ignore
  const breed = breeds.find((breed) => breed.id === parseInt(id));

  // @ts-ignore
  const { data, isLoading } = useFetch(`/api/breed/${breed.name}`);

  const handleSeeMore = () => {
    setIsSeeMore(!isSeeMore);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(async () => {
      setIsLinkCopied(true);
      // For styling purpose
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLinkCopied(false);
    });
  };

  if (!breed) return <></>;

  return (
    <>
      <SEO
        title={breed.name}
        description={`Learn characteristics and facts about ${breed.name}`}
      />

      <DefaultLayout>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Div is for styling purpose */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BREED_IMAGE_URL}/${breed.reference_image_id}.jpg`}
              alt={breed.name}
              className="rounded-lg"
            />
          </div>
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl lg:mb-2">
                  {breed.name}
                </h1>
                {typeof breed.breed_group !== "undefined" && (
                  <p className="inline-flex gap-2 font-semibold text-gray-600 md:text-lg">
                    <span>{getBreedGroupEmoji(breed.breed_group)}</span>
                    <span>{breed.breed_group} dog</span>
                  </p>
                )}{" "}
              </div>
              <button
                className={`rounded-full p-2 focus-visible:bg-gray-50 ${
                  isLinkCopied
                    ? "bg-green-50 text-green-700 focus-visible:bg-green-50"
                    : ""
                }`}
                title="Copy url to clipboard"
                onClick={handleCopyLink}
              >
                {isLinkCopied ? (
                  <CheckIcon className="h-6 w-6 rounded-full stroke-2 motion-safe:animate-pulse" />
                ) : (
                  <LinkIcon className="h-6 w-6 stroke-2" />
                )}
              </button>
            </div>
            <FeatureCard title="Temperament" content={breed.temperament} />
            <FeatureCard title="Bred for" content={breed.bred_for} />
            <FeatureCard
              title="Origin"
              content={
                isLoading ? (
                  <span className="motion-safe:animate-pulse">Loading</span>
                ) : (
                  data?.breedOrigin
                )
              }
            />
            <FeatureCard title="Average life span" content={breed.life_span} />
            <FeatureCard title="Weight" content={`${breed.weight.metric} kg`} />
            <FeatureCard title="Size" content={`${breed.height.metric} cm`} />
            <FeatureCard
              title="Description"
              content={
                isLoading ? (
                  <span className="motion-safe:animate-pulse">Loading</span>
                ) : (
                  <>
                    {typeof data?.breedDescription !== "undefined" && (
                      <>
                        {data?.breedDescription.split(" ").length <= 28 ? (
                          <p>{data?.breedDescription}</p>
                        ) : (
                          <>
                            {data?.breedDescription
                              .split(" ")
                              .slice(0, 28)
                              .join(" ")}
                            {!isSeeMore ? "..." : ""}
                            <span
                              className={`mt-4 ${!isSeeMore ? "hidden" : ""}`}
                            >
                              {" "}
                              {data?.breedDescription
                                .split(" ")
                                .slice(28)
                                .join(" ")}
                            </span>{" "}
                            {/* @todo add text variant to button component  */}
                            <button
                              className="rounded-lg bg-transparent text-gray-400 focus-visible:ring-2 focus-visible:ring-offset-2"
                              onClick={handleSeeMore}
                            >
                              {!isSeeMore ? "show more" : "show less"}
                            </button>
                          </>
                        )}
                        <p className="mt-4 leading-none">
                          <strong className="text-sm">
                            <span className="mr-1 inline-block rounded-full bg-gray-200 px-2.5 py-0.5 text-xs uppercase text-gray-600">
                              Note
                            </span>
                            This data is fetched from wikipedia. It may contain
                            unverified or incomplete information.
                          </strong>
                        </p>
                      </>
                    )}

                    {typeof data?.breedDescription === "undefined" && (
                      <p>Unknown</p>
                    )}
                  </>
                )
              }
            />
            <a
              className="mt-4 flex items-center gap-2"
              href={data?.breedWikiUrl}
              target="blank"
            >
              <InformationCircleIcon className="h-5 w-5" />
              Click here for more information
            </a>
          </section>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Breed;
