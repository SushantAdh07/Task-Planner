import React from "react";
import { Card, CardContent } from "../ui/card";

const projectCards = [
    {
        id: 1,
        title: "Example Project",
        badge: "Featured Project",
        description:
            "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
        imageSrc: "/portfolio.png",
        isReversed: false,
    },
    {
        id: 2,
        title: "Example Project",
        badge: "Featured Project",
        description:
            "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
        imageSrc: "/portfolio-1.png",
        isReversed: true,
    },
];

export const Projects = (): JSX.Element => {
    return (
        <section id="projects" className="absolute top-[2762px] w-full">
            {projectCards.map((project) => (
                <div
                    key={project.id}
                    className={`flex ${
                        project.isReversed ? "flex-row-reverse" : "flex-row"
                    } items-start mb-24 max-w-[1200px] mx-auto px-4`}
                >
                    <div
                        className={`${
                            project.isReversed ? "mr-0 ml-8" : "ml-0 mr-8"
                        } flex flex-col ${
                            project.isReversed ? "items-end" : "items-start"
                        }`}
                    >
                        <div className="w-[287px] h-[70px]">
                            <div className="h-6 [font-family:'Poppins',Helvetica] font-semibold text-[#9757d3] text-base tracking-[0.32px]">
                                {project.badge}
                            </div>
                            <h3 className="h-[51px] [font-family:'Poppins',Helvetica] font-semibold text-[#ccd6f6] text-[34px] tracking-[0.68px]">
                                {project.title}
                            </h3>
                        </div>

                        <Card className="mt-8 bg-transparent w-[669px]">
                            <CardContent className="p-6">
                                <p className="[font-family:'Poppins',Helvetica] font-medium text-[#ccd6f6] text-lg">
                                    {project.description}
                                </p>
                            </CardContent>
                        </Card>

                        <div className="mt-4 flex space-x-4">
                            <a href="#" className="w-[31px] h-[31px]">
                                <img
                                    className="w-[31px] h-[31px]"
                                    alt="Icon park solid"
                                    src={
                                        project.isReversed
                                            ? "/icon-park-solid-click-5.svg"
                                            : "/icon-park-solid-click.svg"
                                    }
                                />
                            </a>
                            <a href="#" className="w-[31px] h-[31px]">
                                <img
                                    className="w-[31px] h-[31px]"
                                    alt="Icon park solid"
                                    src={
                                        project.isReversed
                                            ? "/icon-park-solid-click-4.svg"
                                            : "/icon-park-solid-click-3.svg"
                                    }
                                />
                            </a>
                        </div>
                    </div>

                    <img
                        className="w-[583px] h-[341px]"
                        alt="Project screenshot"
                        src={project.imageSrc}
                    />
                </div>
            ))}
        </section>
    );
};
