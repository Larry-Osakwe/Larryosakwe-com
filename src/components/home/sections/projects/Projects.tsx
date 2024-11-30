import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const projects = [
  {
    title: "Project Alpha",
    description: "A cutting-edge web application revolutionizing user experiences",
    logo: "/placeholder.svg?height=100&width=100",
    link: "https://project-alpha.com",
    color: "from-[#FF6B6B] to-[#4ECDC4]"
  },
  {
    title: "Beta Mobile App",
    description: "Transforming mobile interactions with intuitive design",
    logo: "/placeholder.svg?height=100&width=100",
    link: "https://beta-mobile.com",
    color: "from-[#F7B733] to-[#FC4A1A]"
  },
  {
    title: "Gamma Analytics",
    description: "Powerful data insights driving business decisions",
    logo: "/placeholder.svg?height=100&width=100",
    link: "https://gamma-analytics.com",
    color: "from-[#00F260] to-[#0575E6]"
  },
  {
    title: "Delta E-commerce",
    description: "Seamless online shopping experiences for the modern consumer",
    logo: "/placeholder.svg?height=100&width=100",
    link: "https://delta-ecommerce.com",
    color: "from-[#667eea] to-[#764ba2]"
  },
  {
    title: "Epsilon AI",
    description: "Artificial intelligence solutions for real-world challenges",
    logo: "/placeholder.svg?height=100&width=100",
    link: "https://epsilon-ai.com",
    color: "from-[#ED4264] to-[#FFEDBC]"
  },
  {
    title: "Zeta Cloud",
    description: "Next-generation cloud infrastructure for scalable applications",
    logo: "/placeholder.svg?height=100&width=100",
    link: "https://zeta-cloud.com",
    color: "from-[#C33764] to-[#1D2671]"
  }
]

export const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-24 bg-background text-foreground">
      <motion.h1 
        className="text-6xl font-extrabold mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Innovative Projects
        </span>
      </motion.h1>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <Card className="bg-card text-card-foreground h-full flex flex-col justify-between overflow-hidden group">
              <CardHeader className={`relative p-6 ${project.color} bg-gradient-to-br`}>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col items-center text-white">
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    width={100}
                    height={100}
                    className="rounded-full bg-white p-2 mb-4 shadow-lg"
                  />
                  <CardTitle className="text-2xl font-bold text-center">{project.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <p className="text-muted-foreground text-lg text-center">
                  {project.description}
                </p>
              </CardContent>
              <CardFooter className="p-6">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full text-lg font-semibold transition-all duration-300 hover:shadow-lg"
                  asChild
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    Explore Project <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <motion.div 
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Button 
          size="lg" 
          className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          View All Projects <ChevronRight className="ml-2 h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  )
}

