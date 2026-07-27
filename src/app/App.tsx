import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, Phone, Mail, MapPin, ChevronLeft, ChevronRight,
  Shield, Zap, Award, Truck, Star, ArrowRight, CheckCircle,
  MessageCircle, Facebook, Instagram, Home, Layers, Wind,
  Hammer, Package, Quote,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

import corrugatedImg from "@/imports/Corrugated.jpeg";
import decraImg from "@/imports/Decra.jpeg";
import eurotileImg from "@/imports/Eurotile.jpeg";
import accessoriesImg from "@/imports/Accesories.jpeg";
import accessories1Img from "@/imports/Accesories-1.jpeg";
import cyclonesImg from "@/imports/Cyclones.jpeg";
import rawMaterialsImg from "@/imports/Raw_Materials.jpeg";
import nailsImg from "@/imports/Special_roofing_nails.jpeg";

const PHONE = "+254706764503";
const PHONE_DISPLAY = "0706 764 503";
const EMAIL = "summitmabatifactory@gmail.com";
const WHATSAPP_MSG = encodeURIComponent("Hello Summit Mabati Factory! I would like to enquire about your roofing products and get a quote.");
const WHATSAPP_URL = `https://wa.me/${PHONE.replace("+", "")}?text=${WHATSAPP_MSG}`;
const FACEBOOK_URL = "https://www.facebook.com/p/Summit-Mabati-Factory-61578114482374/";
const INSTAGRAM_URL = "https://www.instagram.com/summitmabatifactory/";

const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Why Us", href: "#why-us" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const HERO_SLIDES = [
  {
    img: corrugatedImg,
    alt: "Blue corrugated steel roofing sheets fresh from the factory",
    headline: "Where Quality",
    highlight: "Meets Affordability",
    sub: "Kenya's trusted source for premium corrugated sheets, stone-coated tiles, and roofing accessories — delivered nationwide, priced factory-direct.",
  },
  {
    img: decraImg,
    alt: "Red stone-coated Decra roofing tiles",
    headline: "Stone-Coated",
    highlight: "Decra Tiles",
    sub: "The classic terracotta Decra profile — combining the timeless beauty of clay with the unmatched strength and longevity of galvanised steel.",
  },
  {
    img: eurotileImg,
    alt: "Rich brown Eurotile stone-coated roofing panels on production rack",
    headline: "Elegant",
    highlight: "Eurotile Profile",
    sub: "Deep-ribbed interlocking Eurotiles give your home an upmarket look while delivering the structural performance of steel — no compromises.",
  },
  {
    img: cyclonesImg,
    alt: "Polished stainless steel cyclone turbine roof ventilators",
    headline: "Cyclone",
    highlight: "Roof Ventilators",
    sub: "Wind-powered stainless steel turbine ventilators in three sizes. Keep your building cool and moisture-free — no electricity, no running costs.",
  },
  {
    img: accessoriesImg,
    alt: "Full colour range of ridge caps and valley gutters",
    headline: "Complete",
    highlight: "Accessories Range",
    sub: "From colour-matched ridge caps to valley gutters and apron flashings — every accessory you need for a watertight, professional finish.",
  },
];

const PRODUCTS = [
  {
    name: "Corrugated Sheets",
    icon: Home,
    img: corrugatedImg,
    alt: "Sky blue corrugated steel roofing sheets",
    desc: "Our pre-painted corrugated sheets are available in Gauge 28, 30, and 32 in a wide palette of colours — from sky blue and brick red to forest green and charcoal. Each sheet is hot-dip galvanised before painting for maximum rust resistance and longevity, even in coastal or high-rainfall areas.",
    tag: "Best Seller",
  },
  {
    name: "Decra Stone-Coated Tiles",
    icon: Layers,
    img: decraImg,
    alt: "Terracotta red Decra stone-coated tile panel",
    desc: "Decra tiles replicate the look of traditional clay roofing at a fraction of the weight and cost. Each panel is coated with natural stone chips and sealed with an acrylic overglaze for colour stability and weather resistance. Available in terracotta, charcoal, and sahara brown.",
    tag: "Premium",
  },
  {
    name: "Eurotile",
    icon: Layers,
    img: eurotileImg,
    alt: "Chocolate brown Eurotile panels on production rack",
    desc: "The Eurotile profile features a bold, deep-ribbed design that gives any roof a premium, architectural appearance. Stone-coated and interlocking, Eurotiles shed water rapidly, reduce noise, and resist impact. An ideal choice for bungalows, mansionettes, and multi-storey residences.",
    tag: "Popular",
  },
  {
    name: "Ridge Caps & Valley Gutters",
    icon: Package,
    img: accessoriesImg,
    alt: "Ridge caps in maroon, grey, black and coffee standing upright",
    desc: "A perfectly finished roof needs matching accessories. Our ridge caps, roll tops, and valley gutters are manufactured to colour-match every sheet profile we carry — in Matte G28 and G30 — so your ridge line and valleys look as good as the rest of the roof.",
    tag: "Accessories",
  },
  {
    name: "Cyclone Ventilators",
    icon: Wind,
    img: cyclonesImg,
    alt: "Three polished stainless steel turbine ventilators in different sizes",
    desc: "Our stainless steel cyclone turbine ventilators work purely on wind energy — no motors, no electricity, no maintenance costs. Available in 6-inch, 10-inch, and 14-inch diameters. Ideal for industrial sheds, warehouses, schools, and residential roofs to expel heat and moisture naturally.",
    tag: "Ventilation",
  },
  {
    name: "Special Roofing Nails",
    icon: Hammer,
    img: nailsImg,
    alt: "Sky blue colour-matched roofing nails with rubber washers in a container",
    desc: "Our colour-coded roofing nails feature a neoprene rubber washer that compresses on installation, creating a watertight seal around every fixing hole. The galvanised twisted shank grips the purlin and resists pull-out. Available in sky blue, red, green, and other popular colours.",
    tag: "Fixings",
  },
  {
    name: "Full Accessories Pack",
    icon: Package,
    img: accessories1Img,
    alt: "Complete display of roofing accessories in various colours",
    desc: "Take the guesswork out of finishing your roof. Our full accessories pack includes ridge caps, valley gutters, apron flashings, barge flashings, and box gutters — all colour-matched to your chosen sheet profile and cut to the lengths you need.",
    tag: "Bundle",
  },
  {
    name: "Raw Steel Coils",
    icon: Layers,
    img: rawMaterialsImg,
    alt: "Hands unwrapping a fresh galvanised steel coil at the factory",
    desc: "Every product we make starts with quality galvanised steel coils sourced from certified mills. We inspect every coil on arrival — checking coating weight, tensile strength, and base metal thickness — before it ever touches our roll-forming lines. Quality in, quality out.",
    tag: "Raw Material",
  },
];

const STATS = [
  { value: "15+", label: "Years in Business", desc: "Serving Kenya since 2009" },
  { value: "47", label: "Counties Served", desc: "Truly nationwide reach" },
  { value: "50K+", label: "Happy Customers", desc: "Homes, schools & warehouses" },
  { value: "100%", label: "Quality Guaranteed", desc: "Every order, every time" },
];

const FEATURES = [
  {
    icon: Shield,
    title: "Uncompromising Quality",
    desc: "Every sheet, tile, and accessory is inspected before it leaves our premises. We use certified galvanised steel as our base material and apply paint coatings that meet international standards. Our products are built to outlast the structure they protect.",
  },
  {
    icon: Zap,
    title: "Same-Day Cutting & Dispatch",
    desc: "Need your order fast? Place it before noon and we will cut, bundle, and have it ready for collection or dispatch the same day. No more waiting days for a simple order — we understand that downtime on site costs money.",
  },
  {
    icon: Award,
    title: "Fully Colour-Matched Range",
    desc: "From the first corrugated sheet to the last roofing nail, every component we supply is colour-matched to your chosen profile. No mismatched ridges or valley gutters — just a clean, professional finish that contractors and homeowners love.",
  },
  {
    icon: Truck,
    title: "Delivery to All 47 Counties",
    desc: "Our logistics network reaches every corner of Kenya. Whether you are building in Mombasa, Kisumu, Nakuru, Garissa, or Nairobi, we can arrange competitive delivery. Call us to get a delivery quote alongside your product price.",
  },
  {
    icon: CheckCircle,
    title: "Custom Cut-to-Length",
    desc: "We cut sheets to any length you specify — from 1.5 m right up to 12 m — so you receive exactly what your roof requires. Zero off-cuts on your site means zero wastage, faster installation, and a tidier finish.",
  },
  {
    icon: Star,
    title: "Factory-Direct Pricing",
    desc: "Buying direct from the manufacturer means no distributor markups, no middlemen, and no inflated prices. We pass the savings on to you — giving you more budget for the rest of your project without cutting corners on quality.",
  },
];

const TESTIMONIALS = [
  {
    name: "James Mwangi",
    role: "Site Foreman, Nairobi",
    stars: 5,
    quote: "I have been buying from Summit Mabati for three years. The sheets are consistently good gauge and the cut-to-length service means I have zero wastage on site. Highly recommended for any serious contractor.",
  },
  {
    name: "Grace Otieno",
    role: "Property Developer, Kisumu",
    stars: 5,
    quote: "Ordered Decra tiles for my six-unit apartment block. Delivery arrived on time, every tile was intact, and the colour matched perfectly. The team was helpful and patient with my many questions. Will order again.",
  },
  {
    name: "Peter Kamau",
    role: "Hardware Retailer, Thika",
    stars: 5,
    quote: "I stock Summit Mabati products in my shop and my customers keep coming back asking for them by name. The quality speaks for itself and the pricing lets me offer my customers real value. A trustworthy supplier.",
  },
];

const GALLERY_IMAGES = [
  { img: corrugatedImg, caption: "Corrugated Sheets — Sky Blue G30" },
  { img: decraImg, caption: "Decra Tiles — Terracotta" },
  { img: eurotileImg, caption: "Eurotile — Mocha Brown" },
  { img: accessoriesImg, caption: "Ridge Caps — Full Colour Range" },
  { img: cyclonesImg, caption: "Cyclone Turbine Ventilators" },
  { img: nailsImg, caption: "Colour-Matched Roofing Nails" },
  { img: rawMaterialsImg, caption: "Premium Galvanised Steel Coils" },
  { img: accessories1Img, caption: "Complete Accessories Display" },
];

/* ─── Small reusable section header ─── */
function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-3">
      <div className={`h-px w-8 ${light ? "bg-sky-400" : "bg-primary"}`} />
      <span
        className={`text-xs font-semibold tracking-[0.22em] uppercase ${light ? "text-sky-400" : "text-primary"}`}
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {text}
      </span>
      <div className={`h-px w-8 ${light ? "bg-sky-400" : "bg-primary"}`} />
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [whatsappPing, setWhatsappPing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), []);
  const prevSlide = useCallback(() => setSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(nextSlide, 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, nextSlide]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Pulse the WhatsApp button after 4 s */
  useEffect(() => {
    const t = setTimeout(() => setWhatsappPing(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const current = HERO_SLIDES[slide];

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ═══════════════════════════════════════ HERO ═══ */}
      <section
        id="top"
        className="relative h-screen min-h-[640px] overflow-hidden bg-[#0a1628]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1200"
            style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 1 : 0 }}
          >
            <ImageWithFallback
              src={s.img}
              alt={s.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050e1c]/95 via-[#050e1c]/55 to-[#050e1c]/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050e1c]/75 via-transparent to-transparent" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 lg:pb-28">
          <div className="max-w-7xl mx-auto px-5 lg:px-10 w-full">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-px w-10 bg-sky-400" />
                <span
                  className="text-sky-300 text-[11px] font-semibold tracking-[0.25em] uppercase"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Summit Mabati Factory — Kenya
                </span>
              </div>
              <h1
                key={`h-${slide}`}
                className="font-black uppercase leading-[0.92] mb-5"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.5rem, 10vw, 7.5rem)",
                  color: "#ffffff",
                  textShadow: "0 2px 30px rgba(0,0,0,0.4)",
                }}
              >
                {current.headline}
                <br />
                <span className="text-sky-400">{current.highlight}</span>
              </h1>
              <p
                key={`p-${slide}`}
                className="text-white/75 text-sm lg:text-base leading-relaxed mb-9 max-w-xl"
              >
                {current.sub}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <button
                  onClick={() => scrollTo("#products")}
                  className="bg-primary text-white px-7 py-3.5 font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-sky-600 transition-all shadow-xl shadow-primary/30 group min-h-[44px]"
                >
                  Explore Products
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-7 py-3.5 font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-[#1ebe5d] transition-all shadow-lg group min-h-[44px]"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="border-2 border-white/40 text-white px-6 py-3.5 font-semibold text-sm rounded-xl hover:border-sky-400 hover:text-sky-300 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Phone size={15} />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/15 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/15 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`rounded-full transition-all duration-300 ${i === slide ? "w-8 h-2.5 bg-sky-400" : "w-2.5 h-2.5 bg-white/35 hover:bg-white/60"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div
          className="absolute bottom-9 right-6 z-20 text-white/50 text-xs tabular-nums"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {String(slide + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(HERO_SLIDES.length).padStart(2, "0")}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
          <div
            key={slide}
            className="h-full bg-sky-400 origin-left"
            style={{ animation: paused ? "none" : "progress 5.5s linear forwards" }}
          />
        </div>
      </section>

      {/* Progress bar keyframe */}
      <style>{`
        @keyframes progress { from { width: 0% } to { width: 100% } }
      `}</style>

      {/* ═══════════════════════════════════════ STATS ═══ */}
      <section className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_white_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/20 divide-y divide-white/20 lg:divide-y-0">
            {STATS.map((stat, i) => (
              <div key={i} className="py-8 px-6 text-center">
                <div
                  className="text-white font-black leading-none mb-1"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  {stat.value}
                </div>
                <div className="text-white font-semibold text-sm mb-0.5">{stat.label}</div>
                <div className="text-sky-200/70 text-xs">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ PRODUCTS ═══ */}
      <section id="products" className="py-14 lg:py-24 bg-[#f5faff] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14">
            <SectionLabel text="Our Full Range" />
            <h2
              className="text-[#0a1628] font-black uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              Products &amp; Accessories
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
              From the first sheet to the last fixing nail — Summit Mabati Factory supplies everything you need
              to complete a roofing project to the highest standard. Browse our full range below and
              enquire directly for a fast, accurate quote.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.map((product, i) => {
              const Icon = product.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-sky-100 group transition-all duration-400 hover:-translate-y-2"
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-sky-50">
                    <ImageWithFallback
                      src={product.img}
                      alt={product.alt}
                      className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                      {product.tag}
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3
                      className="text-[#0a1628] font-bold mb-2.5 leading-tight"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "16px", letterSpacing: "0.02em" }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3">{product.desc}</p>
                    <button
                      onClick={() => scrollTo("#contact")}
                      className="w-full bg-sky-50 hover:bg-primary hover:text-white text-primary text-xs font-bold py-2.5 rounded-lg transition-all uppercase tracking-wide flex items-center justify-center gap-1.5 group/btn border border-sky-200 hover:border-primary min-h-[44px]"
                    >
                      Enquire Now
                      <ChevronRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ WHY US ═══ */}
      <section id="why-us" className="py-14 lg:py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-4">
            <SectionLabel text="Why Choose Summit" />
            <h2
              className="text-[#0a1628] font-black uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              The Summit Difference
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm leading-relaxed mb-12">
              There are many roofing suppliers in Kenya. Here is why thousands of contractors,
              developers, and homeowners choose Summit Mabati Factory — and why they keep coming back.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="group p-5 lg:p-7 rounded-2xl border border-sky-100 hover:border-primary/30 hover:bg-[#f5faff] transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm">
                    <Icon size={20} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3
                    className="text-[#0a1628] font-bold text-lg mb-3"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.02em" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ ABOUT ═══ */}
      <section id="about" className="py-14 lg:py-24 bg-[#0a1628] relative overflow-hidden scroll-mt-20">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_20%_50%,_#38bdf8_0%,_transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Image mosaic — mobile: horizontal scroll strip; lg: original 2×2 grid */}
            <div className="relative">
              {/* Mobile horizontal scroll strip */}
              <div className="flex overflow-x-auto gap-3 snap-x snap-mandatory lg:hidden pb-2">
                <ImageWithFallback src={corrugatedImg} alt="Blue corrugated sheets" className="snap-start flex-shrink-0 w-64 h-48 object-cover rounded-2xl shadow-xl" />
                <ImageWithFallback src={decraImg} alt="Decra tiles" className="snap-start flex-shrink-0 w-64 h-48 object-cover rounded-2xl shadow-xl" />
                <ImageWithFallback src={eurotileImg} alt="Eurotile profile" className="snap-start flex-shrink-0 w-64 h-48 object-cover rounded-2xl shadow-xl" />
                <ImageWithFallback src={cyclonesImg} alt="Cyclone ventilators" className="snap-start flex-shrink-0 w-64 h-48 object-cover rounded-2xl shadow-xl" />
              </div>
              {/* Desktop 2×2 grid */}
              <div className="hidden lg:grid grid-cols-2 gap-3">
                <ImageWithFallback src={corrugatedImg} alt="Blue corrugated sheets" className="w-full aspect-[4/3] object-cover rounded-2xl shadow-xl" />
                <ImageWithFallback src={decraImg} alt="Decra tiles" className="w-full aspect-[4/3] object-cover rounded-2xl shadow-xl mt-8" />
                <ImageWithFallback src={eurotileImg} alt="Eurotile profile" className="w-full aspect-[4/3] object-cover rounded-2xl shadow-xl -mt-8" />
                <ImageWithFallback src={cyclonesImg} alt="Cyclone ventilators" className="w-full aspect-[4/3] object-cover rounded-2xl shadow-xl" />
              </div>
              {/* Floating pill */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary text-white px-7 py-3 rounded-full text-sm font-bold shadow-xl shadow-primary/40 whitespace-nowrap flex items-center gap-2">
                <CheckCircle size={15} /> Factory-Direct · No Middlemen
              </div>
            </div>

            {/* Copy */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-sky-400" />
                <span
                  className="text-sky-400 text-[11px] font-semibold tracking-[0.22em] uppercase"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Our Story
                </span>
              </div>
              <h2
                className="text-white font-black uppercase leading-none mb-7"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
              >
                Quality Roofing,
                <br />
                <span className="text-sky-400">Built for Kenya</span>
              </h2>

              <div className="space-y-4 text-sky-100/75 text-sm leading-relaxed">
                <p>
                  Summit Mabati Factory was born from a simple but powerful conviction — that every Kenyan
                  family and every Kenyan business deserves access to quality roofing materials at honest,
                  affordable prices. We set out to remove the layers of middlemen, importers, and wholesalers
                  that inflate the cost of roofing, and to supply our customers directly from our production floor.
                </p>
                <p>
                  Today we manufacture and stock a comprehensive range of roofing products — corrugated sheets,
                  stone-coated Decra tiles, Eurotiles, cyclone ventilators, ridge caps, valley gutters, apron
                  flashings, and colour-matched accessories. Every product is made or sourced to meet the demands
                  of Kenya's diverse climate, from the humid coast to the high-altitude highlands.
                </p>
                <p>
                  Our tagline, <span className="text-sky-300 font-semibold">"Where Quality Meets Affordability,"</span> is
                  not a marketing phrase — it is the principle by which we make every decision: which steel to source,
                  which paint to apply, and what price to charge. We believe you should never have to choose between
                  quality and value.
                </p>
                <p>
                  Whether you are a self-builder putting a roof over your family's head, a contractor managing
                  multiple sites, or a hardware retailer looking for a reliable supplier — Summit Mabati Factory
                  is ready to serve you. Call us, WhatsApp us, or send an email and we will respond promptly.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { v: "G28 – G32", l: "Gauge Range" },
                  { v: "20+ Colours", l: "Colour Options" },
                  { v: "Same Day", l: "Cut & Dispatch" },
                  { v: "All 47", l: "Counties Served" },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-sky-500 pl-4 py-1">
                    <div className="text-white font-bold text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{item.v}</div>
                    <div className="text-sky-400/70 text-[11px] uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>{item.l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`tel:${PHONE}`} className="bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-sky-600 transition-colors flex items-center gap-2 shadow-lg shadow-primary/25 min-h-[44px]">
                  <Phone size={15} /> Call Us Now
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1ebe5d] transition-colors flex items-center gap-2 shadow-lg min-h-[44px]">
                  <MessageCircle size={15} /> WhatsApp
                </a>
                <a href={`mailto:${EMAIL}`} className="border-2 border-sky-500/50 text-sky-300 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-sky-500/10 transition-colors flex items-center gap-2 min-h-[44px]">
                  <Mail size={15} /> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ TESTIMONIALS ═══ */}
      <section className="py-14 lg:py-24 bg-[#f5faff]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14">
            <SectionLabel text="Customer Reviews" />
            <h2
              className="text-[#0a1628] font-black uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              We let our customers do the talking. Here is what a few of the thousands of satisfied clients
              across Kenya have said about working with Summit Mabati Factory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 md:p-7 border border-sky-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                <Quote size={28} className="text-sky-200 mb-4 flex-shrink-0" />
                <p className="text-[#0a1628]/80 text-sm leading-relaxed flex-1 mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="border-t border-sky-50 pt-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[#0a1628] font-bold text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.role}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ GALLERY ═══ */}
      <section id="gallery" className="py-14 lg:py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14">
            <SectionLabel text="Product Gallery" />
            <h2
              className="text-[#0a1628] font-black uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              See Our Products Up Close
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Browse our product gallery to see the quality and variety of roofing materials we supply.
              Hover over any image to see the product name. Like what you see? Get in touch for a quote.
            </p>
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
            {GALLERY_IMAGES.map((item, i) => (
              <div key={i} className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-md cursor-pointer">
                <ImageWithFallback
                  src={item.img}
                  alt={item.caption}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-semibold leading-snug">{item.caption}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-sky-700 transition-colors shadow-lg shadow-primary/25 group min-h-[44px]"
            >
              Request a Product Sample
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ CTA BAND ═══ */}
      <section className="relative bg-[#0a1628] py-14 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_#0284c7_0%,_transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-sky-500" />
            <span className="text-sky-400 text-xs font-semibold tracking-[0.22em] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
              Start Your Project
            </span>
            <div className="h-px w-8 bg-sky-500" />
          </div>
          <h2
            className="text-white font-black uppercase leading-none mb-5"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 6vw, 5rem)" }}
          >
            Ready to Roof Your Project?
          </h2>
          <p className="text-sky-200/75 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us your roof size, preferred product, and location. We will send you a detailed quote within
            a few hours — no obligation, no pressure. Call, WhatsApp, or email us now and let us help you
            get the best quality roofing at the best possible price.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#1ebe5d] transition-all shadow-xl group min-h-[44px]">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
            <a href={`tel:${PHONE}`}
              className="bg-primary text-white px-8 py-4 font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-sky-600 transition-all shadow-xl group min-h-[44px]">
              <Phone size={18} /> Call {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`}
              className="border-2 border-sky-500/50 text-sky-300 px-8 py-4 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-sky-500/10 transition-colors min-h-[44px]">
              <Mail size={18} /> {EMAIL}
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8">
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sky-400/60 hover:text-[#1877F2] transition-colors text-sm font-semibold min-h-[44px]">
              <Facebook size={18} /> Follow on Facebook
            </a>
            <div className="h-4 w-px bg-sky-700" />
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sky-400/60 hover:text-[#E1306C] transition-colors text-sm font-semibold min-h-[44px]">
              <Instagram size={18} /> Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ CONTACT ═══ */}
      <section id="contact" className="py-14 lg:py-24 bg-[#f5faff] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

            {/* Left: info */}
            <div>
              <SectionLabel text="Get in Touch" />
              <h2
                className="text-[#0a1628] font-black uppercase leading-none mb-5 text-center lg:text-left"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
              >
                Request Your
                <br />
                <span className="text-primary">Free Quote</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Getting a quote from Summit Mabati Factory is fast and straightforward.
                Simply tell us the size of your roof (in metres or square metres), the
                product you are interested in, and your location. We will calculate
                exactly how many sheets, accessories, and fixings you need and
                send you a clear, itemised quote — usually within a few hours.
              </p>

              <div className="space-y-5">
                <a href={`tel:${PHONE}`} className="flex items-center gap-4 group p-3 sm:p-4 rounded-2xl border border-sky-100 hover:border-primary/30 hover:bg-white transition-all min-h-[44px]">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all shadow-sm">
                    <Phone size={20} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5 font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>Phone / WhatsApp</div>
                    <div className="text-[#0a1628] font-bold text-lg">{PHONE_DISPLAY}</div>
                    <div className="text-muted-foreground text-xs">Call or WhatsApp anytime</div>
                  </div>
                </a>

                <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 group p-3 sm:p-4 rounded-2xl border border-sky-100 hover:border-primary/30 hover:bg-white transition-all min-h-[44px]">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all shadow-sm">
                    <Mail size={20} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5 font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>Email</div>
                    <div className="text-[#0a1628] font-semibold text-sm">{EMAIL}</div>
                    <div className="text-muted-foreground text-xs">We respond within a few hours</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-3 sm:p-4 rounded-2xl border border-sky-100">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5 font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>Coverage</div>
                    <div className="text-[#0a1628] font-semibold text-sm">Kenya — All 47 Counties</div>
                    <div className="text-muted-foreground text-xs">Delivery rates available on request</div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-7 flex gap-3 flex-wrap">
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1877F2]/10 text-[#1877F2] text-xs font-bold hover:bg-[#1877F2]/20 transition-colors border border-[#1877F2]/20 min-h-[44px]">
                  <Facebook size={15} /> Facebook
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-50 text-[#E1306C] text-xs font-bold hover:bg-pink-100 transition-colors border border-pink-100 min-h-[44px]">
                  <Instagram size={15} /> Instagram
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-[#25D366] text-xs font-bold hover:bg-green-100 transition-colors border border-green-100 min-h-[44px]">
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white rounded-3xl border border-sky-100 shadow-xl p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
                  <Quote size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[#0a1628] font-bold text-lg leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" }}>
                    Send Us Your Enquiry
                  </h3>
                  <p className="text-muted-foreground text-xs mt-0.5">We typically respond within 2–4 hours</p>
                </div>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-[#0a1628] uppercase tracking-wider mb-1.5 font-bold">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. John Kamau"
                      className="w-full bg-[#f5faff] border border-sky-100 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40 min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#0a1628] uppercase tracking-wider mb-1.5 font-bold">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      placeholder="07XX XXX XXX"
                      className="w-full bg-[#f5faff] border border-sky-100 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40 min-h-[44px]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-[#0a1628] uppercase tracking-wider mb-1.5 font-bold">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-[#f5faff] border border-sky-100 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40 min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#0a1628] uppercase tracking-wider mb-1.5 font-bold">Product of Interest</label>
                  <select className="w-full bg-[#f5faff] border border-sky-100 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[44px]">
                    <option value="">Select a product...</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-[#0a1628] uppercase tracking-wider mb-1.5 font-bold">Project Details</label>
                  <textarea
                    rows={4}
                    placeholder="e.g. 3-bedroom house in Nakuru, roof area approx. 80 m², prefer sky blue corrugated sheets..."
                    className="w-full bg-[#f5faff] border border-sky-100 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3.5 font-bold rounded-xl text-sm hover:bg-sky-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/25 active:scale-98 min-h-[44px]"
                >
                  Submit My Enquiry
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-muted-foreground text-[11px]">
                  Or WhatsApp us directly at{" "}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ FOOTER ═══ */}
      <footer className="bg-[#060f1e] border-t border-sky-900/40 pb-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

            {/* Brand col */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <svg viewBox="0 0 34 26" fill="none" className="w-7 h-6" aria-hidden="true">
                    <path d="M2 16 L17 3 L32 16" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 14 L6 24 L28 24 L28 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="14" y="17" width="6" height="7" rx="1.2" fill="white" opacity="0.95" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-black uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "17px" }}>Summit Mabati</div>
                  <div className="text-sky-400 text-[9px] uppercase tracking-[0.28em] font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>Factory · Kenya</div>
                </div>
              </div>
              <p className="text-sky-200/60 text-sm leading-relaxed mb-6 max-w-xs">
                Premium roofing sheets, stone-coated tiles, and accessories — manufactured and
                delivered across all 47 counties of Kenya. Where quality meets affordability.
              </p>
              <div className="space-y-2.5">
                <a href={`tel:${PHONE}`} className="flex items-center gap-3 text-sky-300 text-sm font-semibold hover:text-white transition-colors group">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Phone size={13} className="text-sky-400 group-hover:text-white" />
                  </div>
                  {PHONE_DISPLAY}
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sky-300/80 text-xs hover:text-white transition-colors group">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Mail size={12} className="text-sky-400 group-hover:text-white" />
                  </div>
                  {EMAIL}
                </a>
              </div>
              {/* Social icons */}
              <div className="flex gap-3 mt-5">
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#1877F2]/15 border border-[#1877F2]/20 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all"
                  aria-label="Facebook">
                  <Facebook size={16} />
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-pink-500/15 border border-pink-500/20 flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-all"
                  aria-label="Instagram">
                  <Instagram size={16} />
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-green-500/15 border border-green-500/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                  aria-label="WhatsApp">
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>

            {/* Products */}
            <div className="lg:col-span-3">
              <div className="text-white text-xs font-bold uppercase tracking-widest mb-5" style={{ fontFamily: "'DM Mono', monospace" }}>Products</div>
              <ul className="space-y-2.5">
                {PRODUCTS.slice(0, 7).map((p) => (
                  <li key={p.name}>
                    <button onClick={() => scrollTo("#products")} className="text-sky-200/65 text-sm hover:text-sky-300 transition-colors text-left flex items-center gap-2 group min-h-[44px]">
                      <ChevronRight size={11} className="text-sky-600 group-hover:text-sky-400 transition-colors" />
                      {p.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-2">
              <div className="text-white text-xs font-bold uppercase tracking-widest mb-5" style={{ fontFamily: "'DM Mono', monospace" }}>Navigate</div>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <button onClick={() => scrollTo(link.href)} className="text-sky-200/65 text-sm hover:text-sky-300 transition-colors text-left flex items-center gap-2 group min-h-[44px]">
                      <ChevronRight size={11} className="text-sky-600 group-hover:text-sky-400 transition-colors" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact CTA */}
            <div className="lg:col-span-3">
              <div className="text-white text-xs font-bold uppercase tracking-widest mb-5" style={{ fontFamily: "'DM Mono', monospace" }}>Quick Contact</div>
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5 space-y-3">
                <p className="text-sky-200/80 text-xs leading-relaxed">Need a quote or have a question? Reach us instantly on WhatsApp.</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#1ebe5d] transition-colors shadow-md min-h-[44px]">
                  <MessageCircle size={15} /> Chat on WhatsApp
                </a>
                <a href={`tel:${PHONE}`}
                  className="flex items-center justify-center gap-2 w-full border border-sky-500/40 text-sky-300 py-2.5 rounded-xl text-sm font-semibold hover:bg-sky-500/10 transition-colors min-h-[44px]">
                  <Phone size={14} /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-sky-900/40 pt-7 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-sky-200/40 text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>
              © {new Date().getFullYear()} Summit Mabati Factory. All rights reserved.
            </div>
            <div
              className="text-sky-500 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              ✦ Where Quality Meets Affordability ✦
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════ FLOATING WHATSAPP ═══ */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip bubble */}
        <div
          className={`hidden sm:block bg-white text-[#0a1628] text-xs font-semibold px-4 py-2 rounded-full shadow-xl border border-green-100 transition-all duration-500 whitespace-nowrap ${
            whatsappPing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          💬 Chat with us on WhatsApp!
        </div>

        {/* Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative w-[52px] h-[52px] sm:w-14 sm:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:bg-[#1ebe5d] hover:scale-110 active:scale-95 transition-all"
        >
          <MessageCircle size={26} className="text-white" />
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        </a>
      </div>
    </div>
  );
}
