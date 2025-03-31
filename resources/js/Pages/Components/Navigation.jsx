import React from "react";

const navLinks = [
    { title: "Home", href: "#home" },
    { title: "Work Experience", href: "#work-experience" },
    { title: "Skills", href: "#skills" },
    { title: "Projects", href: "#projects" },
    { title: "Contact", href: "#contact" },
];

export const Navigation = () => {
    const scrollToSection = (e) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute("href");
        if (!href) return;

        const element = document.querySelector(href);
        if (!element) return;

        // Smooth scroll with header offset
        const offset = 110;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    };

    return (
        <header className="fixed w-full h-[100px] top-0 left-0 bg-[#190b2d] shadow-[0px_6px_22px_-3px_#0000001a] flex items-center justify-between px-8 z-50">
            <div className="flex items-center">
                <img className="w-[35px] h-[43px]" alt="Logo" src="/logo.png" />
            </div>
            <nav className="flex space-x-16">
                {navLinks.map((link) => (
                    <a
                        key={link.title}
                        href={link.href}
                        onClick={scrollToSection}
                        className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-xl text-center tracking-[0.40px] text-white hover:text-[#7127ba] transition-colors"
                    >
                        {link.title}
                    </a>
                ))}
            </nav>
        </header>
    );
};
