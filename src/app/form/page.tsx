"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, ArrowRight, Home, User, Settings, LogOut, ChevronRight, ChevronLeft, ChevronDown, Check, ChevronsUpDown, Info, CircleCheckBig } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

type State = {
  value: string;
  label: string;
}

type Country = {
  value: string;
  label: string;
  flag: string;
}

const countries: Country[] = [
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "ca", label: "Canada", flag: "🇨🇦" },
  { value: "gb", label: "United Kingdom", flag: "🇬🇧" },
  { value: "fr", label: "France", flag: "🇫🇷" },
  { value: "de", label: "Germany", flag: "🇩🇪" },
  { value: "it", label: "Italy", flag: "🇮🇹" },
  { value: "es", label: "Spain", flag: "🇪🇸" },
  { value: "au", label: "Australia", flag: "🇦🇺" },
  { value: "nz", label: "New Zealand", flag: "🇳🇿" },
  { value: "jp", label: "Japan", flag: "🇯🇵" },
  { value: "kr", label: "South Korea", flag: "🇰🇷" },
  { value: "in", label: "India", flag: "🇮🇳" },
  { value: "br", label: "Brazil", flag: "🇧🇷" },
  { value: "mx", label: "Mexico", flag: "🇲🇽" },
  { value: "za", label: "South Africa", flag: "🇿🇦" },
  { value: "cn", label: "China", flag: "🇨🇳" },
  { value: "ru", label: "Russia", flag: "🇷🇺" },
  { value: "sg", label: "Singapore", flag: "🇸🇬" },
  { value: "ae", label: "United Arab Emirates", flag: "🇦🇪" },
  { value: "se", label: "Sweden", flag: "🇸🇪" },
]

const statesByCountry: Record<string, State[]> = {
  us: [
    { value: "al", label: "Alabama" },
    { value: "ak", label: "Alaska" },
    { value: "az", label: "Arizona" },
    { value: "ar", label: "Arkansas" },
    { value: "ca", label: "California" },
    { value: "co", label: "Colorado" },
    { value: "ct", label: "Connecticut" },
    { value: "de", label: "Delaware" },
    { value: "fl", label: "Florida" },
    { value: "ga", label: "Georgia" },
    { value: "hi", label: "Hawaii" },
    { value: "id", label: "Idaho" },
    { value: "il", label: "Illinois" },
    { value: "in", label: "Indiana" },
    { value: "ia", label: "Iowa" },
    { value: "ks", label: "Kansas" },
    { value: "ky", label: "Kentucky" },
    { value: "la", label: "Louisiana" },
    { value: "me", label: "Maine" },
    { value: "md", label: "Maryland" },
    { value: "ma", label: "Massachusetts" },
    { value: "mi", label: "Michigan" },
    { value: "mn", label: "Minnesota" },
    { value: "ms", label: "Mississippi" },
    { value: "mo", label: "Missouri" },
    { value: "mt", label: "Montana" },
    { value: "ne", label: "Nebraska" },
    { value: "nv", label: "Nevada" },
    { value: "nh", label: "New Hampshire" },
    { value: "nj", label: "New Jersey" },
    { value: "nm", label: "New Mexico" },
    { value: "ny", label: "New York" },
    { value: "nc", label: "North Carolina" },
    { value: "nd", label: "North Dakota" },
    { value: "oh", label: "Ohio" },
    { value: "ok", label: "Oklahoma" },
    { value: "or", label: "Oregon" },
    { value: "pa", label: "Pennsylvania" },
    { value: "ri", label: "Rhode Island" },
    { value: "sc", label: "South Carolina" },
    { value: "sd", label: "South Dakota" },
    { value: "tn", label: "Tennessee" },
    { value: "tx", label: "Texas" },
    { value: "ut", label: "Utah" },
    { value: "vt", label: "Vermont" },
    { value: "va", label: "Virginia" },
    { value: "wa", label: "Washington" },
    { value: "wv", label: "West Virginia" },
    { value: "wi", label: "Wisconsin" },
    { value: "wy", label: "Wyoming" },
  ],
  ca: [
    { value: "ab", label: "Alberta" },
    { value: "bc", label: "British Columbia" },
    { value: "mb", label: "Manitoba" },
    { value: "nb", label: "New Brunswick" },
    { value: "nl", label: "Newfoundland and Labrador" },
    { value: "ns", label: "Nova Scotia" },
    { value: "nt", label: "Northwest Territories" },
    { value: "nu", label: "Nunavut" },
    { value: "on", label: "Ontario" },
    { value: "pe", label: "Prince Edward Island" },
    { value: "qc", label: "Quebec" },
    { value: "sk", label: "Saskatchewan" },
    { value: "yt", label: "Yukon" },
  ],
  gb: [
    { value: "eng", label: "England" },
    { value: "sco", label: "Scotland" },
    { value: "wal", label: "Wales" },
    { value: "nir", label: "Northern Ireland" },
  ],
  fr: [
    { value: "als", label: "Alsace" },
    { value: "aqu", label: "Aquitaine" },
    { value: "bfc", label: "Brittany" },
    { value: "bre", label: "Bretagne" },
    { value: "cvl", label: "Centre-Val de Loire" },
    { value: "cor", label: "Corse" },
    { value: "hdf", label: "Hauts-de-France" },
    { value: "idf", label: "Île-de-France" },
    { value: "lrm", label: "Lorraine" },
    { value: "mrt", label: "Martinique" },
    { value: "ncr", label: "Nouvelle-Aquitaine" },
    { value: "norm", label: "Normandy" },
    { value: "pdl", label: "Pays de la Loire" },
    { value: "pdc", label: "Picardie" },
    { value: "pro", label: "Provence-Alpes-Côte d'Azur" },
    { value: "qcn", label: "Île de France" },
    { value: "rhone", label: "Rhône-Alpes" },
  ],
  de: [
    { value: "bw", label: "Baden-Württemberg" },
    { value: "by", label: "Bayern" },
    { value: "be", label: "Berlin" },
    { value: "bb", label: "Brandenburg" },
    { value: "hb", label: "Bremen" },
    { value: "hh", label: "Hamburg" },
    { value: "he", label: "Hessen" },
    { value: "mv", label: "Mecklenburg-Vorpommern" },
    { value: "ni", label: "Niedersachsen" },
    { value: "nw", label: "Nordrhein-Westfalen" },
    { value: "rp", label: "Rheinland-Pfalz" },
    { value: "sl", label: "Saarland" },
    { value: "sn", label: "Sachsen" },
    { value: "st", label: "Sachsen-Anhalt" },
    { value: "sh", label: "Schleswig-Holstein" },
    { value: "th", label: "Thüringen" },
  ],
  it: [
    { value: "ab", label: "Abruzzo" },
    { value: "ba", label: "Basilicata" },
    { value: "be", label: "Benevento" },
    { value: "bl", label: "Bologna" },
    { value: "bn", label: "Bolzano" },
    { value: "bs", label: "Brescia" },
    { value: "br", label: "Brindisi" },
    { value: "ca", label: "Cagliari" },
    { value: "fi", label: "Firenze" },
    { value: "ge", label: "Genova" },
    { value: "go", label: "Gorizia" },
    { value: "la", label: "La Spezia" },
    { value: "lc", label: "Lecco" },
    { value: "lo", label: "Lodi" },
    { value: "lu", label: "Lucca" },
    { value: "mn", label: "Mantova" },
    { value: "ms", label: "Massa" },
    { value: "mt", label: "Matera" },
    { value: "na", label: "Napoli" },
    { value: "no", label: "Novara" },
    { value: "or", label: "Oristano" },
    { value: "pa", label: "Palermo" },
    { value: "pr", label: "Parma" },
    { value: "pv", label: "Pavia" },
    { value: "pg", label: "Perugia" },
    { value: "pu", label: "Pesaro" },
    { value: "pe", label: "Pescara" },
    { value: "pn", label: "Pisa" },
    { value: "po", label: "Prato" },
    { value: "rg", label: "Ragusa" },
    { value: "ra", label: "Ravenna" },
    { value: "rc", label: "Reggio Calabria" },
    { value: "re", label: "Reggio Emilia" },
    { value: "ri", label: "Rieti" },
    { value: "ro", label: "Roma" },
    { value: "sa", label: "Salerno" },
    { value: "si", label: "Siena" },
    { value: "sr", label: "Siracusa" },
    { value: "so", label: "Sondrio" },
    { value: "ta", label: "Taranto" },
    { value: "te", label: "Teramo" },
    { value: "tr", label: "Trento" },
    { value: "ts", label: "Trieste" },
    { value: "tv", label: "Treviso" },
    { value: "ud", label: "Udine" },
    { value: "va", label: "Varese" },
    { value: "ve", label: "Venezia" },
    { value: "vb", label: "Verbano-Cusio-Ossola" },
    { value: "vi", label: "Vicenza" },
    { value: "vr", label: "Verona" },
  ],
  es: [
    { value: "ba", label: "Badajoz" },
    { value: "ib", label: "Islas Baleares" },
    { value: "le", label: "León" },
    { value: "lo", label: "La Rioja" },
    { value: "ma", label: "Málaga" },
    { value: "mu", label: "Murcia" },
    { value: "na", label: "Navarra" },
    { value: "ou", label: "Ourense" },
    { value: "po", label: "Palencia" },
    { value: "sa", label: "Salamanca" },
    { value: "se", label: "Segovia" },
    { value: "so", label: "Soria" },
    { value: "ta", label: "Tarragona" },
    { value: "te", label: "Teruel" },
    { value: "to", label: "Toledo" },
    { value: "va", label: "Valencia" },
    { value: "za", label: "Zamora" },
  ],
  au: [
    { value: "ns", label: "New South Wales" },
    { value: "qld", label: "Queensland" },
    { value: "sa", label: "South Australia" },
    { value: "tas", label: "Tasmania" },
    { value: "vic", label: "Victoria" },
    { value: "wa", label: "Western Australia" },
  ],
  nz: [
    { value: "auk", label: "Auckland" },
    { value: "can", label: "Canterbury" },
    { value: "gis", label: "Gisborne" },
    { value: "hau", label: "Hawke's Bay" },
    { value: "man", label: "Manawatu-Wanganui" },
    { value: "nau", label: "Nelson" },
    { value: "ntl", label: "Northland" },
    { value: "ota", label: "Otago" },
    { value: "stl", label: "Southland" },
    { value: "tas", label: "Tasman" },
    { value: "tkl", label: "Taranaki" },
    { value: "wko", label: "Waikato" },
    { value: "wgn", label: "Wellington" },
    { value: "wtc", label: "West Coast" },
  ],
  jp: [
    { value: "ak", label: "Aomori" },
    { value: "hi", label: "Hiroshima" },
    { value: "hs", label: "Hokkaido" },
    { value: "ka", label: "Kanagawa" },
    { value: "ko", label: "Kochi" },
    { value: "ky", label: "Kyoto" },
    { value: "os", label: "Osaka" },
    { value: "sa", label: "Saitama" },
    { value: "si", label: "Shiga" },
    { value: "ta", label: "Tokyo" },
    { value: "to", label: "Tottori" },
    { value: "tu", label: "Toyama" },
    { value: "wu", label: "Wakayama" },
    { value: "ya", label: "Yamagata" },
    { value: "yn", label: "Yamanashi" },
  ],
  kr: [
    { value: "cb", label: "Chungcheongbuk-do" },
    { value: "cb", label: "Chungcheongnam-do" },
    { value: "gc", label: "Gyeonggi-do" },
    { value: "gn", label: "Gyeongsangbuk-do" },
    { value: "gn", label: "Gyeongsangnam-do" },
    { value: "jb", label: "Jeollabuk-do" },
    { value: "jb", label: "Jeollanam-do" },
    { value: "kj", label: "Jeju-do" },
    { value: "kg", label: "Sejong" },
    { value: "sl", label: "Seoul" },
    { value: "ud", label: "Ulsan" },
  ],
  in: [
    { value: "ap", label: "Andhra Pradesh" },
    { value: "ar", label: "Arunachal Pradesh" },
    { value: "as", label: "Assam" },
    { value: "br", label: "Bihar" },
    { value: "ct", label: "Chhattisgarh" },
    { value: "ga", label: "Goa" },
    { value: "gj", label: "Gujarat" },
    { value: "hr", label: "Haryana" },
    { value: "hp", label: "Himachal Pradesh" },
    { value: "jk", label: "Jammu and Kashmir" },
    { value: "ka", label: "Karnataka" },
    { value: "kl", label: "Kerala" },
    { value: "mp", label: "Madhya Pradesh" },
    { value: "mh", label: "Maharashtra" },
    { value: "mn", label: "Manipur" },
    { value: "ml", label: "Meghalaya" },
    { value: "mz", label: "Mizoram" },
    { value: "nl", label: "Nagaland" },
    { value: "or", label: "Odisha" },
    { value: "pb", label: "Punjab" },
    { value: "rj", label: "Rajasthan" },
    { value: "sk", label: "Sikkim" },
    { value: "tn", label: "Tamil Nadu" },
    { value: "tg", label: "Telangana" },
    { value: "tr", label: "Tripura" },
    { value: "up", label: "Uttar Pradesh" },
    { value: "ut", label: "Uttarakhand" },
    { value: "wb", label: "West Bengal" },
  ],
  br: [
    { value: "ac", label: "Acre" },
    { value: "al", label: "Alagoas" },
    { value: "am", label: "Amazonas" },
    { value: "ap", label: "Amapá" },
    { value: "ba", label: "Bahia" },
    { value: "ce", label: "Ceará" },
    { value: "df", label: "Distrito Federal" },
    { value: "es", label: "Espírito Santo" },
    { value: "go", label: "Goiás" },
    { value: "ma", label: "Maranhão" },
    { value: "mt", label: "Mato Grosso" },
    { value: "ms", label: "Mato Grosso do Sul" },
    { value: "mg", label: "Minas Gerais" },
    { value: "pa", label: "Pará" },
    { value: "pb", label: "Paraíba" },
    { value: "pr", label: "Paraná" },
    { value: "pe", label: "Pernambuco" },
    { value: "rn", label: "Rio Grande do Norte" },
    { value: "ro", label: "Rondônia" },
    { value: "rr", label: "Roraima" },
    { value: "rs", label: "Rio Grande do Sul" },
    { value: "sc", label: "Santa Catarina" },
    { value: "se", label: "Sergipe" },
    { value: "sp", label: "São Paulo" },
    { value: "to", label: "Tocantins" },
  ],
  mx: [
    { value: "ags", label: "Aguascalientes" },
    { value: "bc", label: "Baja California" },
    { value: "bc", label: "Baja California Sur" },
    { value: "cam", label: "Campeche" },
    { value: "coa", label: "Coahuila" },
    { value: "col", label: "Colima" },
    { value: "dgo", label: "Durango" },
    { value: "gua", label: "Guanajuato" },
    { value: "gro", label: "Guerrero" },
    { value: "hid", label: "Hidalgo" },
    { value: "jal", label: "Jalisco" },
    { value: "mex", label: "México" },
    { value: "mic", label: "Michoacán" },
    { value: "mor", label: "Morelos" },
    { value: "nay", label: "Nayarit" },
    { value: "nl", label: "Nuevo León" },
    { value: "oax", label: "Oaxaca" },
    { value: "pue", label: "Puebla" },
    { value: "que", label: "Querétaro" },
    { value: "roo", label: "Quintana Roo" },
    { value: "san", label: "San Luis Potosí" },
    { value: "sin", label: "Sinaloa" },
    { value: "son", label: "Sonora" },
    { value: "tab", label: "Tabasco" },
    { value: "tam", label: "Tamaulipas" },
    { value: "tla", label: "Tlaxcala" },
    { value: "ver", label: "Veracruz" },
    { value: "yuc", label: "Yucatán" },
    { value: "zac", label: "Zacatecas" },
  ],
  za: [
    { value: "ec", label: "Eastern Cape" },
    { value: "fs", label: "Free State" },
    { value: "gt", label: "Gauteng" },
    { value: "kp", label: "KwaZulu-Natal" },
    { value: "lp", label: "Limpopo" },
    { value: "mp", label: "Mpumalanga" },
    { value: "nc", label: "Northern Cape" },
    { value: "np", label: "North West" },
    { value: "wc", label: "Western Cape" },
  ],
  cn: [
    { value: "bj", label: "Beijing" },
    { value: "sh", label: "Shanghai" },
    { value: "tj", label: "Tianjin" },
    { value: "cq", label: "Chongqing" },
    { value: "hk", label: "Hong Kong" },
    { value: "mo", label: "Macao" },
    { value: "gd", label: "Guangdong" },
    { value: "gx", label: "Guangxi" },
    { value: "gz", label: "Guizhou" },
    { value: "ha", label: "Hainan" },
    { value: "hb", label: "Hubei" },
    { value: "he", label: "Hebei" },
    { value: "hi", label: "Hunan" },
    { value: "hl", label: "Heilongjiang" },
    { value: "hn", label: "Henan" },
    { value: "jl", label: "Jilin" },
    { value: "js", label: "Jiangsu" },
    { value: "jx", label: "Jiangxi" },
    { value: "ln", label: "Liaoning" },
    { value: "nm", label: "Neimenggu" },
    { value: "nx", label: "Ningxia" },
    { value: "qh", label: "Qinghai" },
    { value: "sc", label: "Sichuan" },
    { value: "sd", label: "Shandong" },
    { value: "sh", label: "Shanghai" },
    { value: "sn", label: "Shanxi" },
    { value: "sx", label: "Shanxi" },
    { value: "tj", label: "Tianjin" },
    { value: "tw", label: "Taiwan" },
    { value: "xj", label: "Xinjiang" },
    { value: "xz", label: "Tibet" },
    { value: "yn", label: "Yunnan" },
    { value: "zj", label: "Zhejiang" },
  ],
  ru: [
    { value: "am", label: "Amur" },
    { value: "ar", label: "Arkhangelsk" },
    { value: "az", label: "Astrakhan" },
    { value: "ba", label: "Bashkortostan" },
    { value: "bu", label: "Buryatia" },
    { value: "ce", label: "Chelyabinsk" },
    { value: "da", label: "Dagestan" },
    { value: "in", label: "Ingushetia" },
    { value: "ir", label: "Irkutsk" },
    { value: "iz", label: "Ivanovo" },
    { value: "ka", label: "Kabardino-Balkaria" },
    { value: "kb", label: "Kabardino-Balkaria" },
    { value: "kc", label: "Karachay-Cherkessia" },
    { value: "kd", label: "Krasnodar" },
    { value: "ke", label: "Krasnoyarsk" },
    { value: "ki", label: "Karelia" },
    { value: "ko", label: "Komi" },
    { value: "kr", label: "Koryak" },
    { value: "ks", label: "Kurgan" },
    { value: "kt", label: "Kurilsk" },
    { value: "kz", label: "Khabarovsk" },
    { value: "lg", label: "Leningrad" },
    { value: "mo", label: "Moscow" },
    { value: "mz", label: "Mordovia" },
    { value: "nn", label: "Nenets" },
    { value: "nv", label: "Novgorod" },
    { value: "om", label: "Omsk" },
    { value: "or", label: "Orenburg" },
    { value: "pe", label: "Penza" },
    { value: "pr", label: "Primorsky" },
    { value: "ps", label: "Pskov" },
    { value: "ro", label: "Rostov" },
    { value: "ry", label: "Ryazan" },
    { value: "sa", label: "Sakha" },
    { value: "se", label: "Samara" },
    { value: "sk", label: "Saratov" },
    { value: "sl", label: "Smolensk" },
    { value: "sn", label: "Stavropol" },
    { value: "sp", label: "St. Petersburg" },
    { value: "ta", label: "Tatarstan" },
    { value: "tg", label: "Taymyr" },
    { value: "to", label: "Tomsk" },
    { value: "tu", label: "Tula" },
    { value: "ty", label: "Tyumen" },
    { value: "ud", label: "Udmurtia" },
    { value: "vg", label: "Volgograd" },
    { value: "vz", label: "Vologda" },
    { value: "ya", label: "Yamalo-Nenets" },
    { value: "yh", label: "Yakutia" },
    { value: "za", label: "Zabaykalsky" },
  ],
  sg: [
    { value: "sg", label: "Singapore" },
  ],
  ae: [
    { value: "du", label: "Dubai" },
    { value: "sh", label: "Sharjah" },
    { value: "ab", label: "Abu Dhabi" },
    { value: "aj", label: "Ajman" },
    { value: "fr", label: "Fujairah" },
    { value: "ra", label: "Ras Al Khaimah" },
    { value: "um", label: "Umm Al Quwain" },
  ],
  se: [
    { value: "ab", label: "Stockholm" },
    { value: "st", label: "Södermanland" },
    { value: "up", label: "Uppsala" },
    { value: "os", label: "Östergötland" },
    { value: "dl", label: "Dalarna" },
    { value: "ga", label: "Gävleborg" },
    { value: "ha", label: "Halland" },
    { value: "ja", label: "Jämtland" },
    { value: "na", label: "Jönköping" },
    { value: "ks", label: "Kalmar" },
    { value: "bd", label: "Kronoberg" },
    { value: "nb", label: "Norrbotten" },
    { value: "sk", label: "Skåne" },
    { value: "sj", label: "Sörmland" },
    { value: "s", label: "Stockholm" },
    { value: "t", label: "Sundsvall" },
    { value: "y", label: "Örebro" },
    { value: "c", label: "Östergötland" },
    { value: "f", label: "Värmland" },
  ],
}

function getCountryCallingCode(countryCode: string): string {
  const callingCodes: { [key: string]: string } = {
    "us": "1",
    "ca": "1",
    "gb": "44",
    "fr": "33",
    "de": "49",
    "it": "39",
    "es": "34",
    "au": "61",
    "nz": "64",
    "jp": "81",
    "kr": "82",
    "in": "91",
    "br": "55",
    "mx": "52",
    "za": "27",
    "cn": "86",
    "ru": "7",
    "sg": "65",
    "ae": "971",
    "se": "46"
  }
  return callingCodes[countryCode] || "1"
}

function getStatesForCountry(countryCode: string): State[] {
  return statesByCountry[countryCode] || []
}

export default function Form() {
  // Student form states
  const [studentAddressCountry, setStudentAddressCountry] = useState("");
  const [studentPhoneCountry, setStudentPhoneCountry] = useState("");
  const [studentState, setStudentState] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentStreet, setStudentStreet] = useState("");
  const [studentCity, setStudentCity] = useState("");
  const [studentPostal, setStudentPostal] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentProgress, setStudentProgress] = useState(0);

  // Parent1 form states
  const [parent1AddressCountry, setParent1AddressCountry] = useState("");
  const [parent1PhoneCountry, setParent1PhoneCountry] = useState("");
  const [parent1State, setParent1State] = useState("");
  const [parent1SameAddress, setParent1SameAddress] = useState(false);
  const [parent1Name, setParent1Name] = useState("");
  const [parent1Street, setParent1Street] = useState("");
  const [parent1City, setParent1City] = useState("");
  const [parent1Postal, setParent1Postal] = useState("");
  const [parent1Phone, setParent1Phone] = useState("");
  const [parent1Email, setParent1Email] = useState("");
  const [parent1Progress, setParent1Progress] = useState(0);
  const [isSoleGuardian, setIsSoleGuardian] = useState<string>("");
  const [guardianshipDocument, setGuardianshipDocument] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Parent2 form states
  const [parent2AddressCountry, setParent2AddressCountry] = useState("");
  const [parent2PhoneCountry, setParent2PhoneCountry] = useState("");
  const [parent2State, setParent2State] = useState("");
  const [parent2SameAddress, setParent2SameAddress] = useState(false);
  const [parent2Name, setParent2Name] = useState("");
  const [parent2Street, setParent2Street] = useState("");
  const [parent2City, setParent2City] = useState("");
  const [parent2Postal, setParent2Postal] = useState("");
  const [parent2Phone, setParent2Phone] = useState("");
  const [parent2Email, setParent2Email] = useState("");
  const [parent2Progress, setParent2Progress] = useState(0);

  // Additional progress state
  const [additionalProgress, setAdditionalProgress] = useState(0);

  // Health information states
  const [hasAllergies, setHasAllergies] = useState(false);
  const [hasTreatment, setHasTreatment] = useState(false);
  const [hasDietary, setHasDietary] = useState(false);
  const [allergiesDetails, setAllergiesDetails] = useState("");
  const [treatmentDetails, setTreatmentDetails] = useState("");
  const [dietaryDetails, setDietaryDetails] = useState("");

  // Active section state
  const [activeSection, setActiveSection] = useState("student-details");
  
  // Form progress state
  const [formProgress, setFormProgress] = useState(0);
  const [isFormComplete, setIsFormComplete] = useState(false);

  // Navigation functions
  const sections = ['student-details', 'parent1-details', 'parent2-details', 'additional-info']
  
  // Easing function
  const easeOutQuad = (t: number): number => t * (2 - t)
  
  const smoothScrollTo = (targetPosition: number) => {
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 800
    let start: number | null = null

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const percent = Math.min(progress / duration, 1)
      
      window.scrollTo({
        top: startPosition + distance * easeOutQuad(percent),
      })

      if (progress < duration) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }

  const goToNextSection = () => {
    const currentIndex = sections.indexOf(activeSection)
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1]
      const element = document.getElementById(nextSection)
      if (element) {
        const headerOffset = 122
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset
        smoothScrollTo(offsetPosition)
        const firstInput = element.querySelector('input, select') as HTMLElement
        if (firstInput) firstInput.focus()
        setActiveSection(nextSection)
      }
    }
  }

  const goToPreviousSection = () => {
    const currentIndex = sections.indexOf(activeSection)
    if (currentIndex > 0) {
      const previousSection = sections[currentIndex - 1]
      const element = document.getElementById(previousSection)
      if (element) {
        const headerOffset = 122
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset
        smoothScrollTo(offsetPosition)
        const firstInput = element.querySelector('input, select') as HTMLElement
        if (firstInput) firstInput.focus()
        setActiveSection(previousSection)
      }
    }
  }

  // Calculate form progress
  useEffect(() => {
    // Student Details Progress (7 required fields)
    let studentTotalFields = 7;
    let studentCompletedFields = 0;
    if (studentName) studentCompletedFields++;
    if (studentStreet) studentCompletedFields++;
    if (studentCity) studentCompletedFields++;
    if (studentAddressCountry) studentCompletedFields++;
    if (studentPostal) studentCompletedFields++;
    if (studentPhone) studentCompletedFields++;
    if (studentEmail) studentCompletedFields++;
    setStudentProgress(Math.round((studentCompletedFields / studentTotalFields) * 100));

    // Parent 1 Details Progress (8 required fields including guardian question)
    let parent1TotalFields = 8;
    let parent1CompletedFields = 0;
    if (parent1Name) parent1CompletedFields++;
    if (parent1SameAddress || parent1Street) parent1CompletedFields++;
    if (parent1SameAddress || parent1City) parent1CompletedFields++;
    if (parent1SameAddress || parent1AddressCountry) parent1CompletedFields++;
    if (parent1SameAddress || parent1Postal) parent1CompletedFields++;
    if (parent1Phone) parent1CompletedFields++;
    if (parent1Email) parent1CompletedFields++;
    if (isSoleGuardian) parent1CompletedFields++;
    if (isSoleGuardian === "yes" && guardianshipDocument) parent1CompletedFields++;
    if (isSoleGuardian === "yes") parent1TotalFields++;
    setParent1Progress(Math.round((parent1CompletedFields / parent1TotalFields) * 100));

    // Parent 2 Details Progress
    let parent2TotalFields = isSoleGuardian === "no" ? 7 : (isSoleGuardian === "yes" ? 1 : 7);
    let parent2CompletedFields = 0;
    if (isSoleGuardian === "no") {
      if (parent2Name) parent2CompletedFields++;
      if (parent2SameAddress || parent2Street) parent2CompletedFields++;
      if (parent2SameAddress || parent2City) parent2CompletedFields++;
      if (parent2SameAddress || parent2AddressCountry) parent2CompletedFields++;
      if (parent2SameAddress || parent2Postal) parent2CompletedFields++;
      if (parent2Phone) parent2CompletedFields++;
      if (parent2Email) parent2CompletedFields++;
    } else if (isSoleGuardian === "yes") {
      parent2CompletedFields = 1;
    }
    setParent2Progress(Math.round((parent2CompletedFields / parent2TotalFields) * 100));

    // Additional Information Progress
    let additionalTotalFields = 0;
    let additionalCompletedFields = 0;

    // Add conditional fields
    if (hasAllergies) {
      additionalTotalFields++;
      if (allergiesDetails) additionalCompletedFields++;
    }
    if (hasTreatment) {
      additionalTotalFields++;
      if (treatmentDetails) additionalCompletedFields++;
    }
    if (hasDietary) {
      additionalTotalFields++;
      if (dietaryDetails) additionalCompletedFields++;
    }

    // If no checkboxes are checked, set minimum fields to 1 to avoid division by zero
    if (additionalTotalFields === 0) {
      additionalTotalFields = 1;
      additionalCompletedFields = 0;
    }
    
    setAdditionalProgress(Math.round((additionalCompletedFields / additionalTotalFields) * 100));

    // Overall form progress
    const totalFields = studentTotalFields + parent1TotalFields + parent2TotalFields + additionalTotalFields;
    const completedFields = studentCompletedFields + parent1CompletedFields + parent2CompletedFields + additionalCompletedFields;
    const progress = Math.round((completedFields / totalFields) * 100);
    setFormProgress(progress);
    setIsFormComplete(progress === 100);

    console.log(`Total Fields: ${totalFields}, Completed Fields: ${completedFields}, Progress: ${progress}%`);
  }, [
    // Student dependencies
    studentName, studentStreet, studentCity, studentAddressCountry, 
    studentPostal, studentPhone, studentEmail,
    
    // Parent 1 dependencies
    parent1Name, parent1Street, parent1City, parent1AddressCountry,
    parent1Postal, parent1Phone, parent1Email, parent1SameAddress,
    
    // Parent 2 dependencies
    parent2Name, parent2Street, parent2City, parent2AddressCountry,
    parent2Postal, parent2Phone, parent2Email, parent2SameAddress,
    
    // Guardian and health info dependencies
    isSoleGuardian, guardianshipDocument,
    hasAllergies, hasTreatment, hasDietary,
    allergiesDetails, treatmentDetails, dietaryDetails
  ]);

  // Function to handle field focus
  const handleFieldFocus = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only update active section if no field is focused
          const activeElement = document.activeElement
          const isFieldFocused = activeElement?.tagName === 'INPUT' || 
                               activeElement?.tagName === 'SELECT'
          if (entry.isIntersecting && !isFieldFocused) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-50% 0px -50% 0px"
      }
    )

    // Observe all sections
    const sections = ['student-details', 'parent1-details', 'parent2-details', 'additional-info']
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  const router = useRouter()
  const { toast } = useToast()

  return (
    <div className="min-h-screen flex bg-[#FCFCFC]">
      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 w-[320px] h-screen bg-white flex flex-col z-50">
        <div className="absolute inset-0 shadow-[0px_2px_4px_rgba(16,24,40,0.06),0px_4px_8px_rgba(16,24,40,0.1)] border-r border-[#E8E8E8]"></div>
        <div className="relative h-full w-full bg-white">
          {/* Logo */}
          <div className="h-[98px] flex items-center justify-center bg-white z-[70] px-6">
            <Image
              src="/edu_logo_teal.svg"
              alt="Educatius Logo"
              width={140}
              height={32}
              priority
            />
          </div>

          {/* Breadcrumb Navigation */}
          <div className="px-6 py-4 border-b border-[#E8E8E8]">
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#DFDFDF] hover:border-[#B3B3B3] hover:bg-[#E8E8E8] cursor-pointer transition-colors">
                  <ArrowLeft className="h-5 w-5 text-[#667085]" />
                </div>
              </Link>
              <div className="flex items-center gap-2">
                <Link href="/dashboard" className="text-[#00968F] hover:underline">Home</Link>
                <ChevronRight className="h-5 w-5 text-[#667085]" />
                <span className="text-[#141414]">Course Reservation</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 bg-white">
            <button 
              onClick={() => {
                const element = document.getElementById('student-details')
                if (element) {
                  const headerOffset = 122
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - headerOffset
                  smoothScrollTo(offsetPosition)
                  const firstInput = element.querySelector('input, select') as HTMLElement
                  if (firstInput) firstInput.focus()
                }
                setActiveSection('student-details')
              }}
              className={`relative w-full flex flex-col justify-center items-center self-stretch py-3 px-[1.125rem] border-t border-b border-[#2CD5C4] bg-white hover:bg-[#E8F4F4] hover:text-[#005151] ${activeSection === 'student-details' ? 'shadow-[inset_8px_0_0_0_#2CD5C4,inset_-8px_0_0_0_#2CD5C4] bg-white text-[#005151]' : ''} cursor-pointer transition-colors`}
            >
              <span>Student Details</span>
              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                {studentProgress === 100 ? (
                  <CircleCheckBig className="h-5 w-5 text-[#2CD5C4]" />
                ) : (
                  <div className="relative h-5 w-5">
                    <svg className="h-5 w-5 -rotate-90 transform">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#E8E8E8"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#2CD5C4"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 8}`}
                        strokeDashoffset={`${2 * Math.PI * 8 * (1 - studentProgress / 100)}`}
                        className="transition-all duration-300 ease-out"
                      />
                    </svg>
              </div>
                )}
            </div>
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('parent1-details')
                if (element) {
                  const headerOffset = 122
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - headerOffset
                  smoothScrollTo(offsetPosition)
                  const firstInput = element.querySelector('input, select') as HTMLElement
                  if (firstInput) firstInput.focus()
                }
                setActiveSection('parent1-details')
              }}
              className={`relative w-full flex flex-col justify-center items-center self-stretch py-3 px-[1.125rem] border-b border-[#2CD5C4] bg-white hover:bg-[#E8F4F4] hover:text-[#005151] ${activeSection === 'parent1-details' ? 'shadow-[inset_8px_0_0_0_#2CD5C4,inset_-8px_0_0_0_#2CD5C4] bg-white text-[#005151]' : ''} cursor-pointer transition-colors`}
            >
              <span>Parent/Guardian 1 Details</span>
              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                {parent1Progress === 100 ? (
                  <CircleCheckBig className="h-5 w-5 text-[#2CD5C4]" />
                ) : (
                  <div className="relative h-5 w-5">
                    <svg className="h-5 w-5 -rotate-90 transform">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#E8E8E8"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#2CD5C4"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 8}`}
                        strokeDashoffset={`${2 * Math.PI * 8 * (1 - parent1Progress / 100)}`}
                        className="transition-all duration-300 ease-out"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('parent2-details')
                if (element) {
                  const headerOffset = 122
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - headerOffset
                  smoothScrollTo(offsetPosition)
                  const firstInput = element.querySelector('input, select') as HTMLElement
                  if (firstInput) firstInput.focus()
                }
                setActiveSection('parent2-details')
              }}
              className={`relative w-full flex flex-col justify-center items-center self-stretch py-3 px-[1.125rem] border-b border-[#2CD5C4] bg-white hover:bg-[#E8F4F4] hover:text-[#005151] ${activeSection === 'parent2-details' ? 'shadow-[inset_8px_0_0_0_#2CD5C4,inset_-8px_0_0_0_#2CD5C4] bg-white text-[#005151]' : ''} cursor-pointer transition-colors`}
            >
              <span>Parent/Guardian 2 Details</span>
              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                {parent2Progress === 100 ? (
                  <CircleCheckBig className="h-5 w-5 text-[#2CD5C4]" />
                ) : (
                  <div className="relative h-5 w-5">
                    <svg className="h-5 w-5 -rotate-90 transform">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#E8E8E8"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#2CD5C4"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 8}`}
                        strokeDashoffset={`${2 * Math.PI * 8 * (1 - parent2Progress / 100)}`}
                        className="transition-all duration-300 ease-out"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('additional-info')
                if (element) {
                  const headerOffset = 122
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - headerOffset
                  smoothScrollTo(offsetPosition)
                  const firstInput = element.querySelector('input, select') as HTMLElement
                  if (firstInput) firstInput.focus()
                }
                setActiveSection('additional-info')
              }}
              className={`relative w-full flex flex-col justify-center items-center self-stretch py-3 px-[1.125rem] border-b border-[#2CD5C4] bg-white hover:bg-[#E8F4F4] hover:text-[#005151] ${activeSection === 'additional-info' ? 'shadow-[inset_8px_0_0_0_#2CD5C4,inset_-8px_0_0_0_#2CD5C4] bg-white text-[#005151]' : ''} cursor-pointer transition-colors`}
            >
              <span>Additional Information</span>
              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                {additionalProgress === 100 ? (
                  <CircleCheckBig className="h-5 w-5 text-[#2CD5C4]" />
                ) : (
                  <div className="relative h-5 w-5">
                    <svg className="h-5 w-5 -rotate-90 transform">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#E8E8E8"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#2CD5C4"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 8}`}
                        strokeDashoffset={`${2 * Math.PI * 8 * (1 - additionalProgress / 100)}`}
                        className="transition-all duration-300 ease-out"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[320px]">
        {/* Top Navigation */}
        <div className="fixed top-0 right-0 left-[320px] h-[98px] z-40 backdrop-blur-[10px]">
          <div className="absolute inset-0 shadow-[0px_8px_8px_rgba(16,24,40,0.03),0px_20px_24px_rgba(16,24,40,0.08)] border-b border-[#E8E8E8]"></div>
          <header className="relative h-full w-full bg-white/40">
            <div className="flex items-center h-full">
              {/* Welcome Message */}
              <div className="flex-1 px-8 flex items-center justify-between">
                <div className="flex flex-col">
                <span className="text-[#141414] font-sans text-[1.5rem] font-normal leading-[133.4%] [font-feature-settings:'liga'_off,'clig'_off]">
                    Course Reservation
                  </span>
                  <span className="text-[#667085] font-sans text-base font-normal leading-[150%] [font-feature-settings:'liga'_off,'clig'_off]">
                    {activeSection === 'student-details' && "Student Details"}
                    {activeSection === 'parent1-details' && "Parent/Guardian 1 Details"}
                    {activeSection === 'parent2-details' && "Parent/Guardian 2 Details"}
                    {activeSection === 'additional-info' && "Additional Information"}
                  </span>
                  
                      </div>

                <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10"
                      onClick={goToPreviousSection}
                      disabled={sections.indexOf(activeSection) === 0}
                    >
                      <ArrowLeft className="h-5 w-5 text-[#667085]" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10"
                      onClick={goToNextSection}
                      disabled={sections.indexOf(activeSection) === sections.length - 1}
                    >
                      <ArrowRight className="h-5 w-5 text-[#667085]" />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={async () => {
                        try {
                          const formData = {
                            studentDetails: {
                              name: studentName,
                              street: studentStreet,
                              city: studentCity,
                              country: studentAddressCountry,
                              postal: studentPostal,
                              phone: studentPhone,
                              email: studentEmail,
                              state: studentState,
                              phoneCountry: studentPhoneCountry
                            },
                            parent1Details: {
                              name: parent1Name,
                              street: parent1Street,
                              city: parent1City,
                              country: parent1AddressCountry,
                              postal: parent1Postal,
                              phone: parent1Phone,
                              email: parent1Email,
                              state: parent1State,
                              phoneCountry: parent1PhoneCountry,
                              sameAddress: parent1SameAddress,
                              isSoleGuardian: isSoleGuardian,
                              guardianshipDocument: guardianshipDocument?.name
                            },
                            parent2Details: {
                              name: parent2Name,
                              street: parent2Street,
                              city: parent2City,
                              country: parent2AddressCountry,
                              postal: parent2Postal,
                              phone: parent2Phone,
                              email: parent2Email,
                              state: parent2State,
                              phoneCountry: parent2PhoneCountry,
                              sameAddress: parent2SameAddress
                            },
                            additionalInfo: {
                              hasAllergies,
                              allergiesDetails,
                              hasTreatment,
                              treatmentDetails,
                              hasDietary,
                              dietaryDetails
                            },
                            progress: formProgress
                          };

                          const response = await fetch('/api/save-draft', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formData),
                          });

                          if (!response.ok) {
                            throw new Error('Failed to save draft');
                          }

                          toast({
                            title: "Draft Saved",
                            description: "You have saved a draft of your Course Reservation form",
                          });

                          // Redirect to completed dashboard
                          router.push('/dashboard/completed');
                        } catch (error) {
                          console.error('Error saving draft:', error);
                          toast({
                            title: "Error",
                            description: "Failed to save draft. Please try again.",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      Save Draft
                    </Button>
                    <Button
                      variant="default"
                      className={`h-10 px-4 ${isFormComplete ? 'bg-[#007F7A] text-white hover:bg-[#005151]' : ''}`}
                      disabled={!isFormComplete}
                      onClick={() => {
                        if (isFormComplete) {
                          router.push('/dashboard/completed');
                        }
                      }}
                    >
                      {isFormComplete ? (
                        "Submit"
                      ) : (
                      <div className="flex items-center gap-2">
                          <span>Progress: {formProgress}%</span>
                          <div className="relative h-6 w-6">
                            <svg className="h-6 w-6 -rotate-90 transform">
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="#E8E8E8"
                                strokeWidth="3"
                                fill="none"
                              />
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="#2CD5C4"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 10}`}
                                strokeDashoffset={`${2 * Math.PI * 10 * (1 - formProgress / 100)}`}
                                className="transition-all duration-300 ease-out"
                              />
                            </svg>
                      </div>
                        </div>
                      )}
                    </Button>
                  </div>
                  <LanguageSwitcher />
                </div>
              </div>

              {/* User Area - Fixed 320px width */}
              <div className="w-[320px] flex items-center h-full border-l border-[#DFDFDF] px-6">
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="h-[50px] w-[50px] rounded-lg border border-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]">
                    <AvatarImage src="/assets/bessie-cooper.png" alt="Bessie Cooper" />
                    <AvatarFallback>BC</AvatarFallback>
                  </Avatar>
                  <span className="text-[#101828] text-base font-normal flex-1">Bessie Cooper</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10"
                    >
                      <ChevronDown className="h-5 w-5 text-[#667085]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[240px]">
                    <DropdownMenuItem>
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-[#667085]" />
                        My Profile
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-[#667085]" />
                        Account Settings
                      </div>
                    </DropdownMenuItem>
                    <div className="h-px bg-[#DFDFDF] my-2" />
                    <DropdownMenuItem>
                      <div className="flex items-center gap-2">
                        <LogOut className="h-5 w-5 text-[#D92D20]" />
                        <span className="text-[#D92D20]">Log Out</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
        </div>

        {/* Page Content */}
        <div className="p-6 mt-[98px]">
          <Card id="student-details" className="p-6 mb-6">
            <h1 className="text-h4 text-[#141414] mb-8">Student Details</h1>
            
            <form className="space-y-8">
              {/* Student Name */}
              <div className="w-1/3">
                <Input
                  label="Student name"
                  placeholder="Enter student name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  onFocus={() => handleFieldFocus('student-details')}
                />
              </div>

              {/* Student Address */}
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  <label className="text-[#141414] text-base">Student Address</label>
                  <span className="text-[#D32F2F]">*</span>
                </div>
                
                <div className="w-1/3">
                <Input
                  placeholder="Enter street address"
                  label="Street Address"
                    value={studentStreet}
                    onChange={(e) => setStudentStreet(e.target.value)}
                    onFocus={() => handleFieldFocus('student-details')}
                />
                </div>
                
                <div className="flex gap-4">
                  <div className="w-1/3">
                  <Input
                    placeholder="Enter city"
                    label="City"
                      value={studentCity}
                      onChange={(e) => setStudentCity(e.target.value)}
                      onFocus={() => handleFieldFocus('student-details')}
                  />
                  </div>
                  <div className="w-1/3">
                    <label className="mb-[4px] font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#4E4E4E] block">
                      Country
                    </label>
                    <Select value={studentAddressCountry} onValueChange={setStudentAddressCountry}>
                      <SelectTrigger onFocus={() => handleFieldFocus('student-details')}>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.sort((a, b) => a.label.localeCompare(b.label)).map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.flag} {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-1/3">
                  <Input
                    placeholder="Enter postal/zip code"
                    label="Postal / Zip Code"
                      value={studentPostal}
                      onChange={(e) => setStudentPostal(e.target.value)}
                      onFocus={() => handleFieldFocus('student-details')}
                  />
                  </div>
                  <div className="w-1/3">
                    <label className="mb-[4px] font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#4E4E4E] block">
                      State / Region / Province
                    </label>
                    <Select
                      value={studentState}
                      onValueChange={setStudentState}
                      disabled={!studentAddressCountry}
                    >
                      <SelectTrigger onFocus={() => handleFieldFocus('student-details')}>
                        <SelectValue placeholder="Select state..." />
                      </SelectTrigger>
                      <SelectContent>
                        {getStatesForCountry(studentAddressCountry).map((state: State) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Student Phone */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <label className="text-[#141414] text-base">Student Phone</label>
                  <span className="text-[#D32F2F]">*</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-[120px]">
                    <Select value={studentPhoneCountry} onValueChange={setStudentPhoneCountry}>
                      <SelectTrigger className="w-[100px]" onFocus={() => handleFieldFocus('student-details')}>
                        <SelectValue placeholder={<>🌍 +1</>}>
                          {studentPhoneCountry && (
                            <>
                              {countries.find(c => c.value === studentPhoneCountry)?.flag} +{getCountryCallingCode(studentPhoneCountry)}
                            </>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {countries.sort((a, b) => a.label.localeCompare(b.label)).map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.flag} +{getCountryCallingCode(country.value)} {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    placeholder="Enter phone number"
                    className="flex-1"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    onFocus={() => handleFieldFocus('student-details')}
                  />
                </div>
              </div>

              {/* Student Email */}
              <div className="w-1/3">
                <div className="flex items-center gap-1">
                  <label className="text-[#141414] text-base">Student Email</label>
                  <span className="text-[#D32F2F]">*</span>
                </div>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  onFocus={() => handleFieldFocus('student-details')}
                />
              </div>
            </form>
          </Card>

          <Card id="parent1-details" className="p-6 mb-6">
            <h1 className="text-h4 text-[#141414] mb-8">Parent / Guardian 1</h1>
            
            <form className="space-y-8">
              {/* Parent1 Name */}
              <div className="w-1/3">
                <Input
                  label="Parent / Guardian 1 name"
                  placeholder="Enter parent name"
                  value={parent1Name}
                  onChange={(e) => setParent1Name(e.target.value)}
                  onFocus={() => handleFieldFocus('parent1-details')}
                />
              </div>

              {/* Parent1 Address */}
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  <label className="text-[#141414] text-base">Parent / Guardian 1 Address</label>
                  <span className="text-[#D32F2F]">*</span>
                </div>

                          <div className="flex items-center gap-2">
                  <Checkbox
                    id="parent1SameAddress"
                    checked={parent1SameAddress}
                    onCheckedChange={(checked) => setParent1SameAddress(checked as boolean)}
                  />
                  <label
                    htmlFor="parent1SameAddress"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Same as student's address
                  </label>
                </div>
                
                {!parent1SameAddress && (
                  <>
                    <div className="w-1/3">
                      <Input
                        placeholder="Enter street address"
                        label="Street Address"
                        value={parent1Street}
                        onChange={(e) => setParent1Street(e.target.value)}
                        onFocus={() => handleFieldFocus('parent1-details')}
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-1/3">
                        <Input
                          placeholder="Enter city"
                          label="City"
                          value={parent1City}
                          onChange={(e) => setParent1City(e.target.value)}
                          onFocus={() => handleFieldFocus('parent1-details')}
                        />
                      </div>
                      <div className="w-1/3">
                        <label className="mb-[4px] font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#4E4E4E] block">
                          Country
                        </label>
                        <Select value={parent1AddressCountry} onValueChange={setParent1AddressCountry}>
                          <SelectTrigger onFocus={() => handleFieldFocus('parent1-details')}>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.sort((a, b) => a.label.localeCompare(b.label)).map((country) => (
                              <SelectItem key={country.value} value={country.value}>
                                {country.flag} {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-1/3">
                        <Input
                          placeholder="Enter postal/zip code"
                          label="Postal / Zip Code"
                          value={parent1Postal}
                          onChange={(e) => setParent1Postal(e.target.value)}
                          onFocus={() => handleFieldFocus('parent1-details')}
                        />
                      </div>
                      <div className="w-1/3">
                        <label className="mb-[4px] font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#4E4E4E] block">
                          State / Region / Province
                        </label>
                        <Select
                          value={parent1State}
                          onValueChange={setParent1State}
                          disabled={!parent1AddressCountry}
                        >
                          <SelectTrigger onFocus={() => handleFieldFocus('parent1-details')}>
                            <SelectValue placeholder="Select state..." />
                          </SelectTrigger>
                          <SelectContent>
                            {getStatesForCountry(parent1AddressCountry).map((state: State) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                            )}
                          </div>

              {/* Parent1 Phone */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <label className="text-[#141414] text-base">Parent / Guardian 1 Phone</label>
                  <span className="text-[#D32F2F]">*</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-[120px]">
                    <Select value={parent1PhoneCountry} onValueChange={setParent1PhoneCountry}>
                      <SelectTrigger className="w-[100px]" onFocus={() => handleFieldFocus('parent1-details')}>
                        <SelectValue placeholder={<>🌍 +1</>}>
                          {parent1PhoneCountry && (
                            <>
                              {countries.find(c => c.value === parent1PhoneCountry)?.flag} +{getCountryCallingCode(parent1PhoneCountry)}
                            </>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {countries.sort((a, b) => a.label.localeCompare(b.label)).map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.flag} +{getCountryCallingCode(country.value)} {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    placeholder="Enter phone number"
                    className="flex-1"
                    value={parent1Phone}
                    onChange={(e) => setParent1Phone(e.target.value)}
                    onFocus={() => handleFieldFocus('parent1-details')}
                  />
                </div>
              </div>

              {/* Parent1 Email */}
              <div className="w-1/3">
                <div className="flex items-center gap-1">
                  <label className="text-[#141414] text-base">Parent / Guardian 1 Email</label>
                  <span className="text-[#D32F2F]">*</span>
                </div>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={parent1Email}
                  onChange={(e) => setParent1Email(e.target.value)}
                  onFocus={() => handleFieldFocus('parent1-details')}
                />
              </div>

              {/* Sole Guardian Radio Group */}
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  <label className="text-[#141414] text-base">Are you the single legal guardian of this student?</label>
                  <span className="text-[#D32F2F]">*</span>
                </div>
                <RadioGroup
                  value={isSoleGuardian || ""}
                  onValueChange={(value) => setIsSoleGuardian(value as string)}
                  onFocus={() => handleFieldFocus('parent1-details')}
                >
                  <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="sole-guardian-yes" />
                      <label htmlFor="sole-guardian-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="sole-guardian-no" />
                      <label htmlFor="sole-guardian-no">No</label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Conditional File Upload */}
              {isSoleGuardian === "yes" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    <label className="text-[#141414] text-base">Please submit a document that proves you are the single legal guardian</label>
                    <span className="text-[#D32F2F]">*</span>
                  </div>
                  <div className="w-1/3">
                    <div 
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDragging ? 'border-[#2CD5C4] bg-[#E8F4F4]' : 'border-[#DFDFDF]'
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragging(true)
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault()
                        setIsDragging(false)
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        setIsDragging(false)
                        const file = e.dataTransfer.files[0]
                        if (file && /\.(pdf|doc|docx|jpg|jpeg|png)$/i.test(file.name)) {
                          setGuardianshipDocument(file)
                        }
                      }}
                    >
                      {guardianshipDocument ? (
                        <div className="flex items-center justify-center gap-2">
                          <Check className="h-5 w-5 text-[#2CD5C4]" />
                          <span>{guardianshipDocument.name}</span>
                          <button 
                            onClick={() => setGuardianshipDocument(null)}
                            className="text-[#D32F2F] hover:underline ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => setGuardianshipDocument(e.target.files?.[0] || null)}
                            onFocus={() => handleFieldFocus('parent1-details')}
                            className="hidden"
                            id="guardianship-document"
                          />
                          <label 
                            htmlFor="guardianship-document"
                            className="cursor-pointer"
                          >
                            <p>Drag and drop your file here, or <span className="text-[#2CD5C4] hover:underline">browse</span></p>
                            <p className="text-sm text-[#667085] mt-2">Accepted file types: PDF, DOC, DOCX, JPG, JPEG, PNG</p>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </Card>

          <Card id="parent2-details" className="p-6 mb-6">
            <h1 className="text-h4 text-[#141414] mb-8">Parent / Guardian 2</h1>
            
            <form className="space-y-8">
              {isSoleGuardian === "yes" ? (
                <Alert variant="info">
                  <AlertDescription>
                    As Parent / Guardian 1 is the single legal guardian, Parent / Guardian 2 details are not required.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  {/* Parent2 Name */}
                  <div className="w-1/3">
                    <Input
                      label="Parent / Guardian 2 name"
                      placeholder="Enter parent name"
                      value={parent2Name}
                      onChange={(e) => setParent2Name(e.target.value)}
                      onFocus={() => handleFieldFocus('parent2-details')}
                      disabled={isSoleGuardian === "yes"}
                    />
                  </div>

                  {/* Parent2 Address */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-1">
                      <label className="text-[#141414] text-base">Parent / Guardian 2 Address</label>
                      <span className="text-[#D32F2F]">*</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="parent2SameAddress"
                        checked={parent2SameAddress}
                        onCheckedChange={(checked) => setParent2SameAddress(checked as boolean)}
                        disabled={isSoleGuardian === "yes"}
                      />
                      <label
                        htmlFor="parent2SameAddress"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Same as student's address
                      </label>
                    </div>
                    
                    {!parent2SameAddress && (
                      <>
                        <div className="w-1/3">
                          <Input
                            placeholder="Enter street address"
                            label="Street Address"
                            value={parent2Street}
                            onChange={(e) => setParent2Street(e.target.value)}
                            onFocus={() => handleFieldFocus('parent2-details')}
                            disabled={isSoleGuardian === "yes"}
                          />
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="w-1/3">
                            <Input
                              placeholder="Enter city"
                              label="City"
                              value={parent2City}
                              onChange={(e) => setParent2City(e.target.value)}
                              onFocus={() => handleFieldFocus('parent2-details')}
                              disabled={isSoleGuardian === "yes"}
                            />
                          </div>
                          <div className="w-1/3">
                            <label className="mb-[4px] font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#4E4E4E] block">
                              Country
                            </label>
                            <Select 
                              value={parent2AddressCountry} 
                              onValueChange={setParent2AddressCountry}
                              disabled={isSoleGuardian === "yes"}
                            >
                              <SelectTrigger onFocus={() => handleFieldFocus('parent2-details')}>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                              <SelectContent>
                                {countries.sort((a, b) => a.label.localeCompare(b.label)).map((country) => (
                                  <SelectItem key={country.value} value={country.value}>
                                    {country.flag} {country.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="w-1/3">
                            <Input
                              placeholder="Enter postal/zip code"
                              label="Postal / Zip Code"
                              value={parent2Postal}
                              onChange={(e) => setParent2Postal(e.target.value)}
                              onFocus={() => handleFieldFocus('parent2-details')}
                              disabled={isSoleGuardian === "yes"}
                            />
                          </div>
                          <div className="w-1/3">
                            <label className="mb-[4px] font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#4E4E4E] block">
                              State / Region / Province
                            </label>
                            <Select
                              value={parent2State}
                              onValueChange={setParent2State}
                              disabled={!parent2AddressCountry || isSoleGuardian === "yes"}
                            >
                              <SelectTrigger onFocus={() => handleFieldFocus('parent2-details')}>
                                <SelectValue placeholder="Select state..." />
                              </SelectTrigger>
                              <SelectContent>
                                {getStatesForCountry(parent2AddressCountry).map((state: State) => (
                                  <SelectItem key={state.value} value={state.value}>
                                    {state.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Parent2 Phone */}
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <label className="text-[#141414] text-base">Parent / Guardian 2 Phone</label>
                      <span className="text-[#D32F2F]">*</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-[120px]">
                        <Select 
                          value={parent2PhoneCountry} 
                          onValueChange={setParent2PhoneCountry}
                          disabled={isSoleGuardian === "yes"}
                        >
                          <SelectTrigger className="w-[100px]" onFocus={() => handleFieldFocus('parent2-details')}>
                            <SelectValue placeholder={<>🌍 +1</>}>
                              {parent2PhoneCountry && (
                                <>
                                  {countries.find(c => c.value === parent2PhoneCountry)?.flag} +{getCountryCallingCode(parent2PhoneCountry)}
                                </>
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {countries.sort((a, b) => a.label.localeCompare(b.label)).map((country) => (
                              <SelectItem key={country.value} value={country.value}>
                                {country.flag} +{getCountryCallingCode(country.value)} {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                  </div>
                  <Input
                    placeholder="Enter phone number"
                    className="flex-1"
                        value={parent2Phone}
                        onChange={(e) => setParent2Phone(e.target.value)}
                        onFocus={() => handleFieldFocus('parent2-details')}
                        disabled={isSoleGuardian === "yes"}
                  />
                </div>
              </div>

                  {/* Parent2 Email */}
                  <div className="w-1/3">
                <div className="flex items-center gap-1">
                      <label className="text-[#141414] text-base">Parent / Guardian 2 Email</label>
                  <span className="text-[#D32F2F]">*</span>
                </div>
                <Input
                  type="email"
                  placeholder="Enter email address"
                      value={parent2Email}
                      onChange={(e) => setParent2Email(e.target.value)}
                      onFocus={() => handleFieldFocus('parent2-details')}
                      disabled={isSoleGuardian === "yes"}
                />
              </div>
                </>
              )}
            </form>
          </Card>

          <Card id="additional-info" className="p-6">
            <h1 className="text-h4 text-[#141414] mb-8">Additional Information</h1>
            <form className="space-y-8">
              {/* Current School */}
              <div className="w-1/3">
                <Input
                  label="Current School"
                  placeholder="Enter current school"
                  onFocus={() => handleFieldFocus('additional-info')}
                />
              </div>

              {/* Health Information Section */}
              <div>
                <h2 className="text-[#141414] text-base mb-4">Can you also confirm if the student has any of the following?</h2>
                
                {/* Allergies */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="has-allergies"
                      checked={hasAllergies}
                      onCheckedChange={(checked) => setHasAllergies(checked as boolean)}
                    />
                    <label
                      htmlFor="has-allergies"
                      className="text-base leading-none"
                    >
                      Allergies?
                    </label>
                  </div>
                  
                  {hasAllergies && (
                    <div className="w-1/3">
                      <div className="flex items-center gap-1">
                        <label className="text-[#141414] text-base">Please state which allergies</label>
                        <span className="text-[#D32F2F]">*</span>
                      </div>
                      <Input
                        placeholder="Enter allergies"
                        value={allergiesDetails}
                        onChange={(e) => setAllergiesDetails(e.target.value)}
                        onFocus={() => handleFieldFocus('additional-info')}
                      />
                    </div>
                  )}
                </div>

                {/* Physical/psychological treatment */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="has-treatment"
                      checked={hasTreatment}
                      onCheckedChange={(checked) => setHasTreatment(checked as boolean)}
                    />
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="has-treatment"
                        className="text-base leading-none"
                      >
                        Physical/psychological treatment?
                      </label>
                      <span className="text-sm text-[#667085]">
                        Has the student had anxiety, depression, eating disorder, suicidal thoughts, seen a therapist/psychologist etc. within the last recent years?
                      </span>
                    </div>
                  </div>
                  
                  {hasTreatment && (
                    <div className="w-1/3">
                      <div className="flex items-center gap-1">
                        <label className="text-[#141414] text-base">Please state which physical/psychological treatments</label>
                        <span className="text-[#D32F2F]">*</span>
                      </div>
                      <Input
                        placeholder="Enter treatments"
                        value={treatmentDetails}
                        onChange={(e) => setTreatmentDetails(e.target.value)}
                        onFocus={() => handleFieldFocus('additional-info')}
                      />
                    </div>
                  )}
                </div>

                {/* Dietary requirements */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="has-dietary"
                      checked={hasDietary}
                      onCheckedChange={(checked) => setHasDietary(checked as boolean)}
                    />
                    <label
                      htmlFor="has-dietary"
                      className="text-base leading-none"
                    >
                      Dietary requirements?
                    </label>
                  </div>
                  
                  {hasDietary && (
                    <div className="w-1/3">
                      <div className="flex items-center gap-1">
                        <label className="text-[#141414] text-base">Please state which dietary requirements</label>
                        <span className="text-[#D32F2F]">*</span>
                      </div>
                      <Input
                        placeholder="Enter dietary requirements"
                        onFocus={() => handleFieldFocus('additional-info')}
                      />
                    </div>
                  )}
                </div>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
} 