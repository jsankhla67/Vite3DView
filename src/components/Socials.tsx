import { Github, Linkedin, Mail, User } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

const Socials = () => {
  return (
    <div className="flex max-sm:flex-col gap-5 absolute bottom-5 z-10">
      <div className="flex gap-5 items-center justify-center">
        <a
          href={"https://github.com/jsankhla67"}
          target="_blank"
          className="hover:bg-black border border-black w-16 flex items-center justify-center h-11 rounded-full group transition-colors"
        >
          <Github className="group-hover:text-white transition-colors" />
        </a>
        <a
          href={"https://www.linkedin.com/in/jatin-sankhla-189113261/"}
          target="_blank"
          className="hover:bg-black border border-black w-16 flex items-center justify-center h-11 rounded-full group transition-colors"
        >
          <Linkedin className="group-hover:text-white transition-colors" />
        </a>
        
      </div>
      <div className="flex gap-5 ms-10 items-center justify-center">
        <a
             href="https://wa.me/919211221681"
          target="_blank"
          className="hover:bg-black border border-black w-16 flex items-center justify-center h-11 rounded-full group transition-colors"
        >
          <IconBrandWhatsapp className="group-hover:text-white transition-colors" />
        </a>
        <a
          href={"mailto:sankhlajatin2@gmail.com"}
          target="_blank"
          className="hover:bg-black border border-black w-16 flex items-center justify-center h-11 rounded-full group transition-colors"
        >
          <Mail className="group-hover:text-white transition-colors" />
        </a>
      </div>
    </div>
  );
};

export default Socials;
