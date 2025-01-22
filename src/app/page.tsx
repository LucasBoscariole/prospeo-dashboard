/* eslint-disable @next/next/no-img-element */
import { Modal } from "@/components/Modal";

export default function Home() {
  return (
    <>
      <Modal open={true}>
        <img src="/images/modal_image.png" alt="modal_image" className="h-[100px] w-auto object-scale-down"/>
        <div>
          <h1 className="text-xl text-dark font-medium mb-1 text-center">Team is not available in the Free plan.</h1>
          <p className="text-grey-800 text-sm text-center">Upgrade now and invite your colleagues!</p>
        </div>
        <button className="main-button !h-[49px]">See our plans</button>
      </Modal>
    </>
  );
}
