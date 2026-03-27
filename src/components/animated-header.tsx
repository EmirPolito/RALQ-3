"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ModoSelect } from "./ui/modoSelect";
import { useTheme } from "next-themes";

export function AnimatedHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // *** FIX HYDRATION ***
  const [ready, setReady] = useState(false);

  const pathname = usePathname();

  const hideMenuRoutes = ["/inicio-sesion", "/registro", "/menu"];

  const fixedHeaderRoutes: string[] = [];

  const shouldHideMenu = hideMenuRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const forceFixedHeader = fixedHeaderRoutes.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setReady(true); // *** FIX HYDRATION ***
  }, []);

  useEffect(() => {
    const modeColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--mode-accent");
    if (modeColor) {
      document.documentElement.style.setProperty("--primary", modeColor);
    }
  }, [resolvedTheme]);

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Ayuda", href: "/ayuda" },
    { label: "Contacto", href: "/contacto" },
    { label: "Nosotros", href: "/nosotros" },
  ];

  return (
    <header


    
      className={`fixed top-0 left-0 right-0 z-50 transition-colors transition-shadow transition-opacity duration-500 ease-out 
        ${
          !ready
            ? "bg-transparent"
            : forceFixedHeader
            ? "bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] shadow-sm"
            : isMobileMenuOpen
            ? "bg-[var(--background)]/95 backdrop-blur-xl border-b border-[var(--border)]"
            : isScrolled
            ? "bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] shadow-sm"
            : "bg-transparent"
        }
      `}
    >
      

      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="relative block transition-all duration-200"
            style={{
              animation: "slideInLeft 0.8s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            {mounted ? (
              <img
                src={
                  resolvedTheme === "dark"
                    ? "/modo-oscuro-removebg-preview.png"
                    : "/modo-claro.png"
                }
                alt="Logo"
                className="h-26 w-26 max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="h-26 w-26" />
            )}
          </Link>

          {!shouldHideMenu && (
            <>
              {/* Menú desktop */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium transition-all duration-300 group overflow-hidden text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
                    style={{
                      animation: `fadeInDown 0.6s cubic-bezier(0.34,1.56,0.64,1) ${
                        index * 0.1 + 0.2
                      }s both`,
                    }}
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                      {item.label}
                    </span>
                    <span
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-3/4"
                      style={{
                        backgroundColor: "var(--primary-2)",
                        transform: "translateX(-50%)",
                      }}
                    ></span>
                  </a>
                ))}
              </nav>

              <div className="hidden md:flex items-center gap-10">
                <div
                  className="flex flex-row items-center gap-5"
                  style={{
                    animation:
                      "fadeInRight 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.45s both",
                  }}
                >
                  <ModoSelect />
                </div>

                <Link href="/inicio-sesion">
                  {mounted ? (
                    <Button
                      variant="ghost"
                      className="relative text-sm font-medium overflow-hidden group"
                      style={{
                        animation:
                          "fadeInRight 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.5s both",
                      }}
                    >
                      <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                        Iniciar sesión
                      </span>
                    </Button>
                  ) : (
                    <div className="h-10 w-32 " />
                  )}
                </Link>

                <Link href="/registro">
                  {mounted ? (
                    <Button
                      className={`relative text-sm font-medium overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-400 ${
                        resolvedTheme === "light"
                          ? "bg-[#637b6c] text-white hover:bg-[#556a5e]"
                          : resolvedTheme === "dark"
                          ? "bg-white text-black hover:bg-neutral-200"
                          : "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--accent)]"
                      }`}
                      style={{
                        animation:
                          "fadeInRight 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.6s both",
                      }}
                    >
                      <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                        Registrarse
                      </span>
                    </Button>
                  ) : (
                    <div className="h-10 w-32" />
                  )}
                </Link>
              </div>
            </>
          )}

          {/* Botón móvil */}
          {!shouldHideMenu && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90"
              aria-label="Toggle menu"
              style={{
                animation:
                  "fadeInRight 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.4s both",
              }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 animate-spin-in text-[var(--foreground)]" />
              ) : (
                <Menu className="w-6 h-6 animate-spin-in text-[var(--foreground)]" />
              )}
            </button>
          )}
        </div>

        {/* MENÚ MÓVIL */}
        {!shouldHideMenu && (
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <nav className="py-4 space-y-1 px-2">
              <ModoSelect />

              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-sm font-medium text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg transition-all duration-300 hover:translate-x-2 hover:scale-105"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    animation: isMobileMenuOpen
                      ? `slideInLeft 0.4s cubic-bezier(0.34,1.56,0.64,1) ${
                          index * 0.1
                        }s both`
                      : "none",
                  }}
                >
                  {item.label}
                </a>
              ))}

              <Link href="/inicio-sesion">
                {mounted ? (
                  <Button
                    variant="ghost"
                    className="w-full text-sm font-medium text-[var(--foreground)]/70 overflow-hidden group bg-transparent border-none shadow-none mb-2.5"
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                      Iniciar sesión
                    </span>
                    <span
                      className="absolute bottom-0 left-1/2 w-0 h-[2px] transition-all duration-300 group-hover:w-3/4"
                      style={{
                        backgroundColor: "var(--primary-2)",
                        transform: "translateX(-50%)",
                      }}
                    ></span>
                  </Button>
                ) : (
                  <div className="h-10 w-full bg-gray-200 rounded mb-2" />
                )}
              </Link>

              <Link href="/registro">
                {mounted ? (
                  <Button
                    className={`w-full text-sm font-medium transition-all duration-300 hover:scale-105
                        ${
                          resolvedTheme === "light"
                            ? "bg-[#637b6c] text-white hover:bg-[#556a5e]"
                            : resolvedTheme === "dark"
                            ? "bg-white text-black hover:bg-white hover:text-black"
                            : "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--accent)]"
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                      Registrarse
                    </span>
                  </Button>
                ) : (
                  <div className="h-10 w-full bg-gray-200 rounded" />
                )}
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* ANIMACIONES */}
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes spin-in {
          from {
            transform: rotate(-180deg) scale(0);
          }
          to {
            transform: rotate(0) scale(1);
          }
        }
        .animate-spin-in {
          animation: spin-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </header>
  );
}
