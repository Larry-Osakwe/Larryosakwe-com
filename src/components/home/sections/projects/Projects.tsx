import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import FlareStackLogo from "@/components/home/sections/projects/images/flarestack-logo.png"
import FlareLabsLogo from "@/components/home/sections/projects/images/flarelabs-logo.png"
import PlayThisLogo from "@/components/home/sections/projects/images/playthis-logo.png"
import { cn } from '@/lib/utils'

const projects = [
  {
    title: "FlareStack",
    description: "The best Next.js Boilerplate for Your Next Project",
    logo: FlareStackLogo,
    link: "https://flarestack.io",
    color: "from-secondary/60 to-primary/60"
  },
  {
    title: "FlareLabs",
    description: "MVP subscription for everyone. Pause or cancel anytime.",
    logo: FlareLabsLogo,
    link: "https://flarelabs.app",
    color: "from-secondary/60 to-primary/60"
  },
  {
    title: "PlayThis",
    description: "Organize your gaming backlog then conquer it.",
    logo: PlayThisLogo,
    link: "https://play-this.com",
    color: "from-secondary/60 to-primary/60"
  }
]

export const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="container py-24 sm:py-32">
      <div className="mx-auto mb-16 flex flex-col items-center gap-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center flex items-center gap-3"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-foreground">Released</span>
          <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Projects
          </span>
        </motion.h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl">
          Here are some of my recent projects. Each one is crafted with attention to detail and modern best practices.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
            <Card className="bg-card text-card-foreground h-full flex flex-col justify-between overflow-hidden group border-2 border-border hover:border-secondary/50 transition-colors">
              <CardHeader className={cn(
                "relative p-6 bg-gradient-to-r",
                project.color,
                hoveredIndex === index && "from-secondary to-primary"
              )}>
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
                  size="lg" 
                  className="w-full text-lg font-semibold transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-secondary to-primary text-secondary-foreground hover:from-secondary/90 hover:to-primary/90"
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

      {/* <motion.div 
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Link href="/projects">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-secondary to-primary text-secondary-foreground hover:from-secondary/90 hover:to-primary/90 text-xl px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Projects <ChevronRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      </motion.div> */}
    </section>
  )
}

