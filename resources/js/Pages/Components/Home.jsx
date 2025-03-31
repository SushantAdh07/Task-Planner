import React from "react";
import Hero from "./portfolio/hero";
import { WorkExperience } from "./Portfolio/Experience";
import Skills from "./Portfolio/Skills";

function Portfolio() {
    return (
        <main className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white overflow-hidden w-full max-w-[1980px] relative">
                {/* Background image and gradients */}
                <div className="relative w-full">
                    <img
                        className="w-full h-[4298px] object-cover"
                        alt="Background"
                        src="images/background.png"
                    />

                    {/* Purple gradient overlays */}
                    <div className="w-[642px] h-[720px] top-[2580px] left-[858px] rounded-[321px/360px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(118,60,172,1)_0%,rgba(50,15,133,0)_100%)]" />
                    <div className="w-[625px] h-[700px] top-[1022px] left-[739px] rounded-[312.5px/350px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(118,60,172,1)_0%,rgba(50,15,133,0)_100%)]" />
                    <div className="w-[625px] h-[700px] top-[2571px] left-[1084px] rounded-[312.5px/350px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(118,60,172,1)_0%,rgba(50,15,133,0)_100%)]" />
                    <div className="w-[572px] h-[641px] top-[3166px] left-[274px] rounded-[286px/320.5px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(118,60,172,1)_0%,rgba(50,15,133,0)_100%)]" />
                    <div className="w-[385px] h-[431px] top-[220px] left-[385px] rounded-[192.5px/215.5px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(118,60,172,1)_0%,rgba(50,15,133,0)_100%)]" />
                    <Hero />
                    <WorkExperience />
                    <Skills />
                </div>
            </div>
        </main>
    );
}

export default Portfolio;
