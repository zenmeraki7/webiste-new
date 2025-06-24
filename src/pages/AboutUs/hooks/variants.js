import { FaRocket, FaUsers, FaCode, FaHandshake,FaMobile,FaBrain, } from 'react-icons/fa';
import { motion } from 'framer-motion';
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  scaleOnHover: {
    whileHover: { 
      scale: 1.02, 
      y: -8,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  }
};
export const CORE_VALUES = [
  {
    id: 'innovation',
    icon: FaRocket,
    title: 'Innovation First',
    description: 'Pioneering cutting-edge solutions with React Native, Flutter, AI/ML integration, and cloud-native architectures that set industry standards.',
    delay: 0.1
  },
  {
    id: 'partnership', 
    icon: FaUsers,
    title: 'Client Partnership',
    description: 'Building lasting relationships through agile methodologies, transparent communication, and dedicated DevOps support throughout the development lifecycle.',
    delay: 0.2
  },
  {
    id: 'excellence',
    icon: FaCode,
    title: 'Technical Excellence',
    description: 'Delivering pristine, scalable code with 99.9% uptime, comprehensive testing, and performance-optimized solutions using modern tech stacks.',
    delay: 0.3
  },
  {
    id: 'collaboration',
    icon: FaHandshake,
    title: 'Agile Delivery',
    description: 'Embracing CI/CD pipelines, iterative development, and cross-functional teamwork to deliver projects 30% faster than industry average.',
    delay: 0.4
  }
];
export const SERVICES = [
  {
    id: 'mobile-dev',
    icon: FaMobile,
    title: 'Mobile App Development',
    description: 'Native iOS & Android apps, React Native, and Flutter solutions with seamless UX/UI, offline capabilities, and enterprise-grade security.',
    features: ['Native iOS/Android', 'React Native & Flutter', 'Cross-Platform PWAs', 'App Store Optimization']
  },
  {
    id: 'web-dev',
    icon: FaCode,
    title: 'Full-Stack Web Solutions',
    description: 'Modern web applications using React, Next.js, Node.js with cloud-native architecture, microservices, and DevOps integration.',
    features: ['React/Next.js Frontend', 'Node.js/Python Backend', 'Cloud Infrastructure', 'DevOps/CI-CD Pipeline']
  },
  {
    id: 'ai-ml',
    icon: FaBrain,
    title: 'AI/ML Integration',
    description: 'Intelligent features powered by machine learning, natural language processing, computer vision, and predictive analytics capabilities.',
    features: ['Machine Learning Models', 'NLP & ChatBots', 'Computer Vision', 'Predictive Analytics']
  }
];
export const TEAM_MEMBERS = [
  {
    id: 'ceo',
    name: 'Alex Chen',
    role: 'CEO & Lead Architect',
    bio: 'Full-stack engineer with 10+ years building scalable applications. Former tech lead at major fintech companies.',
    avatar: '👨‍💻',
    social: {
      linkedin: '#',
      github: '#'
    }
  },
  {
    id: 'cto',
    name: 'Sarah Kim',
    role: 'CTO & ML Engineer',
    bio: 'AI/ML specialist with expertise in deep learning and computer vision. PhD in Computer Science from Stanford.',
    avatar: '👩‍🔬',
    social: {
      linkedin: '#',
      github: '#'
    }
  },
  {
    id: 'lead-dev',
    name: 'Mike Rodriguez',
    role: 'Lead Mobile Developer',
    bio: 'Mobile development expert specializing in React Native and Flutter. Built 50+ apps with millions of downloads.',
    avatar: '👨‍🚀',
    social: {
      linkedin: '#',
      github: '#'
    }
  },
  {
    id: 'designer',
    name: 'Emma Thompson',
    role: 'UX/UI Design Lead',
    bio: 'Award-winning designer focused on user-centered design and accessibility. Former Apple design team member.',
    avatar: '🎨',
    social: {
      linkedin: '#',
      github: '#'
    }
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    text: "Zen Meraki transformed our outdated system into a modern, scalable platform. Their technical expertise and attention to detail exceeded our expectations.",
    author: "David Park",
    role: "CTO, TechFlow Solutions",
    rating: 5
  },
  {
    id: 2,
    text: "The mobile app they built for us increased user engagement by 300%. The team's agile approach and constant communication made the process seamless.",
    author: "Lisa Wang",
    role: "Product Manager, StartupXYZ",
    rating: 5
  },
  {
    id: 3,
    text: "Outstanding work on our AI integration project. They delivered complex machine learning features that our competitors couldn't match.",
    author: "James Miller",
    role: "Founder, DataDriven Inc.",
    rating: 5
  }
];