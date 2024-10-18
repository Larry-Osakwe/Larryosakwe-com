import { Button, buttonVariants } from "../ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from 'next/image';

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#ff9a15] to-[#e26215] text-transparent bg-clip-text">
              Prototype
            </span>{" "}
            ideas faster with
          </h1>{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#ff9a15] to-[#e26215] text-transparent bg-clip-text">
              FlareStack
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Launch your next project in days, not weeks. Our well-documented Next.js boilerplate empowers developers to build and deploy quickly.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3">Get Started</Button>

          <a
            rel="noreferrer noopener"
            href="https://github.com/yourusername/your-repo"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            View on GitHub
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero image section */}
      <div className="z-10 w-full h-full relative">
        <Image
          src="/hero-image.svg"
          alt="FlareStack Hero Image"
          layout="responsive"
          width={700}
          height={500}
          priority
        />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
