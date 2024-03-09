import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitterX,
} from "react-icons/bs";

const FooterComponent = () => {
  return (
    <Footer container className="rounded-md border-t-8 border-slate-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link className="self-center font-semibold text-lg">
              <span className="px-2 mr-3 py-2 bg-gradient-to-r from-slate-600 via-indigo-500 to-purple-600 rounded-lg font-semibold text-white">
                Rijan's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-5 sm:grid-cols-3">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="github.com/rijan-shrestha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Some JS Projects
                </Footer.Link>
                <Footer.Link
                  href="github.com/rijan-shrestha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Rijan's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="github.com/csaipyjs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="" target="_blank" rel="noopener noreferrer">
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="" target="_blank" rel="noopener noreferrer">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="sm:flex sm:justify-between sm:items-center">
          <Footer.Copyright
            href="#"
            by="Rijan's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-7 mt-3 sm:mt-0">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsTwitterX} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
