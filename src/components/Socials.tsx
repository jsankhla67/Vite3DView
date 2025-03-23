import { Github, Linkedin, Mail, User } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

const Socials = () => {
  return (
    <div className="flex max-sm:flex-col gap-5 absolute bottom-5 z-10">
      <div className="flex gap-5">
        <a
          href={"https://github.com/Lakshayyy-m"}
          target="_blank"
          className="hover:bg-black border border-black w-16 flex items-center justify-center h-11 rounded-full group transition-colors"
        >
          <Github className="group-hover:text-white transition-colors" />
        </a>
        <a
          href={"https://www.linkedin.com/in/lakshaymanchanda033"}
          target="_blank"
          className="hover:bg-black border border-black w-16 flex items-center justify-center h-11 rounded-full group transition-colors"
        >
          <Linkedin className="group-hover:text-white transition-colors" />
        </a>
        <a
          href={"https://lakshay-manchanda.vercel.app/"}
          target="_blank"
          className="hover:bg-black border border-black w-16 flex items-center justify-center h-11 rounded-full group transition-colors"
        >
          <User className="group-hover:text-white transition-colors" />
        </a>
      </div>
      <div className="flex gap-5 ms-10">
        <a
          href={"https://wa.me/16046213916"}
          target="_blank"
          className="hover:bg-black border border-black w-16 flex items-center justify-center h-11 rounded-full group transition-colors"
        >
          <IconBrandWhatsapp className="group-hover:text-white transition-colors" />
        </a>
        <a
          href={"mailto:lakshaymanchanda03@gmail.com"}
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
