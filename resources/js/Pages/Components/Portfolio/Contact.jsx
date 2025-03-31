import React from "react";

const Contact = () => {
    return (
        <section
            id="contact"
            className="absolute top-[4004px] left-0 w-full flex justify-center"
        >
            <div className="text-center">
                <h2 className="[font-family:'Poppins',Helvetica] font-normal text-white text-[25px] tracking-[0.50px]">
                    Contact
                </h2>

                <div className="mt-12 [font-family:'Poppins',Helvetica] font-normal text-white text-[15px] tracking-[0.30px]">
                    I&#39;m currently looking to join a cross-functional team
                    that values improving people&#39;s lives
                    <br />
                    through accessible design. or have a project in mind?
                    Let&#39;s connect.
                    <br />
                    <br />
                    <a
                        href="mailto:ibrhaimmemon930@gmail.com"
                        className="hover:text-[#7127ba] transition-colors"
                    >
                        ibrhaimmemon930@gmail.com
                    </a>
                </div>

                <div className="mt-12">
                    <img
                        className="w-[110px] h-[18px] mx-auto"
                        alt="Social icons"
                        src="images/social-icons.png"
                    />
                </div>
            </div>
        </section>
    );
};

export default Contact;
