import Image from "next/image";
import React from "react";

export const TopBar: React.FC = () => {
  return (
    <header className="bg-white border-b border-sidebar-border flex items-center justify-between px-6 h-[88px] sticky top-0 left-0 w-full z-20">
      <div className="relative">
        <label
          htmlFor="search"
          className="absolute left-4 top-1/2 -translate-y-1/2"
        >
          <Image
            width={16}
            height={16}
            className="object-scale-down w-4 h-4"
            src="/images/icons/search.svg"
            alt="search"
          />
        </label>
        <input
          name="search"
          id="search"
          type="text"
          placeholder="Search people or companies"
          className="w-[520px] h-10 border border-sidebar-border rounded-lg focus:outline-none focus:border-black placeholder:text-grey-600 text-black pl-12 pr-4"
        />
      </div>
      <div className="flex items-center gap-5">
        <button className="bg-red-light-100 h-10 rounded-lg flex items-center justify-center px-4 text-red-default text-sm gap-2 font-medium">
          <Image
            src={"/images/icons/cube.svg"}
            alt="cube"
            width={14}
            height={14}
          />
          <span>Upgrade</span>
        </button>
        <div className="h-4 w-[1px] bg-grey-600"></div>
        <Image width={24} height={24} src='/images/icons/info.svg' alt="info"/>
        <Image width={24} height={24} src='/images/icons/integration.svg' alt="integration"/>
        <Image width={24} height={24} src='/images/icons/wallet.svg' alt="wallet"/>
        <div className="w-10 h-10 rounded-full bg-red-light-100 flex items-center justify-center text-sm font-medium text-red-default">
          HF
        </div>
      </div>
    </header>
  );
};
