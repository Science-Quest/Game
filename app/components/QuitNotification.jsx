import { OctagonAlert } from "lucide-react";

export default function QuitNotification({ closeQuitNotification }) {
  return (
    <div
      style={{ top: window.scrollY }}
      className="absolute w-[100vw] h-full z-20 flex justify-center items-center"
    >
      <div className="z-20 flex flex-col gap-y-8 p-4 rounded-md w-[326px] bg-background">
        <div id="title" className="flex flex-row ">
          <OctagonAlert className="text-fail mr-4" />
          <p className="text-lg text-dark font-semibold">Perhatian !</p>
        </div>
        <div id="notif-content">
          <ul className="list-disc list-inside">
            <li>Progress level ini akan hilang</li>
            <li>Health akan tetap berkurang 1</li>
          </ul>
        </div>
        <div className="flex flex-row justify-between">
          <button
            className="bg-background text-dark border-2 rounded-lg w-[118px] h-[48px]"
            onClick={closeQuitNotification}
          >
            Batal
          </button>
          <button
            className="bg-fail text-light rounded-lg w-[118px] h-[48px]"
            onClick={() =>
              (window.location.href = import.meta.env.VITE_APP_URL)
            }
          >
            Keluar
          </button>
        </div>
      </div>
      <div
        id="overlay"
        className="z-10 absolute bg-black opacity-30 w-full h-full"
      ></div>
    </div>
  );
}
