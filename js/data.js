/**
 * KAWIZZ PHOTOGRAPHY - DATA STORE
 * Curated high-resolution imagery, client albums, packages, and EXIF specifications.
 */

const KAWIZZ_DATA = {
  photographer: {
    name: "Kawizz Photography",
    tagline: "Capturing Fleeting Moments into Timeless Cinematic Art",
    bio: "Kawizz is an internationally published Sri Lankan visual artist and master wedding & editorial photographer. With over 8 years of experience framing authentic emotions, dramatic lighting, and ethereal landscapes across Sri Lanka and worldwide destinations.",
    location: "Colombo / Kandy / Galle, Sri Lanka",
    phone: "+94 77 404 5147",
    whatsapp: "94774045147",
    email: "inquiries@kawizzphotography.com",
    instagram: "@kawizz_photography",
    facebook: "Kawizz Photography Official",
    awards: [
      { year: "2025", title: "Asia Wedding Photographer of the Year", org: "International Wedding Guild" },
      { year: "2024", title: "Vogue Featured Portraiture", org: "Vogue Visuals" },
      { year: "2023", title: "National Geographic Traveler Feature", org: "NatGeo Wild & Culture" },
      { year: "2022", title: "Master of Light Silver Award", org: "Canon & Sony Masterclass" }
    ],
    stats: {
      weddingsCaptured: "250+",
      countriesTraveled: "14",
      awardsWon: "18",
      happyClients: "600+",
      photosDelivered: "120K+"
    }
  },

  // Curated High-Resolution Photos
  photos: [
    {
      id: "photo-kawizz-01",
      title: "Spotted Dove at Golden Twilight",
      category: "landscapes",
      thumbUrl: "images/kawizz_wildlife_dove.jpg",
      fullUrl: "images/kawizz_wildlife_dove.jpg",
      location: "Central Province, Sri Lanka",
      date: "2026-02-18",
      camera: "Sony Alpha 7R V",
      lens: "FE 200-600mm f/5.6-6.3 G OSS",
      focalLength: "400mm",
      aperture: "f/5.6",
      shutterSpeed: "1/800s",
      iso: "320",
      aspect: "portrait",
      description: "Spotted dove resting gracefully with exquisite feather definition against dreamy sunset forest bokeh.",
      tags: ["wildlife", "dove", "nature", "bokeh", "srilanka", "bird", "original"],
      likes: 842,
      clientAlbumId: null
    },
    {
      id: "photo-kawizz-02",
      title: "Emerald Aura Urban Portrait",
      category: "portraits",
      thumbUrl: "images/kawizz_portrait_cap.jpg",
      fullUrl: "images/kawizz_portrait_cap.jpg",
      location: "Kandy, Sri Lanka",
      date: "2026-02-15",
      camera: "Sony Alpha 7R V",
      lens: "Sony FE 85mm f/1.4 GM",
      focalLength: "85mm",
      aperture: "f/1.8",
      shutterSpeed: "1/1600s",
      iso: "100",
      aspect: "portrait",
      description: "Striking natural light portrait framed against vivid tropical green bokeh, emphasizing calm focus and effortless street style.",
      tags: ["portrait", "editorial", "streetwear", "kandy", "bokeh", "fashion", "original"],
      likes: 756,
      clientAlbumId: "album-urban-editorial"
    },
    {
      id: "photo-kawizz-03",
      title: "Sunlit Linen Lifestyle Story",
      category: "portraits",
      thumbUrl: "images/kawizz_street_lifestyle.jpg",
      fullUrl: "images/kawizz_street_lifestyle.jpg",
      location: "Southern Coast, Sri Lanka",
      date: "2026-02-10",
      camera: "Sony Alpha 1",
      lens: "Sony FE 50mm f/1.2 GM",
      focalLength: "50mm",
      aperture: "f/1.4",
      shutterSpeed: "1/2500s",
      iso: "80",
      aspect: "portrait",
      description: "Candid lifestyle portrait highlighting soft linen textures, natural shadows, and organic outdoor environment.",
      tags: ["portrait", "lifestyle", "fashion", "linen", "candid", "travel", "original"],
      likes: 694,
      clientAlbumId: "album-urban-editorial"
    },
    {
      id: "photo-01",
      title: "Ella Rock Mist & Tea Hills",
      category: "landscapes",
      thumbUrl: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80",
      fullUrl: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=2400&q=95",
      location: "Ella Central Highlands, Sri Lanka",
      date: "2025-11-14",
      camera: "Sony Alpha 7R V",
      lens: "Sony FE 24-70mm f/2.8 GM II",
      focalLength: "35mm",
      aperture: "f/8.0",
      shutterSpeed: "1/250s",
      iso: "100",
      aspect: "landscape",
      description: "Morning mountain mist rolling over endless emerald Ceylon tea terraces at dawn.",
      tags: ["landscape", "ella", "tea", "mountains", "nature", "srilanka"],
      likes: 542,
      clientAlbumId: "album-ceylon-wildlife"
    },
    {
      id: "photo-02",
      title: "Ceylon Leopard in Wild Canopy",
      category: "landscapes",
      thumbUrl: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=800&q=80",
      fullUrl: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=2400&q=95",
      location: "Yala National Park, Sri Lanka",
      date: "2025-12-08",
      camera: "Sony Alpha 1",
      lens: "Sony FE 200-600mm f/5.6-6.3 G OSS",
      focalLength: "500mm",
      aperture: "f/6.3",
      shutterSpeed: "1/1000s",
      iso: "400",
      aspect: "landscape",
      description: "Stealthy wild leopard resting on a massive tree bough in early morning light.",
      tags: ["wildlife", "leopard", "yala", "nature", "safari"],
      likes: 812,
      clientAlbumId: "album-ceylon-wildlife"
    },
    {
      id: "photo-03",
      title: "Historic Fort Colombo Sunset",
      category: "street",
      thumbUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      fullUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=95",
      location: "Fort, Colombo",
      date: "2026-01-20",
      camera: "Leica Q3",
      lens: "Summilux 28mm f/1.7 ASPH",
      focalLength: "28mm",
      aperture: "f/2.8",
      shutterSpeed: "1/400s",
      iso: "125",
      aspect: "landscape",
      description: "Dramatic sea spray and warm historic architecture framing twilight over the Indian Ocean.",
      tags: ["street", "colombo", "sunset", "ocean", "architecture"],
      likes: 428,
      clientAlbumId: null
    },
    {
      id: "photo-04",
      title: "Velvet Shadow Editorial",
      category: "portraits",
      thumbUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      fullUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2400&q=95",
      location: "Kawizz Private Studio, Colombo 07",
      date: "2026-01-15",
      camera: "Hasselblad X2D 100C",
      lens: "XCD 90mm f/2.5 V",
      focalLength: "90mm",
      aperture: "f/2.8",
      shutterSpeed: "1/250s",
      iso: "64",
      aspect: "portrait",
      description: "High-contrast chiaroscuro studio lighting capturing subtle textures and raw expression.",
      tags: ["portrait", "editorial", "studio", "fashion", "vogue"],
      likes: 689,
      clientAlbumId: "album-urban-editorial"
    },
    {
      id: "photo-05",
      title: "Misty Sunrise over Sigiriya Rock",
      category: "landscapes",
      thumbUrl: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
      fullUrl: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=2400&q=95",
      location: "Pidurangala, Sigiriya",
      date: "2025-10-05",
      camera: "Sony Alpha 7R V",
      lens: "Sony FE 16-35mm f/2.8 GM II",
      focalLength: "24mm",
      aperture: "f/8.0",
      shutterSpeed: "1/60s",
      iso: "100",
      aspect: "landscape",
      description: "First light illuminating the ancient fortress amidst a sea of tropical morning mist.",
      tags: ["landscape", "sigiriya", "srilanka", "sunrise", "nature"],
      likes: 890,
      clientAlbumId: null
    },
    {
      id: "photo-06",
      title: "Neo-Tokyo Night Lights in Pettah",
      category: "street",
      thumbUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      fullUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2400&q=95",
      location: "Pettah Market, Colombo",
      date: "2026-02-02",
      camera: "Leica Q3",
      lens: "Summilux 28mm f/1.7 ASPH",
      focalLength: "28mm",
      aperture: "f/1.7",
      shutterSpeed: "1/125s",
      iso: "800",
      aspect: "landscape",
      description: "Vibrant neon signs reflecting off rainy streets with the pulse of local Colombo nightlife.",
      tags: ["street", "night", "colombo", "pettah", "cinematic"],
      likes: 315,
      clientAlbumId: null
    },
    {
      id: "photo-07",
      title: "Amaya 21st Bohemian Gala",
      category: "events",
      thumbUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      fullUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2400&q=95",
      location: "Waters Edge, Battaramulla",
      date: "2026-02-12",
      camera: "Sony Alpha 1",
      lens: "Sony FE 24-70mm f/2.8 GM II",
      focalLength: "45mm",
      aperture: "f/2.8",
      shutterSpeed: "1/400s",
      iso: "1600",
      aspect: "landscape",
      description: "Sparkler confetti and radiant laughter celebrating Amaya's milestone birthday.",
      tags: ["events", "birthday", "party", "night", "luxury"],
      likes: 274,
      clientAlbumId: "album-amaya-birthday"
    },
    {
      id: "photo-08",
      title: "Monochrome Haute Couture",
      category: "portraits",
      thumbUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      fullUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=2400&q=95",
      location: "Colombo Design Week",
      date: "2026-01-28",
      camera: "Sony Alpha 7R V",
      lens: "Sony FE 85mm f/1.4 GM",
      focalLength: "85mm",
      aperture: "f/1.4",
      shutterSpeed: "1/1000s",
      iso: "100",
      aspect: "portrait",
      description: "Sculptural lighting accentuating masculine jawlines and structured tailor craft.",
      tags: ["portrait", "blackandwhite", "fashion", "model"],
      likes: 462,
      clientAlbumId: "album-urban-editorial"
    },
    {
      id: "photo-09",
      title: "Kandy Lake Solitude",
      category: "landscapes",
      thumbUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      fullUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=95",
      location: "Kandy, Sri Lanka",
      date: "2025-09-18",
      camera: "Sony Alpha 7R V",
      lens: "Sony FE 70-200mm f/2.8 GM OSS II",
      focalLength: "135mm",
      aperture: "f/4.0",
      shutterSpeed: "1/400s",
      iso: "100",
      aspect: "landscape",
      description: "Mirror reflections of ancient trees over serene twilight waters.",
      tags: ["landscape", "kandy", "reflection", "nature", "peaceful"],
      likes: 580,
      clientAlbumId: null
    },
    {
      id: "photo-10",
      title: "Galle Fort Ramparts Twilight",
      category: "landscapes",
      thumbUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      fullUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=95",
      location: "Galle Dutch Fort, Sri Lanka",
      date: "2026-02-14",
      camera: "Sony Alpha 7R V",
      lens: "Sony FE 16-35mm f/2.8 GM II",
      focalLength: "24mm",
      aperture: "f/8.0",
      shutterSpeed: "1/60s",
      iso: "100",
      aspect: "landscape",
      description: "Glowing ocean waves breaking against ancient colonial ramparts under violet twilight skies.",
      tags: ["landscape", "galle", "ocean", "sunset", "fortress"],
      likes: 620,
      clientAlbumId: "album-ceylon-wildlife"
    },
    {
      id: "photo-11",
      title: "Luxury Watch Commercial Craft",
      category: "commercial",
      thumbUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      fullUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2400&q=95",
      location: "Colombo Studio",
      date: "2026-02-05",
      camera: "Hasselblad X2D 100C",
      lens: "XCD 120mm f/3.5 Macro",
      focalLength: "120mm",
      aperture: "f/11",
      shutterSpeed: "1/160s",
      iso: "64",
      aspect: "landscape",
      description: "Macro focus stacking highlighting Swiss mechanical tourbillon gears and rose gold bezel.",
      tags: ["commercial", "product", "luxury", "macro", "watch"],
      likes: 388,
      clientAlbumId: null
    },
    {
      id: "photo-12",
      title: "Mirissa Ocean Surf Drift",
      category: "landscapes",
      thumbUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
      fullUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=2400&q=95",
      location: "Coconut Tree Hill, Mirissa",
      date: "2026-01-10",
      camera: "DJI Mavic 3 Pro",
      lens: "Hasselblad 24mm Eq.",
      focalLength: "24mm",
      aperture: "f/2.8",
      shutterSpeed: "1/1600s",
      iso: "100",
      aspect: "portrait",
      description: "Aerial turquoise waves crashing against the curved headland at midday.",
      tags: ["landscape", "drone", "mirissa", "ocean", "aerial"],
      likes: 712,
      clientAlbumId: null
    }
  ],

  // Private Client Albums for Delivery Hub
  clientAlbums: [
    {
      id: "album-ceylon-wildlife",
      title: "Wild Ceylon & Highlands Expedition",
      clientNames: "Ceylon Wild & NatGeo Expeditions",
      passcode: "1234",
      alternativePasscode: "wildlife2026",
      coverImage: "images/kawizz_wildlife_dove.jpg",
      eventDate: "February 18, 2026",
      location: "Central Highlands & Yala",
      package: "Nature & Wildlife Master Anthology",
      totalPhotos: 240,
      deliveredDate: "February 20, 2026",
      expiryDate: "February 20, 2028",
      samplePhotos: [
        "photo-kawizz-01", "photo-01", "photo-02", "photo-10", "photo-05"
      ]
    },
    {
      id: "album-amaya-birthday",
      title: "Amaya's 21st Bohemian Luxe Gala",
      clientNames: "Amaya Wickramasinghe",
      passcode: "amaya2026",
      alternativePasscode: "1234",
      coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
      eventDate: "February 12, 2026",
      location: "Waters Edge, Battaramulla",
      package: "Signature Event Coverage",
      totalPhotos: 185,
      deliveredDate: "February 16, 2026",
      expiryDate: "February 16, 2027",
      samplePhotos: [
        "photo-07"
      ]
    },
    {
      id: "album-urban-editorial",
      title: "Vogue Ceylon Fashion & Haute Couture",
      clientNames: "Vogue Ceylon Agency",
      passcode: "vogue2026",
      alternativePasscode: "1234",
      coverImage: "images/kawizz_portrait_cap.jpg",
      eventDate: "January 15, 2026",
      location: "Studio 07, Colombo",
      package: "Commercial Editorial Master",
      totalPhotos: 94,
      deliveredDate: "January 19, 2026",
      expiryDate: "January 19, 2027",
      samplePhotos: [
        "photo-kawizz-02", "photo-kawizz-03", "photo-04", "photo-08"
      ]
    }
  ],

  // Gear Bag
  gearBag: [
    {
      category: "Bodies",
      name: "Sony Alpha 7R V & Alpha 1",
      specs: "61MP Full-Frame BSI CMOS & 50.1MP 30fps Flagship Sensor",
      desc: "Our primary cameras ensuring razor-sharp details, ultra-wide dynamic range, and cinema-grade 8K video."
    },
    {
      category: "Prime Glass",
      name: "Sony G-Master 50mm f/1.2 & 85mm f/1.4",
      specs: "Ultra-fast prime lenses with creamy bokeh & extreme low-light clarity",
      desc: "Used for dreamy bridal portraits and intimate candid expressions."
    },
    {
      category: "Zooms",
      name: "Sony GM 24-70mm f/2.8 II & 70-200mm f/2.8 OSS II",
      specs: "Weather-sealed fast telephoto and standard range lenses",
      desc: "Capturing wedding processions, fast-moving dance floors, and faraway emotional vows."
    },
    {
      category: "Aerial",
      name: "DJI Mavic 3 Pro Cine (Triple-Camera)",
      specs: "Hasselblad 4/3 CMOS 5.1K Apple ProRes Drone",
      desc: "Sweeping cinematic aerials over Sri Lankan beaches, tea estates, and luxury resort venues."
    },
    {
      category: "Lighting",
      name: "Profoto B10X Plus & A10 AirTTL Lights",
      specs: "500Ws battery location strobes with softboxes & beauty dishes",
      desc: "Studio-quality light on location anywhere—even amidst heavy rain or midday sun."
    },
    {
      category: "Processing",
      name: "Color Calibrated Apple M3 Max Studio Rig",
      specs: "EIZO ColorEdge 4K Monitor with ProPhoto RGB Color Grading",
      desc: "Every single delivery is individually retouched and skin-toned with museum-grade precision."
    }
  ],

  // Packages & Pricing
  packages: [
    {
      id: "pkg-wedding-gold",
      title: "Silver Harmony",
      category: "Wedding",
      priceLKR: "185,000",
      priceUSD: "$650",
      duration: "1 Day (8 Hours Coverage)",
      popular: false,
      features: [
        "Lead Photographer (Kawizz) + 1 Assistant",
        "250+ Color-graded High-Res Digital Photos",
        "Private Online Client Gallery (1 Year Cloud Storage)",
        "Instant Full-Resolution Download Portal",
        "12x24 inch Luxury Fine-Art Coffee Table Book (30 pages)",
        "Pre-wedding Consultation & Timeline Planning"
      ]
    },
    {
      id: "pkg-wedding-royal",
      title: "Royal Heritage Elite",
      category: "Wedding (Most Popular)",
      priceLKR: "320,000",
      priceUSD: "$1,100",
      duration: "Full Day (Poruwa + Reception + Homecoming)",
      popular: true,
      badge: "Most Loved by Couples",
      features: [
        "Kawizz + 2 Senior Associate Photographers",
        "4K Drone Aerial Cinematic Highlights",
        "500+ Retouched Master Digital Images",
        "High-Speed Same-Day 15-Photo Sneak Peek for Social Media",
        "12x30 inch Leather-bound Flush-Mount Album (50 pages)",
        "Two 8x12 inch Parents Commemorative Albums",
        "Custom Crystal USB Gift Box + VIP Client Portal Access",
        "Pre-Shoot or Post-Shoot 3-Hour Session Included"
      ]
    },
    {
      id: "pkg-portrait-luxe",
      title: "Vogue Portrait Session",
      category: "Portrait / Fashion",
      priceLKR: "65,000",
      priceUSD: "$220",
      duration: "2-3 Hours Studio or Outdoor Location",
      popular: false,
      features: [
        "1-on-1 Creative Direction by Kawizz",
        "3 Outfit Changes / Mood Lighting Setups",
        "30 High-End Retouched Magazine-Ready Photos",
        "Full Commercial Usage & Print Rights",
        "Instant Cloud Download Delivery within 48 Hours",
        "Moodboard & Wardrobe Styling Guidance"
      ]
    },
    {
      id: "pkg-commercial-brand",
      title: "Brand & Commercial Master",
      category: "Commercial / Events",
      priceLKR: "140,000",
      priceUSD: "$480",
      duration: "Full Event or Product Campaign Day",
      popular: false,
      features: [
        "Commercial Licensing for Global Campaigns",
        "High-Speed Tethered Shooting with Live Monitor Review",
        "Color-accurate Product & Lifestyle Imagery",
        "Fast 72-Hour Turnaround Time",
        "Batch Full-Res Export with TIFF & JPEG formats"
      ]
    }
  ],

  // Client Testimonials
  testimonials: [
    {
      name: "Kasun & Sanduni Ranasinghe",
      location: "Colombo / Sydney",
      event: "Grand Wedding at Cinnamon Grand",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      text: "Kawizz made our wedding feel like a high-budget romantic movie. His calm energy, incredible eye for golden light, and the speed at which we received our client download portal blew everyone away! 100% recommended."
    },
    {
      name: "Dr. Ryan & Amaya Perera",
      location: "Kandy",
      event: "Destination Heritage Wedding",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      text: "From the aerial drone angles over Kandy hills to the intimate family moments at the Poruwa, Kawizz captured tears and laughter we didn't even notice happening. Truly world-class photography!"
    },
    {
      name: "Nadeesha Fernando (Marketing Lead)",
      location: "Vogue Ceylon Fashion",
      event: "Commercial Campaign",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
      text: "Our brand images look incredible on international billboards. The color science, skin tones, and swift delivery via the Kawizz Client Portal made our campaign launch effortless."
    }
  ],

  // FAQs
  faqs: [
    {
      q: "How fast do we receive our wedding and portrait photos?",
      a: "We deliver an exclusive 15-20 photo 'Sneak Peek' within 48 hours for you to share on social media. The complete fully-edited high-resolution gallery is uploaded to your private Client Portal within 2 to 3 weeks."
    },
    {
      q: "How does the Client Download Portal work?",
      a: "Each client receives a private passcode (e.g. your wedding code). Once entered in the portal, you and your loved ones can view all high-res photos, select favorites, and download individual photos or the entire batch in full print resolution with a single click."
    },
    {
      q: "Do you travel across Sri Lanka and internationally?",
      a: "Yes! While based in Colombo, Kandy, and Galle, Kawizz regularly covers destination weddings in Ella, Sigiriya, Nuwara Eliya, Jaffna, as well as Dubai, Maldives, Australia, and the UK."
    },
    {
      q: "How do we secure our date?",
      a: "We take a 30% advance deposit along with a signed photography agreement to lock in your date exclusively. You can use our Contact & Booking form to check availability instantly."
    }
  ]
};
