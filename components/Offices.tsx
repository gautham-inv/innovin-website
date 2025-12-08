"use client";

const imgUnsplashPwPcYzyJTtY = "/images/198d18e8c0d56e97f39ca761d1da9e5d1d6e3db6.png";
const imgUnsplashGmtAa0Q5Mi = "/images/0f449b448809a2d5041d4342d86da17c4162fee0.png";
const imgUnsplashGZXx8LKAb7Y = "/images/708c364634fd47fda51f34d943e7a4fcf01b26fd.png";
const img = "/images/9454b043f49c13ff58150de23ad3177131cba25a.png";

// Placeholder office data
const offices = [
  {
    name: "Trivandrum",
    location: "Trivandrum, India",
    company: "InnoAI Technologies Pvt. Ltd.",
    cin: "U72900KL2023PTC078123",
    address: "Technopark Campus, Trivandrum, Kerala, India",
    image: imgUnsplashPwPcYzyJTtY,
    isActive: true,
  },
  {
    name: "Melbourne",
    location: "Melbourne, Australia",
    company: "Innovin Labs Australia",
    cin: "ACN 123 456 789",
    address: "123 Innovation Street, Melbourne, VIC 3000",
    image: imgUnsplashGmtAa0Q5Mi,
    isActive: false,
  },
  {
    name: "California",
    location: "San Francisco, California, USA",
    company: "Innovin Labs Inc.",
    cin: "EIN 12-3456789",
    address: "456 Tech Avenue, San Francisco, CA 94105",
    image: imgUnsplashGZXx8LKAb7Y,
    isActive: false,
  },
];

export default function Offices() {
  const activeOffice = offices.find(office => office.isActive) || offices[0];
  const otherOffices = offices.filter(office => !office.isActive);

  return (
    <section className="bg-white min-h-[995px] overflow-hidden relative py-20">
      <div className="max-w-[1681px] mx-auto px-5">
        <h2 className="text-[64px] text-black font-medium leading-[27.756px] tracking-[1.92px] mb-12 text-center">
          Our Offices
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex flex-col gap-[78px] items-center w-full lg:w-[878px]">
            <div className="flex gap-[10px] h-[51px] items-center justify-center w-full">
              <p className="text-[64px] text-black font-semibold leading-[27.8px] tracking-[0.64px]">
                {activeOffice.name}
              </p>
            </div>
            {otherOffices.map((office, index) => (
              <button
                key={index}
                className="flex gap-[20px] items-center justify-center w-full hover:opacity-80 transition"
              >
                <div className="bg-[rgba(0,0,0,0.5)] h-[50px] rounded-[2.361px] w-[66.738px] overflow-hidden relative">
                  <img alt={office.name} className="absolute inset-0 w-full h-full object-cover" src={office.image} />
                </div>
                <p className="text-[64px] text-zinc-200 font-semibold leading-[60px] tracking-[0.64px]">
                  {office.name}
                </p>
              </button>
            ))}
          </div>
          <div className="w-full lg:w-[622px] h-[608px] relative">
            <div className="absolute h-[608px] rounded-[22px] w-full">
              <img alt={activeOffice.location} className="absolute inset-0 w-full h-full object-cover rounded-[22px]" src={activeOffice.image} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[194px] bg-gradient-to-b from-transparent to-black backdrop-blur-[37.5px] rounded-b-[22px] p-[23px]">
              <p className="text-[40px] text-white font-semibold leading-[27.756px] tracking-[0.4px] mb-[34px]">
                {activeOffice.location}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col text-[#bdbdbd] text-[16px] leading-[27.756px] tracking-[0.16px]">
                  <p>{activeOffice.company}</p>
                  <p>CIN: {activeOffice.cin}</p>
                  <p>Address: {activeOffice.address}</p>
                </div>
                <div className="border border-[#bdbdbd] rounded-[20px] p-4 w-[62px] h-[62px] flex items-center justify-center cursor-pointer hover:bg-white/10 transition">
                  <div className="rotate-180 scale-y-[-100%]">
                    <img alt="Map icon" className="w-[30px] h-[30px]" src={img} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

