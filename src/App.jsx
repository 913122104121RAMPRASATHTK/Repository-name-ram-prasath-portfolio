import { useState, useEffect } from "react";
import {
    CodeAlt,
    Globe,
    Mobile,
    Linkedin,
    Github,
    Envelope
} from "@boxicons/react";
import profileImage from "./images/profile.JPG";

function Portfolio() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [downloadMessage, setDownloadMessage] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(false);

    const [jobTitle, setJobTitle] = useState("");
    const [titleIndex, setTitleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const [aboutVisible, setAboutVisible] = useState(false);
    const [skillsVisible, setSkillsVisible] = useState(false);
    const [projectsVisible, setProjectsVisible] = useState(false);
    const [experienceVisible, setExperienceVisible] = useState(false);
    const [contactVisible, setContactVisible] = useState(false);

    const jobTitles = [
        "Software Engineer",
        "Full Stack Developer"
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setFormErrors({
            ...formErrors,
            [name]: ""
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Please enter your name";
        }
        if (!formData.email.trim()) {
            errors.email = "Please enter your email";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            errors.email = "Please enter a valid email";
        }
        if (!formData.phone.trim()) {
            errors.phone = "Please enter your phone number";
        } else if (
            !/^[0-9+\-\s()]{10,15}$/.test(formData.phone)
        ) {
            errors.phone = "Please enter a valid phone number";
        }
        if (!formData.message.trim()) {
            errors.message = "Please enter your message";
        } else if (formData.message.trim().length < 10) {
            errors.message = "Message must contain at least 10 characters";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            return;
        }
        try {
            const response = await fetch(
                "http://localhost:8000/api/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );
            const data = await response.json();
            if (response.ok) {
                console.log("Server Response:", data);
                setSubmitMessage(true);
                setTimeout(() => {
                    setSubmitMessage(false);
                }, 3000)
            } else {
                console.error("Server Error:", data);
            }
        } catch (error) {
            console.error("Connection Error:", error);
            alert("Unable to connect to the server.");
        }
    };

const [formErrors, setFormErrors] = useState({});
    useEffect(() => {
        const currentTitle = jobTitles[titleIndex];
        let timer;
        if (!isDeleting) {
            if (jobTitle.length < currentTitle.length) {
                timer = setTimeout(() => {
                    setJobTitle(
                        currentTitle.substring(0, jobTitle.length + 1)
                    );
                }, 100);
            } else {
                timer = setTimeout(() => {
                    setIsDeleting(true);
                }, 3000);
            }
        } else {
            if (jobTitle.length > 0) {
                timer = setTimeout(() => {
                    setJobTitle(
                        currentTitle.substring(0, jobTitle.length - 1)
                    );
                }, 60);
            } else {
                setIsDeleting(false);
                setTitleIndex(
                    (titleIndex + 1) % jobTitles.length
                );
            }
        }
        return () => clearTimeout(timer);
    }, [jobTitle, titleIndex, isDeleting]);

    useEffect(() => {
    const aboutSection = document.getElementById("about");
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setAboutVisible(true);
            }
        },
        {
            threshold: 0.2
        }
    );
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    return () => {
        if (aboutSection) {
            observer.unobserve(aboutSection);
        }
    };
}, []);

    useEffect(() => {
    const skillsSection = document.getElementById("skills");
    const observer = new IntersectionObserver(
        ([entry]) => {

            if (entry.isIntersecting) {
                setSkillsVisible(true);
            }

        },
        {
            threshold: 0.2
        }
    );
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    return () => {
        if (skillsSection) {
            observer.unobserve(skillsSection);
        }
    };
}, []);

    useEffect(() => {

    const sections = [
        {
            id: "projects",
            setVisible: setProjectsVisible
        },
        {
            id: "experience",
            setVisible: setExperienceVisible
        },
        {
            id: "contact",
            setVisible: setContactVisible
        }
    ];

    const observers = [];

    sections.forEach(({ id, setVisible }) => {

        const section = document.getElementById(id);

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {

                if (entry.isIntersecting) {
                    setVisible(true);
                }

            },
            {
                threshold: 0.2
            }
        );

        observer.observe(section);

        observers.push({
            observer,
            section
        });

    });

    return () => {

        observers.forEach(({ observer, section }) => {
            observer.unobserve(section);
        });

    };

}, []);

    return (
        <>
            <nav className="navbar">
                <h3 className="logo">RP</h3>
                <button className="menu-button"
                    onClick={() => setMenuOpen(!menuOpen)}
                >☰
                </button>
                <div className={`nav-links ${menuOpen ? "menu-open" : ""}`}>
                    <a href="#home" onClick={() => setMenuOpen(false)}>
                        Home
                    </a>
                    <a href="#about" onClick={() => setMenuOpen(false)}>
                        About
                    </a>
                    <a href="#skills" onClick={() => setMenuOpen(false)}>
                        Skills
                    </a>
                    <a href="#projects" onClick={() => setMenuOpen(false)}>
                        Projects
                    </a>
                    <a href="#experience" onClick={() => setMenuOpen(false)}>
                        Experience
                    </a>
                    <a href="#contact" onClick={() => setMenuOpen(false)}>
                        Contact
                    </a>
                </div>
            </nav>
            {/* Home Page */}
            <section id="home" className="home">
                <div className="home-content">
                    <h1>Ram Prasath T K</h1>
                    <h3 className="job-title">
                        {jobTitle}
                    </h3>
                    <p>
                        Aspiring Software Developer seeking an entry-level
                        opportunity to contribute with company teams and
                        solve real-world problems.
                    </p>
                    <div className="home-actions">
                        <a
                            href="/Ram-Prasath-T-K-Resume.pdf"
                            download
                            className="resume-button"
                            onClick={() => {
                                setDownloadMessage(true);

                                setTimeout(() => {
                                    setDownloadMessage(false);
                                }, 3000);
                            }}
                        >
                            ↓ Download Resume
                        </a>
                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="social-button"
                        >
                            <Linkedin size={22} />
                        </a>
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="social-button"
                        >
                            <Github size={22} />
                        </a>
                        <a
                            href="mailto:your-email@gmail.com"
                            className="social-button"
                        >
                            <Envelope size={22} />
                        </a>
                    </div>
                    {downloadMessage && (
                        <div className="download-notification">
                            Resume downloaded successfully!
                        </div>
                    )}
                    {submitMessage && (
                        <div className="submit-notification">
                            Message sent successfully!
                        </div>
                    )}
                </div>
                <div>
                    <div className="profile-container">
                        <div className="profile-inner">
                            <img
                                src={profileImage}
                                alt="Ram Prasath T K"
                                className="profile-image"
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* About Page */}
            <section
                id="about"
                className={`about ${aboutVisible ? "reveal-visible" : ""}`}
            >
                <h2>About Me</h2>
                <div className="about-container">
                    <div className="about-content">
                        <h3>I'm Ram Prasath T K</h3>
                        <ul>
                            <li>
                                I am an Aspiring Software Engineer and Full Stack Developer
                                passionate about building web application and solving real-world
                                problems through technology.
                            </li>
                            <li>
                                I enjoy working modern web technologies and continuously
                                improving my skills in software development, backend development,
                                and application development.
                            </li>
                        </ul>
                    </div>
                    <div className="about-info">
                        <div className="info-card">
                            <h4>🎓 Education</h4>
                            <p>
                                B.E. Computer Science and Engineering
                            </p>
                            <span>
                                Velammal College of Engineering and Technology, Madurai.
                            </span>
                        </div>
                        <div className="info-card">
                            <h4>💻 Development</h4>
                            <p>
                                Full Stack Web Development
                            </p>
                            <span>
                                React.js, Node.js, Express.js & MongoDB
                            </span>
                        </div>
                        <div className="info-card">
                            <h4>🎯 Career Goal</h4>
                            <p>
                                Software Engineer
                            </p>
                            <span>
                                Building usefull and scalable software applications.
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            {/* Skill Page */}
            <section
                id="skills"
                className={`skill ${skillsVisible ? "reveal-visible" : ""}`}
            >
                <h2>Skills</h2>
                <div className="skills-container">
                    <div className="skill-card">
                        <div className="skill-icon">
                            <CodeAlt
                                    size={40}
                                    color="currentColor"
                                />
                        </div>
                        <h3>Programming</h3>
                        <p>
                            Java, C, C++, JavaScript, Python
                        </p>
                    </div>
                    <div className="skill-card">
                        <div className="skill-icon">
                            <Globe
                                size={40}
                                color="currentColor"
                            />
                        </div>
                        <h3>Web Development</h3>
                        <p>
                            HTML5, CSS3, Tailwind CSS, Bootstrap, React.js, Node.js, Express.js
                        </p>
                    </div>
                    <div className="skill-card">
                        <div className="skill-icon">
                            <Mobile
                                size={40}
                                color="currentColor"
                            />
                        </div>
                        <h3>App Development</h3>
                        <p>
                            Flutter, Dart, Node.js
                        </p>
                    </div>
                    <div className="skill-card">
                        <div className="skill-icon">
                            📊
                        </div>
                        <h3>Database</h3>
                        <p>
                            MongoDB, MySQL
                        </p>
                    </div>
                </div>
            </section>
            {/* Project Page */}
            <section
                id="projects"
                className={`project ${projectsVisible ? "reveal-visible" : ""}`}
            >
                <h2>Projects</h2>
                <div className="projects-container">
                    <div className="project-card">
                        <h3>Ram Railways</h3>
                        <p>
                            Train Ticket Reservation System
                        </p>
                        <p>
                            A web-based railway reservation system for
                            managing users, train bookings, and passenger infomation.
                        </p>
                        <div className="project-tech">
                            <span>HTML</span>
                            <span>CSS</span>
                            <span>JavaScript</span>
                            <span>Node.js</span>
                            <span>Express.js</span>
                            <span>MongoDB</span>
                        </div>
                        <div className="project-links">
                            <a href="#" target="_blank" rel="noreferrer">
                                GitHub
                            </a>
                            <a href="#" target="_blank" rel="noreferrer">
                                Live Demo
                            </a>
                        </div>
                    </div>
                    <div className="project-card">
                        <h3>AI Powered Resume & Job Description Analyzer</h3>
                        <p>
                            AI-based resume analysis system
                        </p>
                        <p>
                            An application that analyzes resumes and job descriptions,
                            calculates ATS scores, identifies important keywords,
                            and provides resume improvement suggestions.
                        </p>
                        <div className="project-tech">
                            <span>React.js</span>
                            <span>NLP</span>
                            <span>REST APIs</span>
                            <span>Node.js</span>
                            <span>Express.js</span>
                        </div>
                        <div className="project-links">
                            <a href="#" target="_blank" rel="noreferrer">
                                GitHub
                            </a>
                            <a href="#" target="_blank" rel="noreferrer">
                                Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* Experience Page */}
            <section
                id="experience"
                className={`experience ${experienceVisible ? "reveal-visible" : ""}`}
            >
                <h2>Experience</h2>
                <div className="experience-container">
                    <div className="experience-card">
                        <h3>Full Stack Development</h3>
                        <p className="experience-type">
                            Personal Projects
                        </p>
                        <p className="experience-description">
                            Developed full stack web application using HTML,
                            CSS, JavaScript, Node.js, Express.Js and MySQL.
                            Worked on REST APIs, authentication, database integration,
                            and responsive user interfaces.
                        </p>
                    </div>
                    <div className="experience-card">
                        <h3>Mobile App Development</h3>
                        <p className="experience-type">
                            Personal Projects
                        </p>
                        <p className="experience-description">
                            Built mobile applications using Flutter and
                            Dart, integrated backend services using Node.js
                            and Express.js and worked with REST APIs and databases.
                        </p>
                    </div>
                </div>
            </section>
            {/* Contact Page */}
            <section
                id="contact"
                className={`contact ${contactVisible ? "reveal-visible" : ""}`}
            >
                <h2>Contact</h2>

                <div className="contact-container">

                    {/* Contact Information */}
                    <div className="contact-info">

                        <h3>Let's Connect</h3>

                        <p>
                            I'm open to opportunities, collaborations, and interesting
                            projects.
                        </p>

                    </div>


                    {/* Contact Form */}
                    <form
                        className="contact-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Name */}
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        {formErrors.name && (
                            <span className="form-error">
                                {formErrors.name}
                            </span>
                        )}


                        {/* Email + Phone */}
                        <div className="contact-row">

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                {formErrors.email && (
                                    <span className="form-error">
                                        {formErrors.email}
                                    </span>
                                )}
                            </div>


                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />

                                {formErrors.phone && (
                                    <span className="form-error">
                                        {formErrors.phone}
                                    </span>
                                )}
                            </div>

                        </div>


                        {/* Message */}
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>

                        {formErrors.message && (
                            <span className="form-error">
                                {formErrors.message}
                            </span>
                        )}


                        {/* Submit */}
                        <button type="submit">
                            Send Message
                        </button>

                    </form>

                </div>

            </section>
        </>
    );
}

export default Portfolio;