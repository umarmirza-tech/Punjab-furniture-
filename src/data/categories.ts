import { Category } from '../types';
import sofaImg from '../assets/images/product_luxury_sofa_1790252317348.jpg';
import bedImg from '../assets/images/product_wood_bed_1790252340716.jpg';
import diningImg from '../assets/images/product_wood_dining_1790252329249.jpg';
import showroomImg from '../assets/images/furniture_showroom_craft_1790252305357.jpg';

export const CATEGORIES: Category[] = [
  {
    id: 'sofas',
    name: 'Sofas',
    tagline: 'Living Room Comfort',
    description: 'Bespoke 3-seaters, modern L-shapes, recliners, and sectional couches tailored for family comfort.',
    image: sofaImg,
    itemCount: 18
  },
  {
    id: 'beds',
    name: 'Beds',
    tagline: 'Bedroom Sanctuaries',
    description: 'King and Queen solid wood beds with hydraulic storage, upholstered headboards, and timeless posture frames.',
    image: bedImg,
    itemCount: 14
  },
  {
    id: 'wardrobes',
    name: 'Wardrobes',
    tagline: 'Organized Storage',
    description: 'Spacious 2-door, 3-door, and sliding wooden almirahs built with modular shelves and internal lockers.',
    image: showroomImg,
    itemCount: 12
  },
  {
    id: 'dining-tables',
    name: 'Dining Tables',
    tagline: 'Gathering Spaces',
    description: 'Solid teak and sheesham 4-seater and 6-seater dining sets made for celebratory everyday meals.',
    image: diningImg,
    itemCount: 10
  },
  {
    id: 'chairs',
    name: 'Chairs',
    tagline: 'Accent & Dining Seating',
    description: 'Ergonomic lounge chairs, cushioned dining chairs, and crafted wooden armchairs with sturdy joinery.',
    image: diningImg,
    itemCount: 16
  },
  {
    id: 'tv-units',
    name: 'TV Units',
    tagline: 'Entertainment Consoles',
    description: 'Wall-mounted and free-standing media consoles with cable management and display cubbies.',
    image: showroomImg,
    itemCount: 8
  },
  {
    id: 'coffee-tables',
    name: 'Coffee Tables',
    tagline: 'Centerpieces',
    description: 'Geometric nesting tables, marble-top accents, and handcrafted wooden center tables with glass inserts.',
    image: sofaImg,
    itemCount: 11
  },
  {
    id: 'office-furniture',
    name: 'Office Furniture',
    tagline: 'Workspace Productivity',
    description: 'Executive desks, ergonomic mesh chairs, visitor armchairs, and multi-shelf filing cabinets.',
    image: showroomImg,
    itemCount: 9
  },
  {
    id: 'wooden-furniture',
    name: 'Wooden Furniture',
    tagline: 'Saharanpur Heritage Wood',
    description: 'Authentic solid Sheesham, Teak, and Mango wood masterpieces celebrating regional artisan craft.',
    image: showroomImg,
    itemCount: 22
  },
  {
    id: 'custom-furniture',
    name: 'Custom Furniture',
    tagline: 'Made to Your Measurements',
    description: 'Share your room blueprint, preferred wood stain, and fabric swatches for made-to-order manufacturing.',
    image: showroomImg,
    itemCount: 6
  }
];
