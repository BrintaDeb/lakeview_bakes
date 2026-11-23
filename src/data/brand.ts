import { BrandValue, Outlet, Testimonial } from "@/types";

export const BRAND_INFO = {
  name: "Lakeview Milk Bar",
  tagline: "Baking is our Love Language",
  taglineSecondary: "Since 1930 • Bangalore's Sweetest Tradition",
  establishedYear: 1930,
  founder: "James Meadow Charles",
  successor: "Vrajlal Jamnadas (Acquired 1947)",
  quote: {
    author: "Anish Vakharia, Vrajlal’s grandson",
    text: "My grandfather was freshly out of college and was enamoured by ice creams. He bought Lakeview Milk Bar, the carts, and the recipes.",
  },
  centralOrderPhone: "9663812036",
  officialEmail: "support@lakeviewmilkbar.in",
  announcementBarText: "Order by Phone: (9663812036) | Shop Now",
};

export const BRAND_VALUES: BrandValue[] = [
  {
    title: "Fresh Ingredients",
    icon: "/assets/icons/icon-fresh-ingredients.png",
    original_file: "icon1.png",
    description: "Farm-fresh dairy, pure extracts, and hand-selected seasonal ingredients in every recipe.",
  },
  {
    title: "Family Recipes",
    icon: "/assets/icons/icon-family-recipes.png",
    original_file: "icon2.png",
    description: "Handcrafted recipes perfected across three generations since 1930.",
  },
  {
    title: "Affordable Pricing",
    icon: "/assets/icons/icon-affordable-pricing.png",
    original_file: "icon3.png",
    description: "Honest, fair pricing for authentic artisanal indulgence accessible to all Bangaloreans.",
  },
  {
    title: "Commitment to Quality",
    icon: "/assets/icons/icon-commitment-quality.png",
    original_file: "icon4.png",
    description: "Rigorous taste testing, hygienic kitchen facilities, and uncompromising craftsmanship.",
  },
  {
    title: "Family-run Business",
    icon: "/assets/icons/icon-family-business.png",
    original_file: "icon-5.png",
    description: "Proudly independent and family-operated with personal love poured into every creation.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    reviewer_name: "Lavanya Vivek",
    rating: 5,
    review_text:
      "Lakeview has been baking cakes for me sinces decades , and the cakes only gets better with designs and taste! Hastle free baker in town,she makes my every occasion better n grander ! Wish you all the best and nothin but the best ! 😘🤗😘",
    image: "/assets/testimonials/testimonial-lavanya.png",
  },
  {
    reviewer_name: "Ambareen Nazim",
    rating: 5,
    review_text:
      "Lakeview be it cakes or ice creams one of the oldest and best! Me and My entire family just love Lakeview! The most yummicious and most delicious cakes customised to any design and shape!",
    image: "/assets/testimonials/testimonial-ambareen.png",
  },
  {
    reviewer_name: "Shilpa & Gaurav",
    rating: 5,
    review_text:
      "We have been having Lakeviews’s cakes for almost 15 years now. Her cake designs and  taste has only got better and better. And trust me it was very good the first time we had it itself. Their prices justify the quality she delivers and she has never disappointed us in over 100 cakes we would have taken from them.. we thank you Lakeview for being a part of our every celebration by bringing more sweetness in our lives.. hugs & kisses 🤗😘",
    image: "/assets/testimonials/testimonial-shilpa-gaurav.png",
  },
];

export const OUTLETS: Outlet[] = [
  {
    id: "mg-road",
    name: "Lakeview Milk Bar | MG Road Flagship",
    address:
      "Kannan Building, 89, Mahatma Gandhi Rd, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka - 560001",
    phone: "9663812036",
    google_maps_query: "Lakeview Milk Bar MG Road Bengaluru",
    established_year: 1970,
    significance: "Iconic flagship location, pioneer of Bangalore drive-in dessert culture",
    timings: "9:00 AM – 12:30 AM (All Days)",
    image: "/assets/outlets/outlet-mg-road.jpg",
  },
  {
    id: "indiranagar",
    name: "Lakeview Milk Bar | Indiranagar",
    address:
      "No. 3161 Link Road 4, Near to E S I Hospital, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka - 560008",
    phone: "+91 8025200443",
    google_maps_query: "Lakeview Milk Bar Indiranagar Bengaluru",
    established_year: 2019,
    significance: "Bustling neighborhood cafe with full bakery & dessert counter",
    timings: "10:00 AM – 11:30 PM (All Days)",
    image: "/assets/outlets/outlet-indiranagar.jpg",
  },
  {
    id: "kalyan-nagar",
    name: "Lakeview Milk Bar | Kalyan Nagar",
    address:
      "3rd A Cross Rd, HRBR Layout 1st Block, HRBR Layout, Banaswadi, Bengaluru, Karnataka - 560043",
    phone: "+91 9972635636",
    google_maps_query: "Lakeview Milk Bar Kalyan Nagar Bengaluru",
    established_year: 2018,
    significance: "North Bangalore's go-to destination for artisanal custom cakes",
    timings: "10:00 AM – 11:00 PM (All Days)",
    image: "/assets/outlets/outlet-kalyan-nagar.jpg",
  },
  {
    id: "whitefield",
    name: "Lakeview Milk Bar | Whitefield",
    address:
      "273, Whitefield Main Rd, Dodsworth Layout, Whitefield, Bengaluru, Karnataka - 560066",
    phone: "+91 8025200443",
    google_maps_query: "Lakeview Milk Bar Whitefield Bengaluru",
    established_year: 2021,
    significance: "Serving the vibrant tech community with fresh bakes and signature sundaes",
    timings: "10:00 AM – 11:30 PM (All Days)",
    image: "/assets/outlets/outlet-whitefield.jpg",
  },
];

export const ARCHIVE_ARTICLES = [
  {
    title: "Bangalore's First Ice Cream Parlour",
    date: "May 1978",
    src: "/assets/heritage/May_-1978-Article.jpg",
    snippet: "Historic press coverage detailing the beloved Ulsoor Lake beginnings and MG Road popularity.",
  },
  {
    title: "Original 1947 Acquisition Deed",
    date: "1947",
    src: "/assets/heritage/Lakeview-1947-Sale-Agreement.jpg",
    snippet: "Handwritten historic bill of sale transferring Lakeview Milk Bar to Vrajlal Jamnadas.",
  },
  {
    title: "City Chronicle Feature",
    date: "July 1999",
    src: "/assets/heritage/July1999.jpg",
    snippet: "Preserving British-era churned recipes and late night family gatherings.",
  },
  {
    title: "Legacy of Sweet Memories",
    date: "October 2003",
    src: "/assets/heritage/October_-2003-Article.jpg",
    snippet: "Celebrating seven decades of Lakeview Milk Bar as a Bengaluru cultural landmark.",
  },
  {
    title: "The Sunday Herald Retrospective",
    date: "October 2006",
    src: "/assets/heritage/October-2006.jpg",
    snippet: "Profiles on Vrajlal Jamnadas and the transition from lake carts to MG Road institution.",
  },
  {
    title: "Flavours of Old Bangalore",
    date: "August 2007",
    src: "/assets/heritage/2007-August.jpg",
    snippet: "Documenting the original three flavors and signature sundaes.",
  },
  {
    title: "Bangalore Mirror Dining Feature",
    date: "April 2009",
    src: "/assets/heritage/2009-April.jpg",
    snippet: "Spotlight on Lakeview's bespoke cake artistry and timeless hot chocolate fudge.",
  },
  {
    title: "Heritage Trail Column",
    date: "February 2011",
    src: "/assets/heritage/February_-2011-Article.jpg",
    snippet: "A warm look into Bangalore's drive-in ice cream culture under the stars.",
  },
  {
    title: "The Hindu MetroPlus Review",
    date: "February 2014",
    src: "/assets/heritage/February_-2014-Article.jpg",
    snippet: "From generation to generation: Why Lakeview Milk Bar remains irreplaceable.",
  },
  {
    title: "Deccan Chronicle Anniversary Special",
    date: "January 2015",
    src: "/assets/heritage/January_-2015-Article.jpg",
    snippet: "85 years of artisanal baking and ice cream passion in Bengaluru.",
  },
];

export const HISTORY_TIMELINE = [
  {
    year: "1930",
    title: "The Conception of a Dream",
    description:
      "The story began with James Meadow Charles, an Englishman living in British-era Bangalore, who owned an ice cream parlour overlooking Ulsoor Lake. Inspired by the scenic beauty of the waterbody, he named it ‘Lakeview Milk Bar’. Families, friends, and lovers all fancied quality time with a bowl of ice cream. Charles sold three ice cream flavours at its inception - vanilla, chocolate, and strawberry.",
  },
  {
    year: "1947",
    title: "A Cornerstone in the Making",
    description:
      "Charles decided to move back to England when India was at the cusp of independence and sold his business to an aspiring young businessman – a 19-year-old Vrajlal Jamnadas. An avid ice cream enthusiast, Vrajlal ventured to California to perfect his craft under the tutelage of some of the most renowned ice cream makers. Upon his return, he introduced a range of classic ice cream flavours, which quickly became the talk of the town and garnered much praise.",
  },
  {
    year: "1950",
    title: "Sundaes Are Not Just For Sundays",
    description:
      "Lakeview Milk Bar began a drive-in ice cream parlour to satiate the cravings of eager customers on the go. The drive-in soon burgeoned into the quintessential Lakeview Milk Bar experience we know and love today.",
  },
  {
    year: "1970",
    title: "Parlour of the Midnight Road",
    description:
      "In the early 1970s, Lakeview Milk Bar set up shop in the heart of the city at MG Road. By then, it had become a household name, serving nearly 700 customers daily. Lakeview Milk Bar soon became synonymous with the late-night drive-in culture of Bangalore and cemented itself as a classic ice cream parlour.",
  },
  {
    year: "1980",
    title: "Turning a New Leaf",
    description:
      "Lakeview Milk Bar expanded its food menu to feature continental breakfasts and freshly made snacks. Naturally, this exciting development attracted a growing community of old and new customers eager to try the latest food trends.",
  },
  {
    year: "1993",
    title: "Expanding the Vision",
    description:
      "With a selection of freshly baked cakes, cookies, and pastries, Lakeview Milk Bar continued to rake in acclaim from locals, tourists, foreigners, and corporations. From its humble origins as a small ice cream parlour, Lakeview Milk Bar blossomed into a beloved destination for lovers of ice cream and nostalgia.",
  },
  {
    year: "2012 - Present",
    title: "Carrying the Legacy Forward",
    description:
      "Today, Lakeview Milk Bar offers a refined dining experience that pays tribute to the city's rich history. As one of the first eateries in the area to serve pizzas and burgers, Lakeview Milk Bar continues to retain its nostalgic charm. In recent years, Lakeview Milk Bar has expanded and opened branches at locations across Bangalore, such as Kalyan Nagar (2018), Indiranagar (2019), and Whitefield (2021).",
  },
];
