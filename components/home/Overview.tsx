import Image from "next/image";

const Overview = () => (
  <div className="flex items-center mt-6">
    <div className="flex-1">
      <h2 className="text-4xl font-bold">Nguyễn Văn Hải</h2>
      <p className="mt-1">
        Digital Craftsman ( Artist / Developer / Designer )
      </p>
    </div>
    <Image
      className="rounded-full border-2 border-white"
      src={"/images/takuya.jpg"}
      alt="..."
      width={100}
      height={100}
    />
  </div>
);

export default Overview;
