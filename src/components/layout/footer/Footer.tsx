import { config } from "@/config";
import { LogoIcon } from "@/components/shared/icons/Icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <LogoIcon />
            {config.appName}
          </a>
          <p className="mt-4 text-sm text-secondary-foreground">
            {config.appDescription}
          </p>
          <p className="mt-4 text-sm text-secondary-foreground">
            Copyright © 2024 - All rights reserved
          </p>
          <Link
            href="https://flarestack.io"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button className="mt-4 rounded-sm" size="sm" variant="outline">
              Built with <LogoIcon className="mx-1 pb-0.5 w-4 h-4" /> FlareStack
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow US</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://github.com/larry-osakwe"
              className="opacity-60 hover:opacity-100"
            >
              Github
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="https://twitter.com/lairelaflare"
              className="opacity-60 hover:opacity-100"
            >
              Twitter
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/larry-osakwe/"
              className="opacity-60 hover:opacity-100"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Legal</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="/terms"
              className="opacity-60 hover:opacity-100"
            >
              Terms of Service
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="/privacy"
              className="opacity-60 hover:opacity-100"
            >
              Privacy Policy
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="/license"
              className="opacity-60 hover:opacity-100"
            >
              License
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">About</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#features"
              className="opacity-60 hover:opacity-100"
            >
              Features
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#pricing"
              className="opacity-60 hover:opacity-100"
            >
              Pricing
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#faq"
              className="opacity-60 hover:opacity-100"
            >
              FAQ
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="/docs"
              className="opacity-60 hover:opacity-100"
            >
              Documentation
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Built with FlareStack</h3>
            Coming Soon
          {/* <div>
            <a
              rel="noreferrer noopener"
              href="https://www.youtube.com/@LarryOsakwe"
              className="opacity-60 hover:opacity-100"
            >
              Youtube
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Discord
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Twitch
            </a>
          </div> */}
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 Landing page made by{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.linkedin.com/in/larry-osakwe/"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Larry Osakwe
          </a>
        </h3>
      </section>
    </footer>
  );
};