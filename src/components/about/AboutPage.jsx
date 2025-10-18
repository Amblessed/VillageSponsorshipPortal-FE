import React from "react";
import PropTypes from 'prop-types';

const navLinks = [
    { href: "/about", label: "English" },
    { href: "/about/de", label: "Deutsch" },
    { href: "/about/ig", label: "Igbo" },
    { href: "/", label: "Home" },
];

const missionItems = [
    { title: "Quality Education", text: "Teaching reading, math, and critical skills." },
    { title: "Values Formation", text: "Cultivating courage, respect, and kindness." },
    { title: "Compassionate Care", text: "Surrounding each child with love and dignity." },
];

const helpItems = [
    "Creates safe classrooms where children can learn without fear.",
    "Equips teachers to inspire and guide with excellence.",
    "Offers meals, care, and encouragement that fuel young lives.",
    "Breaks cycles of poverty by opening doors to opportunity.",
];

const actionLinks = [
    { href: "/sponsor", label: "Sponsor a Child", color: "bg-green-600 hover:bg-green-700" },
    { href: "/donate", label: "Give a Gift", color: "bg-blue-600 hover:bg-blue-700" },
    { href: "/learn-more", label: "Learn More", color: "bg-gray-600 hover:bg-gray-700" },
];

const AboutPage = () => {
    return (
        <div className="bg-white min-h-screen px-6 py-12 text-center">
            {/* Navigation */}
            <nav className="mt-6 space-x-4">
                {navLinks.map((link) => (
                    <a key={link.href} href={link.href} className="text-blue-800 hover:underline">
                        {link.label}
                    </a>
                ))}
            </nav>

            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">About Our School</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
                In the heart of our village, hope has a home. Our school is more than classrooms—it is a
                sanctuary where children discover dignity, purpose, and the possibility of a brighter future.
            </p>

            {/* Content */}
            <div className="max-w-4xl mx-auto space-y-8 text-left">
                <Section
                    title="🌱 Our Story"
                    paragraphs={[
                        "What began under the shade of a mango tree—with one teacher and a handful of eager children—has grown into a thriving center of learning. Local families and international supporters came together to build classrooms, train teachers, and create a safe place where children can dream beyond survival.",
                        "Every book opened, every lesson taught, and every smile shared is part of that unfolding story of hope.",
                    ]}
                />

                <Section title="🎓 Our Mission">
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {missionItems.map((item) => (
                            <li key={item.title}>
                                <strong>{item.title}</strong> – {item.text}
                            </li>
                        ))}
                    </ul>
                    <p className="text-gray-700 mt-2">
                        Education here is more than knowledge—it is a seed of hope, planted in young lives and
                        destined to change entire communities.
                    </p>
                </Section>

                <Section
                    title="🤝 A Circle of Care"
                    paragraphs={[
                        "Behind every student is a community of parents, teachers, and sponsors working together. Many families face significant challenges, but their resilience is met with support that spans continents.",
                        "Through sponsorship, children gain not just education but the assurance that someone believes in them. For donors, it is an invitation to witness transformation firsthand and take part in writing new stories of possibility.",
                    ]}
                />

                <Section
                    title="🙏 Our Guiding Scripture"
                    paragraphs={[
                        "“Speak up for those who cannot speak for themselves… defend the rights of the poor and needy.” — Proverbs 31:8–9",
                        "This verse anchors our work. We believe education is a sacred calling—an act of advocacy and love. Every child’s story deserves to be heard, honored, and uplifted.",
                    ]}
                    italicFirst
                />

                <Section title="✨ How You Can Help">
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {helpItems.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                    <p className="text-gray-700 mt-2">
                        Every gift changes a story. Every sponsorship lights a path. Together, we can raise a
                        generation of leaders who will transform their families, communities, and beyond.
                    </p>
                </Section>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 space-x-4">
                {actionLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className={`inline-block px-6 py-2 text-white rounded ${link.color}`}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

const Section = ({ title, paragraphs = [], children, italicFirst = false }) => (
    <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        {paragraphs.map((text, i) => (
            <p
                key={i}
                className={`text-gray-700 ${i === 0 && italicFirst ? "italic" : ""} ${
                    i > 0 ? "mt-2" : ""
                }`}
            >
                {text}
            </p>
        ))}
        {children}
    </section>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node,
    italicFirst: PropTypes.bool
};

export default AboutPage;
