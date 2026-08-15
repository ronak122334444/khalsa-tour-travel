"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);

const WHATSAPP_NUMBER = "919876678175";

const whatsappLink =
  "https://wa.me/919876678175?text=Hello%20Khalsa%20Tour%20%26%20Travel%2C%20I%20want%20to%20book%20a%20cab.";

const slides = [
  {
    image: "/images/cab-main.png",
    title: "Travel Anywhere in India",
    subtitle:
      "Comfortable, reliable and premium cab services for your journey.",
  },
  {
    image: "/images/ertiga.png",
    title: "Premium 7 Seater",
    subtitle:
      "Spacious and comfortable rides for family and group travel.",
  },
  {
    image: "/images/traveller.png",
    title: "Group Travel Made Easy",
    subtitle:
      "12 & 18 seater Tempo Traveller services available.",
  },
  {
    image: "/images/cab-front.png",
    title: "Safe. Reliable. Comfortable.",
    subtitle:
      "Your trusted travel partner from Amritsar to All India.",
  },
];

const services = [
  {
    title: "LOCAL CAB",
    text: "Comfortable cabs for local city travel and daily requirements.",
  },
  {
    title: "OUTSTATION TRIPS",
    text: "Travel from Amritsar to destinations across India.",
  },
  {
    title: "AIRPORT TRANSFERS",
    text: "Reliable pickup and drop services for airports.",
  },
  {
    title: "GROUP TRAVEL",
    text: "Perfect transportation for families and large groups.",
  },
  {
    title: "TOUR PACKAGES",
    text: "Comfortable vehicles for complete tour requirements.",
  },
  {
    title: "HOTEL TRANSFERS",
    text: "Convenient pickup and drop from hotels and destinations.",
  },
];

const fleet = [
  {
    image: "/images/cab-front.png",
    title: "Premium Cab",
    text:
      "Clean, comfortable and reliable cab service for local and outstation journeys.",
    badge: "ALL INDIA",
    features: ["AC", "Comfortable", "Safe"],
  },
  {
    image: "/images/ertiga.png",
    title: "Premium Ertiga",
    text:
      "Spacious 7-seater vehicle, perfect for families and comfortable long-distance travel.",
    badge: "7 SEATER",
    features: ["7 Seater", "AC", "Spacious"],
  },
  {
    image: "/images/traveller.png",
    title: "Tempo Traveller",
    text:
      "Spacious travel solution for family trips, tours and large groups.",
    badge: "12 & 18 SEATER",
    features: ["12 Seater", "18 Seater", "AC"],
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [passengers, setPassengers] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  async function handleBooking(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const { error: supabaseError } = await supabase
        .from("bookings")
        .insert([
          {
            name: name.trim(),
            mobile: mobile.trim(),
            pickup: pickup.trim(),
            destination: destination.trim(),
            travel_date: date,
            vehicle: vehicle,
            passengers: Number(passengers),
          },
        ]);

      if (supabaseError) {
        console.error("SUPABASE ERROR:", supabaseError);

        setError(
          `Booking save nahi hui: ${supabaseError.message}`
        );

        setLoading(false);
        return;
      }

      const message = `
Hello Khalsa Tour & Travel,

I want to book a vehicle.

Name: ${name}
Mobile: ${mobile}
Pickup Location: ${pickup}
Destination: ${destination}
Travel Date: ${date}
Vehicle: ${vehicle}
Passengers: ${passengers}

Please confirm availability and fare.

Thank you.
`;

      const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=` +
        encodeURIComponent(message);

      setSuccess(
        "Booking successfully submitted! WhatsApp is opening..."
      );

      window.open(whatsappURL, "_blank");

      setName("");
      setMobile("");
      setPickup("");
      setDestination("");
      setDate("");
      setVehicle("");
      setPassengers("");
    } catch (err) {
      console.error("UNEXPECTED ERROR:", err);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* =====================================================
          SEO STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",

            name: "Khalsa Tour & Travel",

            description:
              "Khalsa Tour & Travel provides reliable cab, taxi, airport transfer, outstation and Tempo Traveller services from Amritsar across India.",

            url:
              "https://khalsa-tour-travel-hzkx.vercel.app",

            telephone: "+91-9876678175",

            image:
              "https://khalsa-tour-travel-hzkx.vercel.app/images/logo.png",

            priceRange: "₹₹",

            areaServed: [
              {
                "@type": "City",
                name: "Amritsar",
              },
              {
                "@type": "State",
                name: "Punjab",
              },
              {
                "@type": "Country",
                name: "India",
              },
            ],

            serviceType: [
              "Cab Service",
              "Taxi Service",
              "Airport Transfer",
              "Outstation Cab Service",
              "Tempo Traveller Service",
              "7 Seater Cab Service",
            ],
          }),
        }}
      />

      <main className="min-h-screen bg-[#050505] text-white">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="fixed left-0 right-0 top-0 z-50 border-b border-yellow-500/20 bg-black/90 backdrop-blur-xl">

          <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-3 sm:h-20 sm:px-6">

            {/* LOGO */}

            <a
              href="#home"
              onClick={closeMenu}
              className="flex shrink-0 items-center"
            >
              <img
                src="/images/logo.png"
                alt="Khalsa Tour & Travel"
                className="h-12 w-12 rounded-full object-cover sm:h-16 sm:w-16"
              />
            </a>

            {/* DESKTOP NAV */}

            <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">

              <a
                href="#home"
                className="transition hover:text-yellow-400"
              >
                Home
              </a>

              <a
                href="#services"
                className="transition hover:text-yellow-400"
              >
                Services
              </a>

              <a
                href="#fleet"
                className="transition hover:text-yellow-400"
              >
                Our Fleet
              </a>

              <a
                href="#about"
                className="transition hover:text-yellow-400"
              >
                About
              </a>

              <a
                href="#booking"
                className="transition hover:text-yellow-400"
              >
                Booking
              </a>

              <a
                href="#contact"
                className="transition hover:text-yellow-400"
              >
                Contact
              </a>

            </nav>

            {/* HEADER BUTTONS */}

            <div className="flex items-center gap-2">

              <a
                href="tel:9876678175"
                className="rounded-full border border-yellow-400 px-3 py-2 text-xs font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black sm:px-5 sm:text-sm"
              >
                Call Now
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full bg-yellow-500 px-4 py-2 text-xs font-bold text-black transition hover:bg-yellow-400 sm:block sm:text-sm"
              >
                WhatsApp
              </a>

              {/* MOBILE MENU */}

              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-400 text-yellow-400 md:hidden"
              >
                <span className="text-xl">
                  {menuOpen ? "×" : "☰"}
                </span>
              </button>

            </div>

          </div>

          {/* MOBILE MENU */}

          {menuOpen && (
            <div className="border-t border-yellow-500/20 bg-black px-5 py-4 md:hidden">

              <nav className="flex flex-col gap-1">

                {[
                  ["#home", "Home"],
                  ["#services", "Services"],
                  ["#fleet", "Our Fleet"],
                  ["#about", "About"],
                  ["#booking", "Booking"],
                  ["#contact", "Contact"],
                ].map(([href, text]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="rounded-xl px-4 py-3 font-semibold hover:bg-yellow-400 hover:text-black"
                  >
                    {text}
                  </a>
                ))}

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="mt-2 rounded-xl bg-yellow-500 px-4 py-3 text-center font-bold text-black"
                >
                  WhatsApp Booking
                </a>

              </nav>

            </div>
          )}

        </header>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section
          id="home"
          className="bg-black pt-[72px] md:pt-20"
        >

          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-14 md:px-6 md:py-16">

            <div className="max-w-3xl">

              <p className="mb-2 text-[10px] font-bold tracking-[0.22em] text-yellow-400 sm:mb-3 sm:text-sm">
                ALL INDIA CAB SERVICE
              </p>

              <h1 className="text-3xl font-black leading-[1.05] sm:text-5xl md:text-7xl">

                KHALSA

                <span className="block text-yellow-400">
                  TOUR & TRAVEL
                </span>

              </h1>

              <div className="mt-4 h-1 w-16 bg-yellow-400 sm:mt-5 sm:w-20 md:w-24" />

              <h2 className="mt-4 text-xl font-bold sm:text-3xl md:mt-8 md:text-5xl">
                {slides[current].title}
              </h2>

              <p className="mt-3 max-w-xl text-xs leading-5 text-gray-300 sm:text-base sm:leading-6 md:text-lg">
                {slides[current].subtitle}
              </p>

              {/* HERO BUTTONS */}

              <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">

                <a
                  href="#booking"
                  className="rounded-full bg-yellow-500 px-4 py-2.5 text-xs font-bold text-black transition hover:bg-yellow-400 sm:px-7 sm:py-3.5 sm:text-base"
                >
                  Book Your Cab
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-yellow-400 px-4 py-2.5 text-xs font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black sm:px-7 sm:py-3.5 sm:text-base"
                >
                  WhatsApp Us
                </a>

              </div>

              {/* STATS */}

              <div className="mt-5 flex gap-5 text-[10px] text-gray-300 sm:mt-8 sm:gap-8 sm:text-sm md:mt-10">

                <div>
                  <strong className="text-base text-yellow-400 sm:text-xl">
                    24/7
                  </strong>
                  <p>Service</p>
                </div>

                <div>
                  <strong className="text-base text-yellow-400 sm:text-xl">
                    All India
                  </strong>
                  <p>Travel</p>
                </div>

                <div>
                  <strong className="text-base text-yellow-400 sm:text-xl">
                    100%
                  </strong>
                  <p>Comfort</p>
                </div>

              </div>

            </div>

          </div>

          {/* IMAGE SLIDER */}

          <div className="relative w-full overflow-hidden bg-black">

            <div className="relative h-[300px] w-full sm:h-[430px] md:h-[550px]">

              {slides.map((slide, index) => (

                <div
                  key={slide.image}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === current
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >

                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-contain md:object-cover"
                  />

                </div>

              ))}

            </div>

            {/* SLIDER DOTS */}

            <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:bottom-6">

              {slides.map((_, index) => (

                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    index === current
                      ? "w-8 bg-yellow-400"
                      : "w-2 bg-white/50"
                  }`}
                />

              ))}

            </div>

          </div>

        </section>

        {/* =====================================================
            SERVICES
        ===================================================== */}

        <section
          id="services"
          className="bg-[#080808] px-5 py-20 md:px-6 md:py-24"
        >

          <div className="mx-auto max-w-7xl">

            <div className="mb-12 text-center">

              <p className="text-xs font-bold tracking-[0.3em] text-yellow-400">
                WHAT WE PROVIDE
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-5xl">
                Our Travel Services
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                Reliable transportation solutions for local trips,
                outstation journeys and group travel.
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-3">

              {services.map((service) => (

                <div
                  key={service.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:-translate-y-2 hover:border-yellow-400/50"
                >

                  <div className="mb-5 h-1 w-12 bg-yellow-400 transition-all group-hover:w-20" />

                  <h3 className="text-xl font-bold text-yellow-400">
                    {service.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-400">
                    {service.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* =====================================================
            FLEET
        ===================================================== */}

        <section
          id="fleet"
          className="bg-[#050505] px-5 py-20 md:px-6 md:py-24"
        >

          <div className="mx-auto max-w-7xl">

            <div className="mb-12 text-center">

              <p className="text-xs font-bold tracking-[0.3em] text-yellow-400">
                OUR FLEET
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-5xl">
                Choose Your Perfect Ride
              </h2>

            </div>

            <div className="grid gap-6 md:grid-cols-3">

              {fleet.map((car) => (

                <div
                  key={car.title}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-2 hover:border-yellow-400/50"
                >

                  <div className="relative flex h-64 items-center justify-center overflow-hidden bg-black md:h-72">

                    <img
                      src={car.image}
                      alt={car.title}
                      className="h-full w-full object-contain transition duration-700 group-hover:scale-105"
                    />

                    <span className="absolute bottom-4 left-4 rounded-full bg-yellow-400 px-4 py-2 text-xs font-black text-black">
                      {car.badge}
                    </span>

                  </div>

                  <div className="p-6">

                    <h3 className="text-2xl font-bold text-yellow-400">
                      {car.title}
                    </h3>

                    <p className="mt-3 leading-7 text-gray-400">
                      {car.text}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">

                      {car.features.map((feature) => (

                        <span
                          key={feature}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                        >
                          {feature}
                        </span>

                      ))}

                    </div>

                    <a
                      href="#booking"
                      className="mt-5 inline-block rounded-full border border-yellow-400 px-5 py-2 text-sm font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                    >
                      Book This Vehicle
                    </a>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* =====================================================
            BOOKING
        ===================================================== */}

        <section
          id="booking"
          className="bg-[#080808] px-5 py-20 md:px-6 md:py-24"
        >

          <div className="mx-auto max-w-5xl">

            <div className="mb-12 text-center">

              <p className="text-xs font-bold tracking-[0.3em] text-yellow-400">
                ONLINE BOOKING
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-5xl">
                Book Your Cab
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-gray-400">
                Fill in your travel details and send your booking
                request directly on WhatsApp.
              </p>

            </div>

            <form
              onSubmit={handleBooking}
              className="rounded-3xl border border-yellow-400/20 bg-white/[0.03] p-5 md:p-10"
            >

              <div className="grid gap-5 md:grid-cols-2">

                {/* NAME */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Your Name
                  </label>

                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none placeholder:text-gray-600 focus:border-yellow-400"
                  />

                </div>

                {/* MOBILE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter 10 digit mobile number"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10 digit mobile number"
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none placeholder:text-gray-600 focus:border-yellow-400"
                  />

                </div>

                {/* PICKUP */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Pickup Location
                  </label>

                  <input
                    type="text"
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Example: Amritsar"
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none placeholder:text-gray-600 focus:border-yellow-400"
                  />

                </div>

                {/* DESTINATION */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Destination
                  </label>

                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Example: Delhi"
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none placeholder:text-gray-600 focus:border-yellow-400"
                  />

                </div>

                {/* DATE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Travel Date
                  </label>

                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none focus:border-yellow-400"
                  />

                </div>

                {/* VEHICLE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Vehicle Type
                  </label>

                  <select
                    required
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none focus:border-yellow-400"
                  >

                    <option value="">
                      Select Vehicle
                    </option>

                    <option value="Premium Cab">
                      Premium Cab
                    </option>

                    <option value="Ertiga 7 Seater">
                      Ertiga 7 Seater
                    </option>

                    <option value="Tempo Traveller 12 Seater">
                      Tempo Traveller 12 Seater
                    </option>

                    <option value="Tempo Traveller 18 Seater">
                      Tempo Traveller 18 Seater
                    </option>

                  </select>

                </div>

                {/* PASSENGERS */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold">
                    Number of Passengers
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    placeholder="Enter number of passengers"
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none placeholder:text-gray-600 focus:border-yellow-400"
                  />

                </div>

              </div>

              {/* SUCCESS */}

              {success && (
                <div className="mt-5 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm font-semibold text-green-400">
                  {success}
                </div>
              )}

              {/* ERROR */}

              {error && (
                <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-400">
                  {error}
                </div>
              )}

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="mt-7 w-full rounded-xl bg-yellow-500 px-6 py-4 font-black text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Submitting Booking..."
                  : "Send Booking Request on WhatsApp"}
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                Your booking will be saved securely and opened in WhatsApp.
              </p>

            </form>

          </div>

        </section>

        {/* =====================================================
            ABOUT
        ===================================================== */}

        <section
          id="about"
          className="bg-yellow-500 px-5 py-16 text-black md:px-6 md:py-20"
        >

          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">

            <div>

              <p className="font-bold tracking-[0.25em]">
                WHY CHOOSE US
              </p>

              <h2 className="mt-3 text-4xl font-black md:text-5xl">
                Travel With Comfort
              </h2>

            </div>

            <div className="space-y-4 text-lg leading-8">

              <p>
                Khalsa Tour & Travel provides comfortable and reliable
                cab services from Amritsar to destinations across India.
              </p>

              <p>
                Whether it is a family trip, airport transfer,
                outstation journey or group tour, we are ready to serve you.
              </p>

              <div className="flex flex-wrap gap-3 pt-3">

                <a
                  href="tel:9876678175"
                  className="rounded-full bg-black px-7 py-3 font-bold text-yellow-400 transition hover:scale-105"
                >
                  Call Now
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-2 border-black px-7 py-3 font-bold transition hover:bg-black hover:text-yellow-400"
                >
                  WhatsApp
                </a>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            CONTACT
        ===================================================== */}

        <section
          id="contact"
          className="bg-[#070707] px-5 py-20 md:px-6 md:py-24"
        >

          <div className="mx-auto max-w-7xl">

            <div className="mb-12 text-center">

              <p className="text-xs font-bold tracking-[0.3em] text-yellow-400">
                CONTACT US
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-5xl">
                Get In Touch
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                Need a cab, airport transfer, outstation ride or
                Tempo Traveller? Contact us directly.
              </p>

            </div>

            <div className="grid gap-6 md:grid-cols-3">

              {/* CALL */}

              <a
                href="tel:9876678175"
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-2 hover:border-yellow-400"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-xs font-black text-black">
                  CALL
                </div>

                <p className="mt-6 text-sm text-gray-500">
                  Call For Booking
                </p>

                <p className="mt-1 text-2xl font-black text-yellow-400">
                  9876678175
                </p>

              </a>

              {/* WHATSAPP */}

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-2 hover:border-yellow-400"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-xs font-black text-black">
                  CHAT
                </div>

                <p className="mt-6 text-sm text-gray-500">
                  WhatsApp Booking
                </p>

                <p className="mt-1 text-2xl font-black text-white">
                  Chat With Us
                </p>

              </a>

              {/* LOCATION */}

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-xs font-black text-black">
                  INDIA
                </div>

                <p className="mt-6 text-sm text-gray-500">
                  Service Area
                </p>

                <p className="mt-1 text-xl font-black text-white">
                  Amritsar • Punjab
                </p>

                <p className="mt-2 text-sm text-yellow-400">
                  All India Travel
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="bg-yellow-500 px-5 py-16 text-black md:px-6 md:py-20">

          <div className="mx-auto max-w-5xl text-center">

            <p className="text-sm font-black tracking-[0.3em]">
              READY TO TRAVEL?
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-6xl">
              Your Journey Starts With Us
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg">
              Comfortable rides, reliable service and travel
              across India.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <a
                href="tel:9876678175"
                className="rounded-full bg-black px-8 py-4 font-bold text-yellow-400 transition hover:scale-105"
              >
                Call Now
              </a>

              <a
                href="#booking"
                className="rounded-full border-2 border-black px-8 py-4 font-bold transition hover:bg-black hover:text-yellow-400"
              >
                Book Online
              </a>

            </div>

          </div>

        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="border-t border-yellow-500/20 bg-black px-5 py-10 md:px-6">

          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">

            {/* BRAND */}

            <div>

              <img
                src="/images/logo.png"
                alt="Khalsa Tour & Travel"
                className="h-20 w-20 rounded-full object-cover"
              />

              <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
                Comfortable and reliable cab services from
                Amritsar to destinations across India.
              </p>

            </div>

            {/* LINKS */}

            <div>

              <h4 className="font-bold text-yellow-400">
                Quick Links
              </h4>

              <div className="mt-4 space-y-2 text-sm text-gray-400">

                <a
                  href="#home"
                  className="block hover:text-yellow-400"
                >
                  Home
                </a>

                <a
                  href="#services"
                  className="block hover:text-yellow-400"
                >
                  Services
                </a>

                <a
                  href="#fleet"
                  className="block hover:text-yellow-400"
                >
                  Our Fleet
                </a>

                <a
                  href="#booking"
                  className="block hover:text-yellow-400"
                >
                  Booking
                </a>

                <a
                  href="#contact"
                  className="block hover:text-yellow-400"
                >
                  Contact
                </a>

              </div>

            </div>

            {/* CONTACT */}

            <div>

              <h4 className="font-bold text-yellow-400">
                Contact
              </h4>

              <div className="mt-4 space-y-3 text-sm text-gray-400">

                <p>
                  Amritsar • Punjab • All India
                </p>

                <a
                  href="tel:9876678175"
                  className="block text-yellow-400 hover:text-yellow-300"
                >
                  9876678175
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-yellow-400"
                >
                  WhatsApp Booking
                </a>

              </div>

            </div>

          </div>

          <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-gray-600">
            © 2026 Khalsa Tour & Travel. All rights reserved.
          </div>

        </footer>

        {/* =====================================================
            FLOATING WHATSAPP
        ===================================================== */}

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-xs font-black text-black shadow-2xl transition hover:scale-110 hover:bg-yellow-300 md:bottom-6 md:right-6"
        >
          CHAT
        </a>

      </main>
    </>
  );
}