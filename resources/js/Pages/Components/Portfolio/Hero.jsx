import React from "react";

function Hero() {
    return (
        <section id="home" className="absolute top-[220px] left-0 w-full px-4">
            <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center gap-8">
                {/* Profile Image */}
                <div className="relative w-[258px] h-[259px] rounded-[129px/129.5px]">
                    <img
                        className="absolute w-[165px] h-[223px] top-1.5 left-12 object-cover"
                        alt="Profile Image"
                        src="images/image-1.png"
                    />
                </div>

                {/* Hero Text */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="[font-family:'Preahvihear',Helvetica] font-normal text-white text-[19px] text-center">
                            Hello! I Am{" "}
                        </span>
                        <span className="[font-family:'Preahvihear',Helvetica] font-normal text-[#7127ba] text-[19px] text-center">
                            Ibrahim Memon
                        </span>
                    </div>

                    <div className="mt-8 relative">
                        <div className="[font-family:'Preahvihear',Helvetica] font-normal text-white text-[17px] text-center tracking-[0.34px] underline">
                            A Designer who
                        </div>
                        <div className="mt-2 [font-family:'Preahvihear',Helvetica] font-normal text-[50px] tracking-[0.50px] leading-[35.1px]">
                            <span className="text-white">
                                Judges a book
                                <br />
                                by its{" "}
                            </span>
                            <span className="text-[#7127ba]">cover</span>
                            <span className="text-white">...</span>
                        </div>
                        <div className="absolute w-[189px] h-[58px] top-[92px] left-[150px] rounded-[94.29px/28.95px] border border-solid border-white rotate-[-4.74deg]" />
                        <div className="mt-4 [font-family:'Preahvihear',Helvetica] font-normal text-white text-[11px] text-center tracking-[0.22px]">
                            Because if the cover does not impress you what else
                            can?
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
