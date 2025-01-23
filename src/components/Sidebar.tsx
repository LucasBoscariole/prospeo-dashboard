/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Image from "next/image";
import React from "react";

const sidebarLinks = {
  search: [
    { label: "People", icon: "people", href: "#" },
    { label: "Companies", icon: "companies", href: "#" },
    { label: "Lists", icon: "lists", href: "#" },
  ],
  enrich: [
    { label: "CSV Enrichment", icon: "csv", href: "#" },
    { label: "CRM Enrichment", icon: "crm", href: "#" },
    { label: "API", icon: "api", href: "#" },
  ],
  linkedin: [
    { label: "Extension", icon: "extension", href: "#" },
    { label: "Sales Navigator", icon: "sales", href: "#" },
  ],
};

export const Sidebar: React.FC = () => {
  return (
    <>
      <div className="w-[230px] shrink-0"></div>
      <aside className="w-[230px] h-screen box-border bg-white border-r border-sidebar-border p-6 flex flex-col fixed top-0 left-0 z-20">
        <button className="w-6 h-6 rounded-full border border-sidebar-border flex items-center justify-center absolute top-8 right-4">
          <Image
            width={10}
            height={10}
            src="/images/icons/expand.svg"
            alt="expand"
            className="object-scale-down"
          />
        </button>
        <div className="mb-12">
          <img src="/images/logo.png" alt="logo" className="h-7 w-auto" />
        </div>
        <nav className="flex flex-col gap-6">
          {Object.entries(sidebarLinks).map(([section, links]) => (
            <div key={section}>
              <h2 className="text-xs font-medium px-3 text-grey-700 capitalize mb-3">
                {section}
              </h2>
              <div className="flex flex-col gap-1">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={clsx(
                      "group flex items-center px-3 hover:bg-red-light-100 duration-200 h-[38px] gap-2 hover:text-red-default text-sm font-medium rounded-lg",
                      link?.label === "People"
                        ? "bg-red-light-100 text-red-default"
                        : "bg-white"
                    )}
                  >
                    <img
                      src={`/images/icons/${link.icon}.svg`}
                      alt={link.label}
                      className="w-4 h-4 object-scale-down transition duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(27%)_sepia(88%)_saturate(7491%)_hue-rotate(357deg)_brightness(91%)_contrast(108%)]"
                    />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="mt-auto">
          <button className="w-full h-11 font-medium bg-red-light-100 border rounded-lg flex items-center justify-center gap-2 text-sm text-red-default border-red-default border-opacity-40">
            <img
              src={`/images/icons/google.svg`}
              alt={"google"}
              className="w-5 h-5 object-scale-down"
            />
            <span>Install Extension</span>
          </button>
        </div>
      </aside>
    </>
  );
};
