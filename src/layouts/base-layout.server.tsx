import ThemeToggler from "@/components/theme-toggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FolderGit2, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

type BaseLayoutProps = PropsWithChildren;

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="w-dvw h-dvh flex flex-col justify-between">
      <div className="w-full h-fit px-8 py-4">
        <div className="w-full justify-end z-50 flex items-center gap-4">
          <ThemeToggler className="" />
          <Link href={"https://github.com/hashedalgorithm/boggle"}>
            <Button variant={"outline"}>
              <FolderGit2 />
            </Button>
          </Link>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar>
                <AvatarImage src="/logo.jpg" alt="@hashedalgorithm" />
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex flex-col justify-between gap-4">
                <p className="text-sm">
                  Created & Maintained by SanjayKumar Kumaravelan
                </p>
                <div className="flex gap-4 items-center">
                  <Link
                    href="https://www.linkedin.com/in/sanjaykumarkumaravelan/"
                    target="_blank"
                  >
                    <Linkedin className="w-4 h-auto" />
                  </Link>
                  <Link
                    href="https://www.github.com/hashedalgorithm"
                    target="_blank"
                  >
                    <Github className="w-4 h-auto" />
                  </Link>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
