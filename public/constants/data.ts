import { StaticImageData } from "next/image";
import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  CCNA,
  BootStrap,
  DBMS,
  mysql,
  cassandra,
  php,
  Clang,
  cpp,
  python,
  java,

  meta,
  starbucks,
  tesla,
  shopify,
  smartknowers,
  xceller,
  edunet,
  internpe,

  carrent,
  jobit,
  tripguide,
  cnn,
  hpp,
  weather,
  tictactoe,
  dhcp,
  hacer,
  shutdown,
  chatbot,
  clock,
  rockpaperscissors,
  portfolio,

  threejs,
  github,
  instagram,
  linkedin,
  mail,
  phone,
  whatsapp,

} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Network Administrator",
    icon: creator,
  },
  {
    title: "Ethical Hacker",
    icon: mobile,
  },
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Python Developer",
    icon: web,
  },
  {
    title: "Data Scientist",
    icon: backend,
  },
  {
    title: "AI Enthusiast",
    icon: creator,
  },
  {
    title: "Problem Solving",
    icon: mobile,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "Python",
    icon: python,
  },
];

interface ExperiencesInterface {
    title: string;
    company_name: string;
    icon: StaticImageData;
    iconBg: string;
    date: string;
    points: string[];
}

const experiences: ExperiencesInterface[] = [
  {
    title: "Ethical Hacker",
    company_name: "SmartKnowers",
    icon: smartknowers,
    iconBg: "#0e0e0e",
    date: "February 2022 - March 2022",
    points: [
      "Troubleshot problems and diagnosed system faults.",
      "Identified issues, analyzed information and provided solutions to problems.",
      "Configured and maintained database servers, ensuring security.",
      "Independently analyzed, solved and corrected issues on databases, networks, software and hardware in real-time.",
    ],
  },
  {
    title: "Network Administrator",
    company_name: "Xceller IT Services",
    icon: xceller,
    iconBg: "#E6DEDD",
    date: "August 2022 - October 2022",
    points: [
      "Developing a network architecture and managing it.",
      "Enabling router and switches for secure connection.",
      "Managing the network and making it as compact, secure and usable as possible.",
      "Troubleshooting errors in network.",
    ],
  },
  {
    title: "Cyber Security",
    company_name: "Edunet",
    icon: edunet,
    iconBg: "#E6DEDD",
    date: "January 2023 - March 2023",
    points: [
      "Developing and maintaining virtual labs for testing on different systems.",
      "Collaborating with cross-functional teams to gather information required for penetration.",
      "Exploiting vulnerabilities in webapp and servers.",
      "Reporting about vulnerabilities and providing solutions for them.",
    ],
  },
  {
    title: "Python Developer",
    company_name: "InternPe",
    icon: internpe,
    iconBg: "#383E56",
    date: "May 2023 - June 2023",
    points: [
      "Developing and maintaining applications using Python and other related technologies.",
      "Collaborating with cross-functional teams to create high-quality products.",
      "Implementing analysing code and fixing errors.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Portfolio",
    description:
      "A web based reactjs portfolio having 3D components using threejs and related technologies.",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient",
      },
      {
        name: "threejs",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: portfolio,
    source_code_link: "https://github.com/vip847/Portfolio",
  },
  {
    name: "Digital Clock",
    description:
      "A python application which shows time in 12hrs clock and 24hrs clock and date.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "tkinter",
        color: "green-text-gradient",
      },
    ],
    image: clock,
    source_code_link: "https://github.com/vip847/Digital-Clock",
  },
  {
    name: "Rock Paper Scissors",
    description:
      "A interactive command line interface based python game.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
    ],
    image: rockpaperscissors,
    source_code_link: "https://github.com/vip847/rock-paper-scissors",
  },
  {
    name: "Tic Tac Toe Game",
    description:
      "An interactive graphical Tic Tac Toe game with graphical user interface.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "pygame",
        color: "green-text-gradient",
      },
    ],
    image: tictactoe,
    source_code_link: "https://github.com/vip847/tic-tac-toe",
  },
  {
    name: "DHCP with RIP",
    description:
      "A network Architecture have enabled RIP routing protocol with DHCP pool on router.",
    tags: [
      {
        name: "router_config",
        color: "blue-text-gradient",
      },
      {
        name: "RIP",
        color: "green-text-gradient",
      },
      {
        name: "DHCP",
        color: "pink-text-gradient",
      },
    ],
    image: dhcp,
    source_code_link: "https://github.com/vip847/DHCP",
  },
  {
    name: "Weather Predictor",
    description:
      "Python application used to check current weather condition of any city in real time.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "open_weather_API",
        color: "green-text-gradient",
      },
    ],
    image: weather,
    source_code_link: "https://github.com/vip847/Python-and-cs",
  },
  {
    name: "Medical Chatbot",
    description:
      "An AI based model using python and openai API which gives suggestions to  person suffering by any disease taking disease name and severity as input.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "openai_API",
        color: "green-text-gradient",
      },
    ],
    image: chatbot,
    source_code_link: "https://github.com/vip847/medical-chatbot",
  },
  {
    name: "ShutDown App",
    description:
      "A python application with graphical user interface used to perform operations like shutdown, restart, logout, sleep.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "tkinter",
        color: "green-text-gradient",
      },
    ],
    image: shutdown,
    source_code_link: "https://github.com/vip847/Shutdown-using-python",
  },
  {
    name: "E-commerce Website",
    description:
      "A web based application which allow users to search, purchase and manage cloth shopping from hacer platform.",
    tags: [
      {
        name: "html",
        color: "blue-text-gradient",
      },
      {
        name: "bootstrap",
        color: "green-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
    ],
    image: hacer,
    source_code_link: "https://github.com/vip847/Ecommerce-website",
  },
  {
    name: "Image Recognition Model",
    description:
      "Image Recognition model is python and neural network model which is used to recognize pattern in image.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "neural_network",
        color: "green-text-gradient",
      },
      {
        name: "keras",
        color: "pink-text-gradient",
      },
    ],
    image: cnn,
    source_code_link: "https://github.com/vip847/python",
  },
  {
    name: "House Price Prediction",
    description:
      "House Price Prediction is linear regression based model which predicts price of house on various aspects.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "linear_regression",
        color: "green-text-gradient",
      },
      {
        name: "numpy",
        color: "pink-text-gradient",
      },
    ],
    image: hpp,
    source_code_link: "https://github.com/vip847/Python-and-Machine-Learning/",
  },
];

const connect = [
  {
    title: "Github",
    icon: github,
    url: "https://github.com/vip847/",
  },
  {
    title: "Instagram",
    icon: instagram,
    url: "https://instagram.com/viplove_itankar847/",
  },
  {
    title: "LinkedIn",
    icon: linkedin,
    url: "https://linkedin.com/in/viplao847/",
  },
  {
    title: "Gmail",
    icon: mail,
    url: "mailto:viplaoitankar26@gmail.com",
  },
  {
    title: "Contact No",
    icon: phone,
    url: "tel:+919422686346",
  },
  {
    title: "WhatsApp",
    icon: whatsapp,
    url: "https://wa.me/qr/DEW5VVCJ2CTIM1",
  },
];

export { services, technologies, experiences, testimonials, projects, connect };