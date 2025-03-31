export const WorkExperience = () => {
    return (
        <section
            id="work-experience"
            className="absolute top-[1134px] left-0 w-full"
        >
            <h2 className="[font-family:'Preahvihear',Helvetica] font-normal text-white text-[40px] tracking-[0.80px] text-center mb-16">
                Work Experience
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1200px] mx-auto px-4">
                {workExperienceCards.map((card) => (
                    <Card
                        key={card.id}
                        className="w-full max-w-[570px] h-[193px] rounded-[15px] shadow-[4px_7px_26px_#0000001f] [background:linear-gradient(163deg,rgba(19,4,40,1)_7%,rgba(37,16,67,1)_34%,rgba(56,18,109,1)_57%,rgba(38,16,69,1)_85%,rgba(25,6,52,1)_100%)] relative overflow-hidden mx-auto"
                    >
                        <CardContent className="p-0">
                            <img
                                className="absolute w-full h-[172px] top-0 left-0"
                                alt="Background pattern"
                                src={card.maskSrc}
                            />
                            <div className="flex p-4">
                                <div className="relative w-[120px] h-[115px] mr-4">
                                    <img
                                        className="w-[110px] h-[110px] object-cover"
                                        alt="Project thumbnail"
                                        src={card.imageSrc}
                                    />
                                    <div className="absolute w-[111px] h-[42px] top-[66px] left-px rounded-[55.67px/21.04px] rotate-[176.86deg] [background:linear-gradient(180deg,rgba(44,18,80,1)_0%,rgba(44,18,80,1)_20%,rgba(44,18,80,0)_90%)]" />
                                    <div className="absolute w-[5px] h-1 top-[77px] left-1 bg-[#d9d9d9] rounded-[2.42px/2.21px]" />
                                    <div className="absolute w-[5px] h-1 top-[19px] left-[19px] bg-[#683a92] rounded-[2.42px/2.21px]" />
                                    <div className="absolute w-[5px] h-1 top-[100px] left-[93px] bg-[#683a92] rounded-[2.42px/2.21px]" />
                                    <div className="absolute w-[5px] h-1 top-[54px] left-[117px] bg-[#d9d9d9] rounded-[2.42px/2.21px]" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-white text-[26px] tracking-[0] leading-[32.5px]">
                                        {card.title}
                                    </h3>
                                    <p className="mt-2 [font-family:'Poppins',Helvetica] font-medium text-white text-[8px] tracking-[0] leading-[10.5px]">
                                        {card.description}
                                    </p>
                                    <Button className="mt-4 w-[119px] h-[33px] bg-[url(/rectangle-977.svg)] bg-[100%_100%] p-0">
                                        <span className="[font-family:'Poppins',Helvetica] font-medium text-white text-[10px] text-center tracking-[0] leading-[15px]">
                                            LEARN MORE
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
